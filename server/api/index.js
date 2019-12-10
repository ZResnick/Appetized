const router = require('express').Router()
module.exports = router

router.use('/users', require('./routes/users'))
router.use('/recipes', require('./routes/recipes'))
router.use('/folders', require('./routes/folders'))
router.use('/groceryList', require('./routes/groceryList'))

router.use((req, res, next) => {
  const error = new Error('Not found.')
  error.status = 404
  next(error)
})
