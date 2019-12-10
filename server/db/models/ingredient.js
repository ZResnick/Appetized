const Sequelize = require('sequelize')
const db = require('../db')

const Ingredient = db.define('ingredient', {
  title: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Ingredient
