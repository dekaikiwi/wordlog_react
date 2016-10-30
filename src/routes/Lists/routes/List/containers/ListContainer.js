/* @flow */
import { connect } from 'react-redux'
import { fetchList, fetchTranslations, clearTranslationList, updateSuggestionValue } from '../modules/list'

import List from '../components/List'

import type { ListObject } from '../interfaces/list'

const mapActionCreators: {fetchList: Function, fetchTranslations: Function, clearTranslationList: Function, updateSuggestionValue: Function} = {
  fetchList,
  fetchTranslations,
  clearTranslationList,
  updateSuggestionValue
}

const mapStateToProps = (state): { list: ?ListObject, translationSuggestions: Array, suggestValue: String } => ({
  list: state.list.list,
  translationSuggestions: state.list.translationSuggestions,
  suggestValue: state.list.suggestValue
})

export default connect(mapStateToProps, mapActionCreators)(List)
