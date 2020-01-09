const rp = require('request-promise')
const $ = require('cheerio')

const nytimesScraper = url => {
  return rp(url)
    .then(function(html) {
      let recipe = {
        site: 'The New York Times',
        url
      }

      //title
      recipe.title = $('.recipe-title', html).attr('data-name')

      //author
      recipe.author = $('.byline-name', html).text()

      //ingredients
      let quantities = $('.quantity', html)
        .each(function() {
          $(this).append('**')
        })
        .text()
        .replace(/\n {20}/g, '')
        .replace(/\n {18}/g, '')
        .split('**')
        .filter(ingredient => ingredient.length)

      let ingredientsRaw = $('.ingredient-name', html)
        .each(function() {
          $(this).append('**')
        })
        .text()
        .replace(/\n {20}/g, '')
        .replace(/\n {18}/g, '')
        .split('**')
        .filter(
          ingredient =>
            ingredient.length && ingredient !== 'Nutritional Information'
        )

      let ingredients = []

      for (let i = 0; i < ingredientsRaw.length; i++) {
        let curr = ingredientsRaw[i]
        if (curr[0] !== curr[0].toUpperCase())
          ingredients.push(`${quantities.shift()} ${curr}`)
        else ingredients.push(curr)
      }

      recipe.ingredients = ingredients

      if (!recipe.ingredients.length)
        recipe.ingredients = ['Ingredients found in instructions...']

      //instructions
      recipe.instructions = $('.recipe-steps > li', html)
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

module.exports = nytimesScraper

// let testUrl =
//   'https://cooking.nytimes.com/recipes/1020743-roasted-vegan-sausages-with-cauliflower-and-olives?module=Recipe+of+The+Day&pgType=homepage&action=click'

// // const testUrl2 = 'https://www.bonappetit.com/recipe/saag-paneer-but-with-feta'

// const test = async url => {
//   let recipe = await bonAppetitScraper(url)
//   console.log(recipe)
// }

// test(testUrl)
// // test(testUrl2)
