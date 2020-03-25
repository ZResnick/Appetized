const foodnetworkScraper = require('./foodNetwork')
const epicuriousScraper = require('./epicurious')
const bonAppetitScraper = require('./bonAppetit')
const allrecipesScraper = require('./allrecipes')
const chowhoundScraper = require('./chowhound')
const simplyrecipesScraper = require('./simplyrecipes')
const nytimesScraper = require('./nytimes')
const sallysBakingAddictionScraper = require('./sallysBakingAddiction')

const scrapers = {
  foodnetwork: foodnetworkScraper,
  epicurious: epicuriousScraper,
  bonappetit: bonAppetitScraper,
  allrecipes: allrecipesScraper,
  simplyrecipes: simplyrecipesScraper,
  chowhound: chowhoundScraper,
  nytimes: nytimesScraper,
  sallysbakingaddiction: sallysBakingAddictionScraper
}
module.exports = scrapers

/*
http://thespruceeats.com
chefeps
seriouseats
food
tasty
yummly
chow
myrecipes
foodlab
*/
