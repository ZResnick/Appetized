// apiRoutes/example.js
const router = require('express').Router()
const {Recipe, Folder} = require('../../db/models')

//blocks access to all other requests if not logged in
router.all('*', (req, res, next) => {
  if (!req.user) {
    res.sendStatus(401)
  } else {
    next()
  }
})

// gets all the folders for a specific user
router.get('/', async (req, res, next) => {
  try {
    const userFolders = await Folder.findAll({
      where: {
        userId: req.user.id
      },
      include: [{model: Recipe}]
    })
    if (userFolders) res.send(userFolders)
    else res.send(404)
  } catch (err) {
    next(err)
  }
})

//adds a folder for a specific user
router.post('/', async (req, res, next) => {
  try {
    const {title} = req.body
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
router.post('/:folderId/recipe/:recipeId', async (req, res, next) => {
  try {
    let folder = await Folder.findOne({
      where: {
        id: req.params.folderId
      }
    })
    if (folder) {
      await folder.addRecipe(req.params.recipeId)
    }
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

//removes a recipe a from a specific folder
router.post('/delete/:folderId/recipe/:recipeId', async (req, res, next) => {
  try {
    let folder = await Folder.findOne({
      where: {
        id: req.params.folderId
      }
    })
    if (folder) {
      await folder.removeRecipe(req.params.recipeId)
    }
    res.send(200)
  } catch (err) {
    next(err)
  }
})

//get all the recipes from a specific folder
router.get('/:id', async (req, res, next) => {
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

//Deletes a folder from a users recipe box
router.put('/deleteFolder/:folderId', async (req, res, next) => {
  try {
    const folder = await Folder.findAll({
      where: {
        userId: req.user.id,
        id: req.params.folderId
      }
    })
    if (folder[0]) {
      await folder[0].destroy()
      res.sendStatus(200)
    } else res.send(404)
  } catch (err) {
    next(err)
  }
})

//Updates a folders name
router.put('/changeName/:folderId', async (req, res, next) => {
  try {
    const {title} = req.body
    const folders = await Folder.findAll({
      where: {
        userId: req.user.id,
        id: req.params.folderId
      }
    })
    if (folders[0]) {
      let folder = folders[0]
      await folder.update({title})
      res.send(folder)
    } else res.send(404)
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
