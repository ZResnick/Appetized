const rp = require('request-promise')
const $ = require('cheerio')

const simplyrecipesScraper = url => {
  return rp(url)
    .then(function(html) {
      const recipe = {
        site: 'Simply Recipes'
      }
      recipe.url = url
      recipe.title = $('.entry-title', html).text()
      recipe.author = $('.author', html)
        .text()
        .trim()
      recipe.ingredients = $('.recipe-ingredients ul', html)
        .text()
        .trim()
        .split(/\n/)
        .filter(ingred => ingred.length)
      let times = $('.recipe-meta ul', html)
        .each(function() {
          $('li', this).append('**')
        })
        .text()
        .trim()
        .split('**')
      recipe.misc = times.slice(0, times.length - 1)
      recipe.instructions = $('#sr-recipe-method > div', html)
        .text()
        .trim()
        .split(/\n+/)
        .map(step => {
          if (parseInt(step[0]) > 0) {
            return step.slice(2)
          } else {
            return step
          }
        })
      recipe.imageUrl = $('.featured-image > img', html).attr('src')
      let tags = $('.primary-terms-container', html)
        .each(function() {
          $('a', this).append('**')
        })
        .text()
        .trim()
        .split('**')
      recipe.tags = tags.slice(0, tags.length - 1)
      return recipe
    })
    .catch(function(err) {
      console.log(err)
    })
}

module.exports = simplyrecipesScraper

// const testUrl1 = 'https://www.simplyrecipes.com/recipes/chicken_piccata_pasta/'
// const testUrl =
//   'https://www.simplyrecipes.com/recipes/penne_with_ricotta_and_asparagus/'

// const test = async url => {
//   let recipe = await simplyrecipesScraper(url)
//   console.log(recipe)
// }

// test(testUrl)
// test(testUrl1)
