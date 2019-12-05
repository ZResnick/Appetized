const foodnetworkScraper = require('./foodNetwork')
const epicuriousScraper = require('./epicurious')

const scrapers = {
  foodnetwork: foodnetworkScraper,
  epicurious: epicuriousScraper
  /*
  food
  bonappetit
  chwhound
  allrecipes
  simplyrecipes
  tasty
  yummly
  chow
  myrecipes

  */
}

module.exports = scrapers
