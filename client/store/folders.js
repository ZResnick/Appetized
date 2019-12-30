import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ALL_FOLDERS = 'GOT_ALL_FOLDERS'
const GOT_SINGLE_FOLDER = 'GOT_SINGLE_FOLDER'

/**
 * INITIAL STATE
 */
const initialState = {folders: [], singleFolder: {}}

/**
 * ACTION CREATORS
 */
const gotAllFolders = folders => ({type: GOT_ALL_FOLDERS, folders})
const gotSingleFolder = folder => ({type: GOT_SINGLE_FOLDER, folder})

/**
 * THUNK CREATORS
 */
export const getAllFolders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/folders/')
    dispatch(gotAllFolders(data))
  } catch (err) {
    console.error(err)
  }
}

export const getSingleFolder = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/folders/${id}`)
    dispatch(gotSingleFolder(data))
  } catch (err) {
    console.error(err)
  }
}

export const addAFolder = title => async dispatch => {
  try {
    await axios.post('/api/folders', {title})
    const {data} = await axios.get('/api/folders/')
    dispatch(gotAllFolders(data))
  } catch (err) {
    console.error(err)
  }
}

export const addsRecipeToFolder = (folderId, recipeId) => async dispatch => {
  try {
    await axios.post(`/api/folders/${folderId}/recipe/${recipeId}`)
    const {data} = await axios.get(`/api/folders/${folderId}`)
    dispatch(gotSingleFolder(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_FOLDERS:
      return {...state, folders: action.folders}
    case GOT_SINGLE_FOLDER:
      return {...state, singleFolder: action.folder}
    default:
      return state
  }
}
