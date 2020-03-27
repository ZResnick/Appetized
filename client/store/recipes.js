/* eslint-disable complexity */
import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_RECIPES = 'GOT_RECIPES'
const GOT_PAGE_RECIPES = 'GOT_PAGE_RECIPES'
const GOT_USER_RECIPES = 'GOT_USER_RECIPES'
const GOT_SINGLE_RECIPE = 'GOT_SINGLE_RECIPE'
const GOT_SEARCHED_BY_TITLE = 'GOT_SEARCHED_BY_TITLE'
const GOT_SEARCHED_BY_TITLE_STATIC = 'GOT_SEARCHED_BY_TITLE_STATIC'
const GOT_TOTAL_COUNT = 'GOT_TOTAL_COUNT'

const GOT_SEARCHED_PAGE_RECIPES = 'GOT_SEARCHED_PAGE_RECIPES'
const GOT_SEARCHED_COUNT = 'GOT_SEARCHED_COUNT'

//const REMOVED_RECIPE = 'REMOVED_RECIPE'

/**
 * INITIAL STATE
 */
const initialState = {
  totalCount: null,
  searchedRecipeCount: null,
  all: [],
  userRecipes: [],
  searchedByTitle: [],
  searchedByTitleStatic: [],
  single: {},
  pageRecipes: [],
  searchedPageRecipes: []
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
const gotPageRecipes = recipes => ({
  type: GOT_PAGE_RECIPES,
  recipes
})
const gotTotalCount = count => ({type: GOT_TOTAL_COUNT, count})

const gotSearchedPageRecipes = recipes => ({
  type: GOT_SEARCHED_PAGE_RECIPES,
  recipes
})
const gotSearchedCount = count => ({type: GOT_SEARCHED_COUNT, count})
//const removedRecipe = id => ({type: REMOVED_RECIPE, id})

/**
 * THUNK CREATORS
 */

export const getSearchedCount = search => async dispatch => {
  try {
    const {data} = await axios.get(
      `/api/recipes/search-by-title-count?search=${search}`
    )
    dispatch(gotSearchedCount(data))
  } catch (err) {
    console.error(err)
  }
}

export const getSearchedPageRecipes = (search, pageNum) => async dispatch => {
  try {
    const {data} = await axios.get(
      `/api/recipes/search-by-title/${pageNum}?search=${search}`
    )
    console.log('HELLO THERE')
    dispatch(gotSearchedPageRecipes(data))
  } catch (err) {
    console.error(err)
  }
}

export const getTotalCount = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/recipes/totalCount')
    dispatch(gotTotalCount(data))
  } catch (err) {
    console.error(err)
  }
}

export const getPageRecipes = pageNum => async dispatch => {
  try {
    const {data} = await axios.get(`/api/recipes/allRecipes/${pageNum}`)
    console.log('HELLO THERE')
    dispatch(gotPageRecipes(data))
  } catch (err) {
    console.error(err)
  }
}

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

export const fixRecipe = url => async dispatch => {
  try {
    await axios.put(`/api/recipes/fixRecipe`, {url})
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
    case GOT_PAGE_RECIPES:
      return {
        ...state,
        pageRecipes: action.recipes
      }
    case GOT_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.count
      }
    case GOT_SEARCHED_PAGE_RECIPES:
      return {
        ...state,
        searchedPageRecipes: action.recipes
      }
    case GOT_SEARCHED_COUNT:
      return {
        ...state,
        searchedRecipeCount: action.count
      }
    default:
      return state
  }
}
