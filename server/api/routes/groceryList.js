// apiRoutes/example.js
const router = require('express').Router()
const {Recipe, User, Ingredient, GroceryList} = require('../../db/models')
const utils = require('./utils')

//blocks access to all other requests if not logged in
// router.all('*', (req, res, next) => {
//   if (!req.user) {
//     res.sendStatus(401)
//   } else {
//     next()
//   }
// })

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

//deletes an ingredient from a users grocery list
router.put('/delete/:id', async (req, res, next) => {
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
    await groceryList.removeIngredient(req.params.id)
    const listToSend = await GroceryList.findOne({
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
    if (listToSend) res.send(listToSend)
    else res.send(404)
  } catch (err) {
    next(err)
  }
})

router.put('/emailList', async (req, res, next) => {
  try {
    let groceryList = await GroceryList.findOne({
      where: {
        // userId: req.user.id,
        userId: req.user.id,
        status: true
      },
      include: [
        {
          model: Ingredient
        }
      ]
    })
    if (groceryList) {
      //This line sends the email confirmation
      utils.emailConfirmation(req.user.email, groceryList.ingredients)

      await groceryList.update({
        status: false
      })
      let newGroceryList = await GroceryList.create({
        userId: req.user.id,
        status: true
      })
      if (newGroceryList) res.send(newGroceryList)
    }
  } catch (error) {
    next(error)
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
