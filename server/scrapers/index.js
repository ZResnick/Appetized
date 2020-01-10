const foodnetworkScraper = require('./foodNetwork')
const epicuriousScraper = require('./epicurious')
const bonAppetitScraper = require('./bonAppetit')
const allrecipesScraper = require('./allrecipes')
const chowhoundScraper = require('./chowhound')
const simplyrecipesScraper = require('./simplyrecipes')
const nytimesScraper = require('./nytimes')

const scrapers = {
  foodnetwork: foodnetworkScraper,
  epicurious: epicuriousScraper,
  bonappetit: bonAppetitScraper,
  allrecipes: allrecipesScraper,
  simplyrecipes: simplyrecipesScraper,
  chowhound: chowhoundScraper,
  nytimes: nytimesScraper
}
module.exports = scrapers

/*
seriouseats
food
tasty
yummly
chow
myrecipes
foodlab
*/
