/* @flow */

import type { ListsObject, ListsStateObject } from '../interfaces/lists.js'

// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_LISTS = 'REQUEST_LISTS'
export const RECIEVE_LISTS = 'RECIEVE_LISTS'
export const SUBMIT_NEW_LIST = 'SUBMIT_NEW_LIST'
export const SUBMITTED_NEW_LIST = 'SUBMITTED_NEW_LIST'

// ------------------------------------
// Actions
// ------------------------------------

export function requestLists (): Action {
  return {
    type: REQUEST_LISTS
  }
}

export function recieveLists (value: Array): Action {
  console.log(value)
  return {
    type: RECIEVE_LISTS,
    payload: value
  }
}

export function submitNewList (): Action {
  return {
    type: SUBMIT_NEW_LIST
  }
}

export function submittedNewList(list: Object): Action {
  return {
    type: SUBMITTED_NEW_LIST,
    payload: list
  }
}

export const fetchLists = (): Function => {
  return (dispatch: Function): Promise => {
    dispatch(requestLists())

    return fetch('http://localhost:4000/api/lists')
      .then(response => response.json())
      .then(json => dispatch(recieveLists(json)))
  }
}

export const submitList = (title: String, description: String, type: String): Function => {
  return (dispatch: Function): Promise => {
    dispatch(submitNewList())

    return fetch('http://localhost:4000/api/lists', {
      method: 'POST',
      body: JSON.stringify({ list: {name: title, description: description, type: type }}),
      headers: {'Content-Type' : 'application/json'}
    })
      .then(response => response.json)
      .then(json => dispatch(submittedNewList(json)))
  }
}

export function updateNewListFields (updatedFields: Object ): Action {
  return {
    type: UPDATE_NEW_LIST_FIELDS,
    payload: updatedFields
  }
}

export const actions = {
  requestLists,
  recieveLists,
  submitNewList,
  submittedNewList,
  fetchLists,
  updateNewListFields,
  submitList,
}

const LISTS_ACTION_HANDLERS = {
  [REQUEST_LISTS]: (state: ListsStateObject): ListsStateObject => {
    return ({ ...state, fetching: true })
  },
  [RECIEVE_LISTS]: (state: ListsStateObject, action: {payload: ListsObject}): ListsStateObject => {
    return ({ ...state, lists: action.payload, fetching: false })
  },
  [SUBMIT_NEW_LIST]: (state: ListsStateObject): ListsStateObject => {
    return ({ ...state, fetching: true })
  },
  [SUBMITTED_NEW_LIST]: (state: ListsStateObject, action: {payload: ListsObject}): ListsStateObject => {
    return ({ ...state, fetching: false, lists: state.lists.push(action.payload)})
  }
}

// ------------------------------------
// Reducer
// ------------------------------------


const initialState: ListsStateObject = { fetching: false, lists: [], newList: {title: '', description: '', type: ''} }
export default function listsReducer (state: ListsStateObject = initialState, action: Action): ListsStateObject {
  const handler = LISTS_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
