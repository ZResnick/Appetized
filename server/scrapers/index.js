const foodnetworkScraper = require('./foodNetwork')
const epicuriousScraper = require('./epicurious')
const bonAppetitScraper = require('./bonAppetit')
const allrecipesScraper = require('./allrecipes')
const chowhoundScraper = require('./chowhound')
const simplyrecipesScraper = require('./simplyrecipes')

const scrapers = {
  foodnetwork: foodnetworkScraper,
  epicurious: epicuriousScraper,
  bonappetit: bonAppetitScraper,
  allrecipes: allrecipesScraper,
  simplyrecipes: simplyrecipesScraper,
  chowhound: chowhoundScraper
}
module.exports = scrapers

/*
food
tasty
yummly
chow
myrecipes
seriouseats
foodlab
*/
