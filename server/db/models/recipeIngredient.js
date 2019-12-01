const Sequelize = require('sequelize')
const db = require('../db')

const RecipeIngredient = db.define('recipeIngredients', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  unit: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = RecipeIngredient
