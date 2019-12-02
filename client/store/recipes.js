import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_RECIPES = 'GOT_RECIPES'
//const REMOVED_RECIPE = 'REMOVED_RECIPE'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */
const gotRecipes = recipes => ({type: GOT_RECIPES, recipes})
//const removedRecipe = id => ({type: REMOVED_RECIPE, id})

/**
 * THUNK CREATORS
 */
export const getRecipes = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/recipes/')
    dispatch(gotRecipes(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_RECIPES:
      return action.recipes
    // case REMOVE_USER:
    //   return defaultUser
    default:
      return state
  }
}
