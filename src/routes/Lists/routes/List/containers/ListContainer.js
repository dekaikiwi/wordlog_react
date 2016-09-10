/* @flow */
import { connect } from 'react-redux'
import { fetchList } from '../modules/list'

import List from '../components/List'

import type { ListObject } from '../interfaces/list'

const mapActionCreators: {fetchList: Function} = {
  fetchList,
}

const mapStateToProps = (state): { list: ?ListObject } => ({
  list: state.list.list
})

export default connect(mapStateToProps, mapActionCreators)(List)
