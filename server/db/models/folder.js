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

// Recipe.beforeValidate(article => {
//   // article.tags = article.tags.map(tag => tag.toLowerCase())
//   article.instructions = article.instructions.filter(instruction =>
//     instruction.match(/[a-zA-Z0-9]+/g)
//   )
// })

module.exports = Folder
