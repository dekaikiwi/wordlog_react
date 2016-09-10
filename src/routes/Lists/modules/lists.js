/* @flow */

import type { ListsObject, ListsStateObject } from '../interfaces/lists.js'

// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_LISTS = 'REQUEST_LISTS'
export const RECIEVE_LISTS = 'RECIEVE_LISTS'

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

export const fetchLists = (): Function => {
  return (dispatch: Function): Promise => {
    dispatch(requestLists())

    return fetch('http://localhost:4000/api/lists')
      .then(response => response.json())
      .then(json => dispatch(recieveLists(json)))
  }
}

export const actions = {
  requestLists,
  recieveLists,
  fetchLists,
}

const LISTS_ACTION_HANDLERS = {
  [REQUEST_LISTS]: (state: ListsStateObject): ListsStateObject => {
    return ({ ...state, fetching: true })
  },
  [RECIEVE_LISTS]: (state: ListsStateObject, action: {payload: ListsObject}): ListsStateObject => {
    return ({ ...state, lists: action.payload, fetching: false })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------


const initialState: ListsStateObject = { fetching: false, lists: [] }
export default function listsReducer (state: ListsStateObject = initialState, action: Action): ListsStateObject {
  const handler = LISTS_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
