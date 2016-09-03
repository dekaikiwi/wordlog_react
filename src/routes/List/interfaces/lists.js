/* @flow */

export type ListsObject = {
  id: number,
  words: Array<WordObject>
}

export type ListsStateObject = {
  fetching: boolean,
  lists: Array<ListsObject>
}
