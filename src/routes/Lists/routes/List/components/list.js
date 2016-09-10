/* @flow */
import React from 'react'
import classes from './List.scss'

import type { ListObject } from '../interfaces/list'

type Props = {
  list: ?ListObject,
}



export const List = (props: Props) => (
  <div className={classes.activeList}>
    <div>
      <h2>
        { props.list.name }
      </h2>
    </div>
    <table className="table">
      <thead className="thead-inverse">
        <tr>
          <th>Word</th>
          <th>Translation</th>
        </tr>
      </thead>
      <tbody>
        { props.list.words ? props.list.words.map((word, index) =>
          <tr key={ index }>
            <td>{ word.word_string }</td>
            <td>
              <ul>
                { word.translations.map((translation, index) =>
                  <li>translation</li>
                )}
              </ul>
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  </div>
)

export default List
