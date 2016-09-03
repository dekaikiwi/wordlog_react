/* @flow */
import React from 'react'
import classes from './Lists.scss'

import type { ListsObject } from '../interfaces/lists'

type Props = {
  fetchLists: Function,
  lists: Array<ListObject>,
}

export const Lists = (props: Props) => (
  <div>
    <div>
      <h2>
        Lists
      </h2>
    </div>
    {props.lists.length
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
              {props.lists.map((list, index) =>
                <tr key={ index }>
                  <td>{ list.name }</td>
                  <td>{ list.type }</td>
                  <td>{ list.description }</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      : null
    }
  </div>
)

Lists.propTypes = {
  fetchLists: React.PropTypes.func.isRequired,
  lists: React.PropTypes.array.isRequired
}

export default Lists
