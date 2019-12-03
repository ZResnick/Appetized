import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_RECIPES = 'GOT_RECIPES'
const GOT_SINGLE_RECIPE = 'GOT_SINGLE_RECIPE'

//const REMOVED_RECIPE = 'REMOVED_RECIPE'

/**
 * INITIAL STATE
 */
const initialState = {all: [], single: {}}

/**
 * ACTION CREATORS
 */
const gotRecipes = recipes => ({type: GOT_RECIPES, recipes})
const gotSingleRecipe = recipe => ({type: GOT_SINGLE_RECIPE, recipe})
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

export const getSingleRecipe = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/recipes/${id}`)
    dispatch(gotSingleRecipe(data))
  } catch (err) {
    console.error(err)
  }
}

export const addNewRecipe = url => async dispatch => {
  try {
    const {data} = await axios.post(`/api/recipes/`, {url})
    dispatch(gotSingleRecipe(data))
    history.push(`/singleRecipe/${data.id}`)
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
      return {...state, all: action.recipes}
    case GOT_SINGLE_RECIPE:
      return {
        ...state,
        single: action.recipe
      }
    // case REMOVE_USER:
    //   return defaultUser
    default:
      return state
  }
}
