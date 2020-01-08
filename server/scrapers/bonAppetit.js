const rp = require('request-promise')
const $ = require('cheerio')

const bonAppetitScraper = url => {
  return rp(url)
    .then(function(html) {
      let recipe = {
        site: 'Bon Appetit',
        url
      }

      //title
      recipe.title = $('.top-anchor', html).text()

      //author
      recipe.author = $('.contributor-name', html).text()

      //ingredients
      recipe.ingredients = $('.ingredients__text', html)
        .each(function() {
          $(this).append('**')
        })
        .text()
        .split('**')
        .filter(ingredient => ingredient.length)

      if (!recipe.ingredients.length)
        recipe.ingredients = ['Ingredients found in instructions...']

      //instructions
      recipe.instructions = $('.step', html)
        .each(function() {
          $(this).append('**')
        })
        .text()
        .split('**')
        .filter(instruction => instruction.length)

      //image
      recipe.imageUrl = $('meta[property="og:image"]', html).attr('content')

      //misc
      recipe.misc = $('.o-RecipeInfo', html)
        .text()
        .split(/\s\n+/)
        .map(data => data.trim())
        .filter(data => data.length > 0)
        .map(data => data.replace(/\n\s+/, ' '))

      //tags
      recipe.tags = $('.o-Capsule__m-TagList', html)
        .text()
        .trim()
        .split(/\n\s+/)

      return recipe
    })
    .catch(function(err) {
      console.log(err)
    })
}

module.exports = bonAppetitScraper

// const testUrl = 'https://www.bonappetit.com/recipe/corned-beef'

// const testUrl2 = 'https://www.bonappetit.com/recipe/saag-paneer-but-with-feta'

// const test = async url => {
//   let recipe = await bonAppetitScraper(url)
//   console.log(recipe)
// }

// test(testUrl)
// test(testUrl2)
