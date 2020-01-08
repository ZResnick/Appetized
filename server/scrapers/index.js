const foodnetworkScraper = require('./foodNetwork')
const epicuriousScraper = require('./epicurious')
const bonAppetitScraper = require('./bonAppetit')
const allrecipesScraper = require('./allrecipes')

const scrapers = {
  foodnetwork: foodnetworkScraper,
  epicurious: epicuriousScraper,
  bonappetit: bonAppetitScraper,
  allrecipes: allrecipesScraper
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
