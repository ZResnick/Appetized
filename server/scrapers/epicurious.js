const rp = require('request-promise')
const $ = require('cheerio')
// const url =
//   'https://www.epicurious.com/recipes/food/views/our-favorite-spaghetti-and-meatballs-56389489'

const epicuriousScraper = url => {
  return rp(url)
    .then(function(html) {
      //success!
      const recipe = {
        site: 'epicurious'
      }
      recipe.url = url
      recipe.title = $('.title-source h1', html)
        .text()
        .trim()
      recipe.author = $('.contributor', html).text()
      recipe.ingredients = $('.ingredient', html)
        .each(function() {
          $(this).append('**')
        })
        .text()
        .split('**')
        .filter(ingredient => ingredient.length)
      recipe.instructions = $('.preparation-steps', html)
        .text()
        .trim()
        .split(/\s\s+/)
        .filter(instruction => instruction.length)
      let times = $('.summary-data', html)
        .each(function() {
          $('dt', this).append(': ')
        })
        .text()
        .trim()
        .split(/\s\s+/)
      let nutrition = $('.nutrition ul li', html)
        .each(function() {
          $('span', this).append(' ')
        })
        .text()
        .trim()
        .split(/\s\s+/)
      recipe.misc = times.concat(nutrition)
      recipe.imageUrl = $('picture > source', html).attr('srcset')
      recipe.tags = $('.tags dt', html)
        .each(function() {
          $(this).append('**')
        })
        .text()
        .split('**')
      return recipe
    })
    .catch(function(err) {
      console.error(err)
    })
}

module.exports = epicuriousScraper

// const test = async url => {
//   let recipe = await epicuriousScraper(url)
//   console.log(recipe)
// }

// test(url)
