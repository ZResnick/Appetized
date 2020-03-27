import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ALL_FOLDERS = 'GOT_ALL_FOLDERS'
const GOT_SINGLE_FOLDER = 'GOT_SINGLE_FOLDER'
const UPDATED_FOLDER_NAME = 'UPDATED_FOLDER_NAME'
const DELETED_FOLDER = 'DELETED_FOLDER'

/**
 * INITIAL STATE
 */
const initialState = {folders: [], singleFolder: {}}

/**
 * ACTION CREATORS
 */
const gotAllFolders = folders => ({type: GOT_ALL_FOLDERS, folders})
const gotSingleFolder = folder => ({type: GOT_SINGLE_FOLDER, folder})
const deletedFolder = deletedFolderId => ({
  type: DELETED_FOLDER,
  deletedFolderId
})
const updatedFolderName = updatedFolder => ({
  type: UPDATED_FOLDER_NAME,
  updatedFolder
})

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

export const deleteFolder = id => async dispatch => {
  try {
    await axios.put(`/api/folders/deleteFolder/${id}`)
    dispatch(deletedFolder(id))
    history.push('/')
    history.push(`/recipeBox`)
  } catch (err) {
    console.error(err)
  }
}

export const updateFolder = (id, title) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/folders/changeName/${id}`, {title})
    dispatch(updatedFolderName(data))
    history.push('/')
    history.push(`/recipeBox/folder/${id}/page/1`)
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
    const {data} = await axios.get('/api/folders/')
    dispatch(gotAllFolders(data))
  } catch (err) {
    console.error(err)
  }
}

export const deletesRecipeFromFolder = (
  folderId,
  recipeId
) => async dispatch => {
  try {
    await axios.post(`/api/folders/delete/${folderId}/recipe/${recipeId}`)
    const {data} = await axios.get('/api/folders/')
    dispatch(gotAllFolders(data))
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
    case DELETED_FOLDER:
      return {
        ...state,
        folders: state.folders.filter(
          folder => folder.id !== action.deletedFolderId
        )
      }
    case UPDATED_FOLDER_NAME:
      return {
        ...state,
        singleFolder: action.updatedFolder
      }
    default:
      return state
  }
}
