const rp = require('request-promise')
const $ = require('cheerio')

const chowhoundScraper = url => {
  return rp(url)
    .then(function(html) {
      let recipe = {
        site: 'Chowhound'
      }
      recipe.url = url
      recipe.title = $('.fr_r_info h1', html).text()
      recipe.ingredients = $('.freyja_box ul', html)
        .text()
        .trim()
        .split(/\n+/)
        .filter(ingredient => ingredient.length)
      let info = []
      info.push($('.frr_serves', html).text())
      info.push($('.frr_difficulty', html).text())
      let times = $('.frr_totaltime', html)
        .text()
        .split(/\n/)
        .map(data => data.trim())
        .filter(data => data.length > 0)
      if (times.length) {
        times.splice(0, 1)
        times.splice(1, 1)
        times[0] = `Total: ${times[0]}`
        times[1] = `Active: ${times[1]}`
        info = info.concat(times)
      }
      recipe.misc = info
      let instructionsAndAuthor = $('.fr_instruction_rec .frr_wrap', html)
        .text()
        .trim()
        .split(/\s\s+/)
      recipe.instructions = instructionsAndAuthor
        .slice(0, instructionsAndAuthor.length - 1)
        .map(step => {
          if (parseInt(step[0]) > 0) {
            return step.slice(1)
          } else {
            return step
          }
        })
        .filter(instruction => instruction.length)
      recipe.author = $('.by_line span', html).text()
      recipe.imageUrl = $('.fr_hdimgov img', html).attr('data-src')
      let tags = $('.freyja_fulltags', html)
        .text()
        .split(/\n\s+/)
      recipe.tags = tags.slice(1, tags.length - 1)
      return recipe
    })
    .catch(function(err) {
      console.log(err)
    })
}

module.exports = chowhoundScraper

// const testUrl1 =
//   'https://www.chowhound.com/recipes/shrimp-po-boy-sandwich-32111'
// const testUrl =
//   'https://www.chowhound.com/recipes/pernil-roasted-pork-recipe-que-chevere-32129'

// const test = async url => {
//   let recipe = await chowhoundScraper(url)
//   console.log(recipe)
// }

// test(testUrl)
// test(testUrl1)
