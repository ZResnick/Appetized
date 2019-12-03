// apiRoutes/example.js
const router = require('express').Router()
const {Recipe, User} = require('../../db/models')
const scrapers = require('../../scrapers')

// router.all('*', async (req, res, next) => {
//   if (!req.user) {
//     res.sendStatus(401)
//   } else {
//     next()
//   }
// })

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

router.get('/allRecipes', async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll()
    if (recipes) res.send(recipes)
    else res.send(404)
  } catch (err) {
    next(err)
  }
})

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

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    let url = req.body.url
    let tail = url.split('www.')[1]
    let base = tail.split('.com')[0]
    let data = await scrapers[base](url)
    console.log('HELLO', data)
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
    newRecipe.addUser(req.user.id)
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
