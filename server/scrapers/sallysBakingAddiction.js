const rp = require('request-promise')
const $ = require('cheerio')

const sallysBakingAddictionScraper = url => {
  return rp(url)
    .then(function(html) {
      let recipe = {
        site: "Sally's Baking Addiction",
        author: 'Sally McKenney',
        url
      }
      recipe.title = $('.entry-title', html).text()
      recipe.imageUrl = $('.aligncenter', html).attr('src')

      recipe.ingredients = $('.tasty-recipes-ingredients ul', html)
        .text()
        .trim()
        .split(/\n+/)
        .filter(ingredient => ingredient.length)
        .map(el => {
          if (el[el.length - 1] === '*') {
            return el
              .split('')
              .slice(0, el.length - 1)
              .join('')
          } else return el
        })

      recipe.instructions = $('.tasty-recipes-instructions ol', html)
        .text()
        .trim()
        .split(/\n+/)
        .filter(ingredient => ingredient.length)

      let notes = $('.tasty-recipes-notes ol', html)
        .text()
        .trim()
        .split(/\n+/)
        .filter(note => note.length)

      if (notes.length) recipe.instructions.push(...['Notes:', ...notes])

      let prepTime = $('.prep-time', html)
        .text()
        .trim()
        .split(/\n\s\s+/)

      let cookTime = $('.cook-time', html)
        .text()
        .trim()
        .split(/\n\s\s+/)

      let totalYield = $('.cook-time', html)
        .text()
        .trim()
        .split(/\n\s\s+/)

      recipe.misc = [...prepTime, ...cookTime, ...totalYield]

      recipe.tags = $('.breadcrumbs', html)
        .text()
        .trim()
        .split(/\n\s+/)
        .filter(tag => tag !== 'Home' && tag !== 'Recipes')

      return recipe
    })
    .catch(function(err) {
      console.log(err)
    })
}

module.exports = sallysBakingAddictionScraper

// const testUrl = 'https://sallysbakingaddiction.com/mini-quiche-recipe/'

// const testUrl2 = 'https://sallysbakingaddiction.com/grandmas-irish-soda-bread/'

// const test = async url => {
//   let recipe = await sallysBakingAddictionScraper(url)
//   console.log(recipe)
// }

// test(testUrl)
// test(testUrl2)
