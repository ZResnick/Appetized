const rp = require('request-promise')
const $ = require('cheerio')

const url = 'https://www.foodnetwork.com/recipes/spring-frittata-recipe-2104680'

const foodnetworkScraper = url => {
  return rp(url)
    .then(function(html) {
      let article = {
        site: 'Food Network'
      }
      article.url = url
      article.title = $('.o-AssetTitle__a-HeadlineText', html).text()
      article.author = $('.o-Attribution__a-Name > a', html).text()
      article.ingredients = $('.o-Ingredients__m-Body', html)
        .text()
        .trim()
        .split(/\s\s+/)
        .filter(ingredient => ingredient.length)
      article.misc = $('.o-RecipeInfo', html)
        .text()
        .split(/\s\n+/)
        .map(data => data.trim())
        .filter(data => data.length > 0)
        .map(data => data.replace(/\n\s+/, ' '))
      article.instructions = $('.o-Method__m-Step', html)
        .text()
        .trim()
        .split(/\s\s+/)
        .filter(instruction => instruction.length)
      article.imageUrl = $('meta[property="og:image"]', html).attr('content')
      article.tags = $('.o-Capsule__m-TagList', html)
        .text()
        .trim()
        .split(/\n\s+/)
      return article
    })
    .catch(function(err) {
      console.log(err)
      //handle error
    })
}

module.exports = foodnetworkScraper

// const test = async url => {
//   let article = await foodnetworkScraper(url)
//   console.log(article)
// }

// test(url)
