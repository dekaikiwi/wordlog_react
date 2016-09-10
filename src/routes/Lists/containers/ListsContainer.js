/* @flow */
import { connect } from 'react-redux'
import { fetchLists } from '../modules/lists'

import Lists from '../components/Lists'

import type { ListsObject } from '../interfaces/lists'

const mapActionCreators: {fetchLists: Function} = {
  fetchLists,
}

const mapStateToProps = (state): { lists: ?ListObject } => ({
  lists: state.lists.lists
})

export default connect(mapStateToProps, mapActionCreators)(Lists)
