const foodnetworkScraper = require('./foodNetwork')
const epicuriousScraper = require('./epicurious')

const scrapers = {
  foodnetwork: foodnetworkScraper,
  epicurious: epicuriousScraper

  /*
  food
  bonappetit
  chowhound
  allrecipes
  simplyrecipes
  tasty
  yummly
  chow
  myrecipes
  seriouseats
  foodlab
  */
}

module.exports = scrapers
