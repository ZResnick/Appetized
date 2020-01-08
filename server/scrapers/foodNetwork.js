const rp = require('request-promise')
const $ = require('cheerio')

const foodnetworkScraper = url => {
  return rp(url)
    .then(function(html) {
      let article = {
        site: 'Food Network'
      }
      article.url = url
      let title = $('.o-AssetTitle__a-HeadlineText', html).text()
      article.title = title.slice(0, title.length / 2)
      let author = $('.o-Attribution__a-Name > a', html).text()
      author = author.slice(0, author.length / 2).substr(19)
      if (author.slice(0, 20) === 'Food Network Kitchen')
        author = 'Food Network Kitchen'
      article.author = author
      article.ingredients = $('.o-Ingredients__m-Body', html)
        .text()
        .trim()
        .split(/\s\s+/)
        .filter(ingredient => ingredient.length)

      if (!article.ingredients.length)
        article.ingredients = ['Ingredients found in instructions...']
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

/*
const testUrl =
  'https://www.foodnetwork.com/recipes/spring-frittata-recipe-2104680'

const testUrl2 =
  'https://www.foodnetwork.com/recipes/giada-de-laurentiis/basic-polenta-recipe-1915185'

const test = async url => {
  let article = await foodnetworkScraper(url)
  console.log(article)
}

test(testUrl)
test(testUrl2)
*/
