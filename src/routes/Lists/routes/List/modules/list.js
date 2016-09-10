/* @flow */

import type { ListsObject, ListsStateObject } from '../interfaces/list.js'

// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_LIST = 'REQUEST_LIST'
export const RECIEVE_LIST = 'RECIEVE_LIST'

// ------------------------------------
// Actions
// ------------------------------------

export function requestList (): Action {
  return {
    type: REQUEST_LIST
  }
}

export function recieveList (value: ListObject): Action {
  console.log(value)
  return {
    type: RECIEVE_LIST,
    payload: value
  }
}

export const fetchList = (listId): Function => {
  return (dispatch: Function): Promise => {
    dispatch(requestList())

    return fetch(`http://localhost:4000/api/lists/${listId}`)
      .then(response => response.json())
      .then(json => dispatch(recieveList(json)))
  }
}


export const actions = {
  requestList,
  recieveList,
  fetchList,
}

const LIST_ACTION_HANDLERS = {
  [REQUEST_LIST]: (state: ListStateObject): ListStateObject => {
    return ({ ...state, fetching: true })
  },
  [RECIEVE_LIST]: (state: ListStateObject, action: {payload: ListObject}): ListStateObject => {
    return ({ ...state, list: action.payload, fetching: false })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: ListStateObject = { fetching: false, list: {} }
export default function listReducer (state: ListStateObject = initialState, action: Action): ListStateObject {
  const handler = LIST_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
