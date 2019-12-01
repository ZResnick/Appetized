const db = require('../db')
const User = require('./user')
const Recipe = require('./recipe')
const Ingredient = require('./ingredient')
const RecipeIngredient = require('./recipeIngredient')

User.belongsToMany(Recipe, {through: 'user-recipe'})
Recipe.belongsToMany(User, {through: 'user-recipe'})

Recipe.belongsToMany(Ingredient, {through: RecipeIngredient})
Ingredient.belongsToMany(Recipe, {through: RecipeIngredient})

module.exports = {
  User,
  Recipe,
  Ingredient,
  RecipeIngredient,
  db
}
