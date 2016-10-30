/* @flow */

export type ListObject = {
  id: number,
  name: string,
  description: string,
  type: string,
  words: Array<WordObject>
}

export type ListStateObject = {
  fetching: boolean,
  list: ListObject,
  translationSuggestions: Array,
  suggestValue: String
}
