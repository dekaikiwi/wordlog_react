/* @flow */
import { connect } from 'react-redux'
import { fetchLists, submitList } from '../modules/lists'

import Lists from '../components/Lists'

import type { ListsObject } from '../interfaces/lists'

const mapActionCreators: {fetchLists: Function} = {
  fetchLists,
  submitList,
}

const mapStateToProps = (state): { lists: ?ListObject } => ({
  lists: state.lists.lists,
})

export default connect(mapStateToProps, mapActionCreators)(Lists)
