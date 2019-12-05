// apiRoutes/example.js
const router = require('express').Router()
const {Recipe, User, Folder} = require('../../db/models')
const scrapers = require('../../scrapers')

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
router.all('*', (req, res, next) => {
  if (!req.user) {
    res.sendStatus(401)
  } else {
    next()
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

// gets all the folders for a specific user
router.get('/folders', async (req, res, next) => {
  try {
    const userFolders = await Folder.findAll({
      where: {
        userId: req.user.id
      }
    })
    if (userFolders) res.send(userFolders)
    else res.send(404)
  } catch (err) {
    next(err)
  }
})

//adds a folder for a specific user
router.post('/folders', async (req, res, next) => {
  try {
    const {title} = req.body
    console.log(req.body)
    let folder = await Folder.create({
      title,
      userId: req.user.id
    })
    res.send(folder)
  } catch (err) {
    next(err)
  }
})

//assign a recipe a to a specific folder
router.post('/folders/:folderId/recipe/:recipeId', async (req, res, next) => {
  try {
    console.log('PARAMS --->', req.params)
    let folder = await Folder.findOne({
      where: {
        id: req.params.folderId
      }
    })
    if (folder) {
      await folder.addRecipe(req.params.recipeId)
    }
    res.send(200)
  } catch (err) {
    next(err)
  }
})

//get all the recipes from a specific folder
router.get('/folders/:id', async (req, res, next) => {
  try {
    const userFolders = await Folder.findAll({
      where: {
        userId: req.user.id,
        id: req.params.id
      },
      include: [{model: Recipe}]
    })
    if (userFolders) res.send(userFolders)
    else res.send(404)
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
