const foodnetworkScraper = require('./foodNetwork')
const epicuriousScraper = require('./epicurious')

const scrapers = {
  foodnetwork: foodnetworkScraper,
  epicurious: epicuriousScraper
}

module.exports = scrapers
