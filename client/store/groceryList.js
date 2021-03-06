import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_GROCERY_LIST = 'GOT_GROCERY_LIST'
const CHECKOUT = 'CHECKOUT'

/**
 * INITIAL STATE
 */
const initialState = {ingredients: []}

/**
 * ACTION CREATORS
 */
const gotGroceryList = ingredients => ({type: GOT_GROCERY_LIST, ingredients})
const checkedout = () => ({type: GOT_GROCERY_LIST})

/**
 * THUNK CREATORS
 */
export const getGroceryList = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/groceryList/')
    dispatch(gotGroceryList(data))
  } catch (err) {
    console.error(err)
  }
}

export const addNewRecipeToGroceryList = id => async dispatch => {
  try {
    await axios.post(`/api/groceryList/${id}`)
    const {data} = await axios.get('/api/groceryList/')
    dispatch(gotGroceryList(data))
  } catch (err) {
    console.error(err)
  }
}

export const removeIngredient = id => async dispatch => {
  try {
    const {data} = await axios.put(`/api/groceryList/delete/${id}`)
    dispatch(gotGroceryList(data))
  } catch (err) {
    console.error(err)
  }
}

export const checkout = () => async dispatch => {
  try {
    await axios.put(`/api/groceryList/emailList`)
    dispatch(checkedout())
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_GROCERY_LIST:
      return {...state, ingredients: action.ingredients}
    case CHECKOUT:
      return {...state, ingredients: []}
    default:
      return state
  }
}
