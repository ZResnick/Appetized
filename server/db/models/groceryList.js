const Sequelize = require('sequelize')
const db = require('../db')

const GroceryList = db.define('groceryList', {
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
})

module.exports = GroceryList
