// apiRoutes/example.js
const router = require('express').Router()
const {Recipe, User, Ingredient, GroceryList} = require('../../db/models')

//blocks access to all other requests if not logged in
router.all('*', (req, res, next) => {
  if (!req.user) {
    res.sendStatus(401)
  } else {
    next()
  }
})

// adds a recipe via the url
router.post('/:id', async (req, res, next) => {
  try {
    let recipe = await Recipe.findByPk(req.params.id, {
      include: [{model: Ingredient}]
    })
    let groceryList = await GroceryList.findOne({
      where: {
        userId: req.user.id,
        status: true
      }
    })
    if (!groceryList) {
      groceryList = await GroceryList.create({
        userId: req.user.id,
        status: true
      })
    }
    recipe.ingredients.forEach(async ing => {
      let ingredient = await Ingredient.findByPk(ing.id)
      ingredient.addGroceryList(groceryList.id)
    })
    res.send(groceryList)
  } catch (err) {
    next(err)
  }
})

//gets a users active grocery list.
router.get('/', async (req, res, next) => {
  try {
    const groceryList = await GroceryList.findOne({
      where: {
        userId: req.user.id,
        status: true
      },
      include: [
        {
          model: Ingredient
        }
      ]
    })
    if (groceryList) res.send(groceryList)
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
