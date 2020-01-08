const foodnetworkScraper = require('./foodNetwork')
const epicuriousScraper = require('./epicurious')
const bonAppetitScraper = require('./bonAppetit')
const allrecipesScraper = require('./allrecipes')
const chowhoundScraper = require('./chowhound')

const scrapers = {
  foodnetwork: foodnetworkScraper,
  epicurious: epicuriousScraper,
  bonappetit: bonAppetitScraper,
  allrecipes: allrecipesScraper,
  chowhound: chowhoundScraper
}
module.exports = scrapers

/*
food
simplyrecipes
tasty
yummly
chow
myrecipes
seriouseats
foodlab
*/
