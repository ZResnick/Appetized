// apiRoutes/example.js
const router = require('express').Router()
const {Recipe, User} = require('../../db/models')
const scrapers = require('../../scrapers')
const {Op} = require('sequelize')

//gets all the recipes in the DB
router.get('/allRecipes', async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll()
    if (recipes) res.send(recipes)
    else res.send(404)
  } catch (err) {
    next(err)
  }
})

//blocks access to all other requests if not logged in
// router.all('*', (req, res, next) => {
//   if (!req.user) {
//     res.sendStatus(401)
//   } else {
//     next()
//   }
// })

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

//adds a recipe via the url
router.post('/', async (req, res, next) => {
  try {
    let url = req.body.url
    let tail = url.split('www.')[1]
    let base = tail.split('.com')[0]
    let data = await scrapers[base](url)
    let {title, author, ingredients, instructions, imageUrl, misc, site} = data
    let newRecipe = await Recipe.findOne({
      where: {
        url
      }
    })
    if (!newRecipe) {
      newRecipe = await Recipe.create({
        url,
        title,
        author,
        ingredients,
        instructions,
        imageUrl,
        misc,
        site
      })
    }
    await newRecipe.addUser(req.user.id)
    res.send(newRecipe)
  } catch (err) {
    next(err)
  }
})

//search by title route
router.get('/search-by-title', async (req, res, next) => {
  try {
    let search = req.body.search
    let words = search.split(' ')
    let searchArray = words.map(word => `%${word}%`)
    console.log(searchArray)
    let searchedRecipes = await Recipe.findAll({
      limit: 25,
      where: {
        title: {
          [Op.iLike]: {[Op.any]: searchArray}
          // [Op.iLike]: `%fish%` || `%brisket%`
        }
      }
    })
    res.send(searchedRecipes)
  } catch (err) {
    next(err)
  }
})

//gets a specific recipe
router.get('/:id', async (req, res, next) => {
  try {
    const userRecipes = await User.findByPk(req.user.id, {
      include: [
        {
          model: Recipe,
          where: {
            id: req.params.id
          }
        }
      ]
    })
    if (userRecipes.recipes) res.send(userRecipes.recipes)
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
