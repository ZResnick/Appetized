const Sequelize = require('sequelize')
const db = require('../db')

const Folder = db.define('folder', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Folder
