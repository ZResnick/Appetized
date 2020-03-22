import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_RECIPES = 'GOT_RECIPES'
const GOT_USER_RECIPES = 'GOT_USER_RECIPES'
const GOT_SINGLE_RECIPE = 'GOT_SINGLE_RECIPE'
const GOT_SEARCHED_BY_TITLE = 'GOT_SEARCHED_BY_TITLE'
const GOT_SEARCHED_BY_TITLE_STATIC = 'GOT_SEARCHED_BY_TITLE_STATIC'

//const REMOVED_RECIPE = 'REMOVED_RECIPE'

/**
 * INITIAL STATE
 */
const initialState = {
  all: [],
  userRecipes: [],
  searchedByTitle: [],
  searchedByTitleStatic: [],
  single: {}
}

/**
 * ACTION CREATORS
 */
const gotRecipes = recipes => ({type: GOT_RECIPES, recipes})
const gotUserRecipes = recipes => ({type: GOT_USER_RECIPES, recipes})
const gotSingleRecipe = recipe => ({type: GOT_SINGLE_RECIPE, recipe})
const gotSearchedByTitle = recipes => ({
  type: GOT_SEARCHED_BY_TITLE,
  recipes
})
const gotSearchedByTitleStatic = recipes => ({
  type: GOT_SEARCHED_BY_TITLE_STATIC,
  recipes
})
//const removedRecipe = id => ({type: REMOVED_RECIPE, id})

/**
 * THUNK CREATORS
 */
export const getRecipes = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/recipes/allRecipes')
    dispatch(gotRecipes(data))
  } catch (err) {
    console.error(err)
  }
}

export const getUserRecipes = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/recipes')
    dispatch(gotUserRecipes(data))
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

export const getSearchedByTitle = search => async dispatch => {
  try {
    const {data} = await axios.get(
      `/api/recipes/search-by-title?search=${search}`
    )
    dispatch(gotSearchedByTitle(data))
  } catch (err) {
    console.error(err)
  }
}

export const getSearchedByTitleStatic = search => async dispatch => {
  try {
    const {data} = await axios.get(
      `/api/recipes/search-by-title?search=${search}`
    )
    dispatch(gotSearchedByTitleStatic(data))
  } catch (err) {
    console.error(err)
  }
}

export const saveRecipeToBox = url => async () => {
  try {
    await axios.post(`/api/recipes/`, {url})
  } catch (err) {
    console.error(err)
  }
}

export const deleteRecipeFromBox = id => async () => {
  try {
    await axios.put(`/api/recipes/deleteRecipe/${id}`)
  } catch (err) {
    console.error(err)
  }
}

export const addNewRecipe = url => async dispatch => {
  try {
    const {data} = await axios.post(`/api/recipes/`, {url})
    dispatch(gotSingleRecipe(data))
    history.push(`/allRecipes`)
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
    case GOT_USER_RECIPES:
      return {...state, userRecipes: action.recipes}
    case GOT_SINGLE_RECIPE:
      return {
        ...state,
        single: action.recipe
      }
    case GOT_SEARCHED_BY_TITLE:
      return {
        ...state,
        searchedByTitle: action.recipes
      }
    case GOT_SEARCHED_BY_TITLE_STATIC:
      return {
        ...state,
        searchedByTitleStatic: action.recipes
      }
    default:
      return state
  }
}
