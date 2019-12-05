'use strict'

const db = require('../server/db')
const {User, Recipe} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      firstName: 'Cody',
      lastName: 'The Pug'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      firstName: 'Murphy',
      lastName: 'Slaw'
    })
  ])

  // const recipes = await Promise.all([
  //   Recipe.create({
  //     url:
  //       'https://www.epicurious.com/recipes/food/views/brisket-with-pomegranate-walnut-sauce-and-pistachio-gremolata',
  //     site: 'epicurious',
  //     title: 'Brisket with Pomegranate-Walnut Sauce and Pistachio Gremolata',
  //     author: 'LOUISA SHAFIA',
  //     instructions: [
  //       'Season brisket all over with salt and pepper. Transfer to a large 2-gallon resealable plastic bag or bowl (use roasting pan only if necessary).',
  //       'Purée garlic, walnuts, honey, and 1 cup pomegranate juice in a blender until very smooth. Add remaining 2 cups pomegranate juice and blend until smooth. Pour marinade over brisket. Seal bag or cover bowl tightly with foil. Chill, turning occasionally, at least 24 hours or up to 48 hours..'
  //     ],
  //     ingredients: [
  //       '1 (7-pound) beef brisket with fat, fat trimmed to 1/4" thickness',
  //       '2 teaspoons (or more) kosher salt'
  //     ]
  //   }),
  //   Recipe.create({
  //     url:
  //       'https://www.foodnetwork.com/recipes/zucchini-fettuccine-with-tomato-sauce-recipe-1973336',
  //     site: 'Food Network',
  //     title:
  //       'Zucchini "Fettuccine" With Tomato SauceZucchini "Fettuccine" With Tomato Sauce',
  //     author: 'Food Network',
  //     instructions: [
  //       'Trim and peel the zucchini, then use a mandoline or a vegetable peeler to thinly slice lengthwise into wide ribbons (stop when you get to the seeds). Cut the ribbons into 1/4-to-1/2-inch-wide strips to make them look like fettuccine. Transfer to a colander and toss with 3/4 teaspoon salt; let drain in the sink, tossing occasionally, about 30 minutes. Rinse well and pat dry.',
  //       'Meanwhile, peel the tomatoes using a sharp vegetable peeler, then halve horizontally and squeeze out the seeds. Puree 1 tomato with the olive oil, garlic, jalapeno, and 1/4 teaspoon each salt and pepper in a food processor or blender. Transfer to a bowl. Chop the remaining 4 tomatoes and add to the bowl; add the pine nuts, basil, oregano, and salt to taste.'
  //     ],
  //     ingredients: [
  //       ' 4 large zucchini or yellow squash',
  //       '1 teaspoon chopped jalapeno pepper'
  //     ]
  //   })
  // ])

  console.log(`seeded ${users.length} users successfully`)
  // console.log(`seeded ${recipes.length} recipes successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
