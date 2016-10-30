/* @flow */

import type { ListsObject, ListsStateObject } from '../interfaces/list.js'

// ------------------------------------
// Constants
// ------------------------------------

export const REQUEST_LIST           = 'REQUEST_LIST'
export const RECIEVE_LIST           = 'RECIEVE_LIST'
export const REQUEST_TRANSLATION    = 'REQUEST_TRANSLATION'
export const RECIEVE_TRANSLATION    = 'RECIEVE_TRANSLATION'
export const SET_SUGGESTION_VALUE   = 'SUGGESTION_VALUE'
export const CLEAR_TRANSLATION_LIST = 'CLEAR_TRANSLATION_LIST'

// ------------------------------------
// Actions
// ------------------------------------

export function requestList (): Action {
  return {
    type: REQUEST_LIST
  }
}

export function recieveList (value: ListObject): Action {
  return {
    type: RECIEVE_LIST,
    payload: value
  }
}

export function requestTranslation (): Action {
  return {
    type: REQUEST_TRANSLATION
  }
}

export function recieveTranslation (value: ListObject): Action {
  return {
    type: RECIEVE_TRANSLATION,
    payload: value.data
  }
}

export function clearTranslationList (): Action {
  return {
    type: CLEAR_TRANSLATION_LIST,
  }
}

export function setSuggestionValue (newValue): Action {
  return {
    type: SET_SUGGESTION_VALUE,
    payload: newValue
  }
}

export const updateSuggestionValue = (newValue): Function => {
  return (dispatch: Function): Promise => {
    dispatch(setSuggestionValue(newValue))
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

export function fetchTranslations (word): Action {
  return (dispatch: Function): Promise => {
    dispatch(requestTranslation())

    return fetch(`http://localhost:4000/api/search/jisho/${word.value}`)
      .then(response => response.json())
      .then(json => dispatch(recieveTranslation(json)))
  }
}

export const actions = {
  requestList,
  recieveList,
  requestTranslation,
  recieveTranslation,
  setSuggestionValue,
  updateSuggestionValue,
  fetchList,
  fetchTranslations,
  clearTranslationList
}

const LIST_ACTION_HANDLERS = {
  [REQUEST_LIST]: (state: ListStateObject): ListStateObject => {
    return ({ ...state, fetching: true })
  },
  [RECIEVE_LIST]: (state: ListStateObject, action: {payload: ListObject}): ListStateObject => {
    return ({ ...state, list: action.payload, fetching: false })
  },
  [REQUEST_TRANSLATION]: (state: ListStateObject): ListStateObject => {
    return ({ ...state, fetching: true })
  },
  [RECIEVE_TRANSLATION]: (state: ListStateObject, action: {payload: ListObject}): ListStateObject => {
    return ({ ...state, fetching: false, translationSuggestions: action.payload })
  },
  [CLEAR_TRANSLATION_LIST]: (state: ListStateObject): ListStateObject => {
    return ({ ...state, translationSuggestions: [] })
  },
  [SET_SUGGESTION_VALUE]: (state: ListStateObject, action: {payload: String}): ListStateObject => {
    return ({ ...state, suggestValue: action.payload })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState: ListStateObject = { fetching: false, list: {}, translationSuggestions: [], suggestValue: "" }
export default function listReducer (state: ListStateObject = initialState, action: Action): ListStateObject {
  const handler = LIST_ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
