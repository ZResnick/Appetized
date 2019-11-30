const User = require('./user')
const db = require('../db')
const Recipe = require('./recipe')
const Ingredient = require('./ingredient')

User.belongsToMany(Recipe, {through: 'user-recipe'})
Recipe.belongsToMany(User, {through: 'user-recipe'})

Recipe.belongsToMany(Ingredient, {through: 'recipe-ingredient'})
Ingredient.belongsToMany(Recipe, {through: 'recipe-ingredient'})

module.exports = {
  User,
  Recipe,
  Ingredient,
  db
}
