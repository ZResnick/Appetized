const Sequelize = require('sequelize')
const db = require('../db')

const Recipe = db.define('recipes', {
  url: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
      notEmpty: true
    }
  },
  site: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  author: {
    type: Sequelize.STRING
  },
  instructions: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  ingredients: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://mamadips.com/wp-content/uploads/2016/11/defimage.gif',
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
  // tags: {
  //   type: Sequelize.ARRAY(Sequelize.STRING)
  // },
  // misc: {
  //   type: Sequelize.ARRAY(Sequelize.STRING)
  // }
})

// Recipe.beforeValidate(article => {
//   // article.tags = article.tags.map(tag => tag.toLowerCase())
//   article.instructions = article.instructions.filter(instruction =>
//     instruction.match(/[a-zA-Z0-9]+/g)
//   )
// })

module.exports = Recipe
