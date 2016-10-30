/* @flow */
import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest';
import classes from './List.scss'

import type { ListObject } from '../interfaces/list'

type Props = {
  list: ?ListObject,
  translationSuggestions: Array,
  suggestValue: String
}

class List extends Component {

  getSuggestionValue(suggestion) {
    return suggestion
  }

  renderSuggestion(suggestion) {
    console.log('suggestionRender')
    console.log(suggestion)
    return (
      <div class='suggestion'>
        <span>{ suggestion.japanese[0].word }({ suggestion.japanese[0].reading })</span>
        <span>
          <ul>{ suggestion.senses[0].english_definitions.map((value) => {
            return <li> { value } </li>
          })}
        </ul> </span>
      </div>
    )
  }

  suggestionSelected() {
    console.log('suggestionSelected')
  }

  render() {
    let value = this.props.suggestValue
    console.log('value')
    const inputProps = { value, onChange: (event, { newValue }) => this.props.updateSuggestionValue(newValue) }
    console.log(this.props)
    return (
      <div className={classes.activeList}>
        <div>
          <h2>
            { this.props.list.name }
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
            { this.props.list.words ? this.props.list.words.map((word, index) =>
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
        <label>Word: </label>
        <Autosuggest
          suggestions = {this.props.translationSuggestions}
          onSuggestionsFetchRequested = {this.props.fetchTranslations}
          onSuggestionsClearRequested = {this.props.clearTranslationList}
          getSuggestionValue = {this.getSuggestionValue}
          renderSuggestion = {this.renderSuggestion}
          onSuggestionSelected = {this.suggestionSelected}
          inputProps = {inputProps} ></Autosuggest>
      </div>
    )
  }
}

export default List
