const db = require('../db')
const User = require('./user')
const Recipe = require('./recipe')
const Folder = require('./folder')
const Ingredient = require('./ingredient')
const GroceryList = require('./groceryList')

User.belongsToMany(Recipe, {through: 'user-recipe'})
Recipe.belongsToMany(User, {through: 'user-recipe'})

Recipe.belongsToMany(Ingredient, {through: 'recipe-ingredient'})
Ingredient.belongsToMany(Recipe, {through: 'recipe-ingredient'})

GroceryList.belongsToMany(Ingredient, {through: 'groceryList-ingredient'})
Ingredient.belongsToMany(GroceryList, {through: 'groceryList-ingredient'})

Folder.belongsToMany(Recipe, {through: 'folder-recipe', unique: false})
Recipe.belongsToMany(Folder, {through: 'folder-recipe', unique: false})

GroceryList.belongsTo(User)
Folder.belongsTo(User)

module.exports = {
  User,
  Recipe,
  Folder,
  Ingredient,
  GroceryList,
  db
}

/*
Decided to put ingredients as an array because of the uniqueness of each recipe.
May change this at some point if i can do what's on line 32
*/

// const Ingredient = require('./ingredient')
//const RecipeIngredient = require('./recipeIngredient')

/*
In order to add recipeIngredient, we need to be able to parse the ingredients
from a website better.  For the time being, we'll keep ingredients  of the
format "1 (7-pound) beef brisket with fat, fat trimmed to 1/4" thickness".
Maybe in the future, we'll try to organize that as unit pounds, quanutity: 1,
ingredient: brisket.
*/
