const foodnetworkScraper = require('./foodNetwork')
const epicuriousScraper = require('./epicurious')
const bonAppetitScraper = require('./bonAppetit')

const scrapers = {
  foodnetwork: foodnetworkScraper,
  epicurious: epicuriousScraper,
  bonappetit: bonAppetitScraper
}
module.exports = scrapers

/*
food
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
