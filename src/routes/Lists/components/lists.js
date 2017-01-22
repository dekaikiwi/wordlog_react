/* @flow */
import React from 'react'
import { Link } from 'react-router'
import classes from './Lists.scss'

import type { ListsObject } from '../interfaces/lists'

type Props = {
  fetchLists: Function,
  lists: Array<ListObject>,
  updateNewListFields: Function,
}

export default class Lists extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      title: '',
      description: '',
      type: ''
    }

  }

  newListTitleChanged = (event) => {
    console.log(event.target.value)
    console.log(this.state)
    this.setState({...this.state, title: event.target.value })
  }

  newListDescChanged = (event) => {
    console.log(event.target.value)
    this.setState({...this.state, description: event.target.value })
  }

  newListTypeChanged = (event) => {
    console.log(event.target.value)
    this.setState({...this.state, type: event.target.value })
  }

  submitNewList = () => {
    console.log('Submitting List')
    console.log(this.state)
    this.props.submitList(this.state.title, this.state.description, this.state.type)
  }

  render() {
    return (
      <div>
        <div>
          <h2>
            Lists
          </h2>
        </div>
        { this.props.lists.length
          ?
            <div>
              <table className="table">
                <thead className="thead-inverse">
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.lists.map((list, index) =>
                    <tr key={ index }>
                      <td><Link to={`/lists/${list.id}`}> { list.name } </Link></td>
                      <td>{ list.type }</td>
                      <td>{ list.description }</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          : null
        }
        { this.props.children }
        <label>New List</label>
        <label for='listTitle'>Title: </label>
        <input name='listTitle' value={this.state.title} onChange={this.newListTitleChanged} type='text'/>
        <label for='listDesc'>Description: </label>
        <input name='listDesc' value={this.state.description} onChange={this.newListDescChanged} type='text'/>
        <label for='listType'>Type: </label>
        <input name='listType' value={this.state.type} onChange={this.newListTypeChanged} type='text'/>
        <button onClick={this.submitNewList} >Submit!</button>
      </div>
    )
  }
}

Lists.propTypes = {
  fetchLists: React.PropTypes.func.isRequired,
  lists: React.PropTypes.array.isRequired
}

export default Lists
