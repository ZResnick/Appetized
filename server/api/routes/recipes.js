/* eslint-disable complexity */
// apiRoutes/example.js
const router = require('express').Router()
const {Recipe, User, Ingredient} = require('../../db/models')
const scrapers = require('../../scrapers')
const {Op} = require('sequelize')
const sequelize = require('sequelize')

//gets all the recipes for a specific page, where a page is 24 recipes
router.get('/allRecipes/:pageNum', async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      // order: sequelize.col('createdAt'),
      order: [['createdAt', 'DESC']],
      include: [{model: Ingredient}],
      offset: 24 * req.params.pageNum - 24,
      limit: 24
    })
    if (recipes) res.send(recipes)
    else res.send(404)
  } catch (err) {
    next(err)
  }
})

//gets the total count of all recipes
router.get('/totalCount', async (req, res, next) => {
  try {
    const recipeCount = await Recipe.count()
    if (typeof recipeCount === 'number') res.send({recipeCount})
    else res.send(404)
  } catch (err) {
    next(err)
  }
})

//gets all the recipes in the DB
router.get('/allRecipes', async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      include: [{model: Ingredient}]
    })
    if (recipes) res.send(recipes)
    else res.send(404)
  } catch (err) {
    next(err)
  }
})

//blocks access to all other requests if not logged in
router.all('*', (req, res, next) => {
  if (!req.user) {
    res.sendStatus(401)
  } else {
    next()
  }
})

// //search by title page route with 24 results per page
router.get('/search-by-title/:pageNum', async (req, res, next) => {
  try {
    let search = req.query.search
    let words = search.split(' ')
    let searchArray = words.map(word => `%${word}%`)
    let searchedRecipes = await Recipe.findAll({
      limit: 24,
      order: [['createdAt', 'DESC']],
      offset: 24 * req.params.pageNum - 24,
      where: {
        title: {
          [Op.iLike]: {[Op.any]: searchArray}
        }
      },
      include: [{model: Ingredient}]
    })
    res.send(searchedRecipes)
  } catch (err) {
    next(err)
  }
})

//searched recipe count
router.get('/search-by-title-count', async (req, res, next) => {
  try {
    let search = req.query.search
    let words = search.split(' ')
    let searchArray = words.map(word => `%${word}%`)
    let searchedRecipeCount = await Recipe.count({
      where: {
        title: {
          [Op.iLike]: {[Op.any]: searchArray}
        }
      }
    })
    if (typeof searchedRecipeCount === 'number') res.send({searchedRecipeCount})
  } catch (err) {
    next(err)
  }
})

// //search by title route
router.get('/search-by-title', async (req, res, next) => {
  try {
    let search = req.query.search
    let words = search.split(' ')
    let searchArray = words.map(word => `%${word}%`)
    let searchedRecipes = await Recipe.findAll({
      limit: 25,
      where: {
        title: {
          [Op.iLike]: {[Op.any]: searchArray}
        }
      },
      include: [{model: Ingredient}]
    })
    res.send(searchedRecipes)
  } catch (err) {
    next(err)
  }
})

//gets all the recipes of a specific user
router.get('/', async (req, res, next) => {
  try {
    const userRecipes = await User.findByPk(req.user.id, {
      include: [{model: Recipe}]
    })
    if (userRecipes.recipes) res.send(userRecipes.recipes)
    else res.send(404)
  } catch (err) {
    next(err)
  }
})

//Deletes a recipe from a users recipe box
router.put('/deleteRecipe/:id', async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id)
    if (!recipe) {
      res.sendStatus(403)
    } else {
      await recipe.removeUser(req.user.id)
      res.sendStatus(200)
    }
  } catch (error) {
    next(error)
  }
})

//adds a recipe via the url
router.post('/', async (req, res, next) => {
  try {
    let url = req.body.url
    let tail = url.split('www.')[1]
    let base = tail && tail.split('.com')[0]

    //because nytimes url is composed differently
    let isNYT = url.indexOf('nytimes')
    if (isNYT !== -1) base = 'nytimes'

    //because sallysbakingaddiction url is composed differently
    let isSBA = url.indexOf('sallysbakingaddiction')
    if (isSBA !== -1) base = 'sallysbakingaddiction'

    let data = await scrapers[base](url)
    let {title, author, ingredients, instructions, imageUrl, misc, site} = data
    if (title && ingredients && instructions) {
      let newRecipe = await Recipe.findOne({
        where: {
          url
        },
        include: [{model: Ingredient}]
      })
      if (!newRecipe) {
        newRecipe = await Recipe.create({
          url,
          title,
          author,
          instructions,
          imageUrl,
          misc,
          site
        })
        await ingredients.forEach(async el => {
          let ingredient = await Ingredient.findOne({
            where: {
              title: el
            }
          })
          if (!ingredient) {
            ingredient = await Ingredient.create({
              title: el
            })
          }
          await ingredient.addRecipe(newRecipe)
        })
        newRecipe = await Recipe.findOne({
          where: {url}
        })
      }
      await newRecipe.addUser(req.user.id)
      res.send(newRecipe)
    } else {
      res.send(500)
    }
  } catch (err) {
    next(err)
  }
})

//gets a specific recipe
router.get('/:id', async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: Ingredient
        }
      ]
    })
    // console.log(recipe)
    if (recipe) res.send(recipe)
    else res.send(404)
  } catch (err) {
    next(err)
  }
})

//Examples below

/*
// matches GET requests to /api/example/
router.get('/', async (req, res, next) => {
  try {
  } catch (err) {
    next(err)
  }
})

// matches POST requests to /api/example/
router.post('/', async (req, res, next) => {
  try {
  } catch (err) {
    next(err)
  }
})

// matches PUT requests to /api/example/:exampleId
router.put('/:exampleId', async (req, res, next) => {
  try {
  } catch (err) {
    next(err)
  }
})

// matches DELETE requests to /api/example/:exampleId
router.delete('/:exampleId', async (req, res, next) => {
  try {
  } catch (err) {
    next(err)
  }
})
*/

module.exports = router
