const rp = require('request-promise')
const $ = require('cheerio')

const allrecipesScraper = url => {
  return rp(url)
    .then(function(html) {
      let recipe = {
        site: 'All Recipes'
      }
      recipe.url = url
      recipe.title = $('.recipe-summary__h1', html).text()
      recipe.author = $('.submitter__name', html).text()
      recipe.ingredients = $('.checkList__line', html)
        .text()
        .trim()
        .split(/\s\s+/)
        .filter(
          ingredient =>
            ingredient !== 'Add all ingredients to list' && ingredient.length
        )
      let times = $('.prepTime__item', html)
        .text()
        .trim()
        .split(/\n\s\s+/)
      let nutr = $('.nutrition-summary-facts', html)
        .text()
        .trim()
        .replace(/\s\s/g, ' ')
        .split(/;\s+|.?\s\s+/)
      let nutrition = nutr.slice(1, nutr.length - 1)
      recipe.misc = times.concat(nutrition)
      recipe.instructions = $('.recipe-directions__list > li', html)
        .text()
        .trim()
        .split(/\s\s+/)
        .filter(instruction => instruction.length)
      recipe.imageUrl = $('.rec-photo', html).attr('src')
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

module.exports = allrecipesScraper

// const testUrl =
//   'https://www.allrecipes.com/recipe/93597/authentic-and-easy-shrimp-curry/'

// const testUrl2 =
//   'https://www.allrecipes.com/recipe/256482/panettone-french-toast/?clickId=right%20rail1&internalSource=rr_feed_recipe_sb&referringId=228052%20referringContentType%3Drecipe'

// const test = async url => {
//   let recipe = await allrecipesScraper(url)
//   console.log(recipe)
// }

// test(testUrl)
// test(testUrl2)
