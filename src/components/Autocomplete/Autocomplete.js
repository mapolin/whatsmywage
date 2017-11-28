import React from 'react'
import Paper from 'material-ui/Paper'
import Autosuggest from 'react-autosuggest'
import TextField from 'material-ui/TextField'
import { MenuItem } from 'material-ui/Menu'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'

class Autocomplete extends React.Component {
  state = {
    suggestions: [],
    value: ''
  }

  constructor () {
    super()
  }

  renderInput(inputProps) {
    const { classes, autoFocus, value, ref, label, ...other } = inputProps
  
    return (
      <TextField
        fullWidth
        label={label}
        autoFocus={autoFocus}
        value={value}
        inputRef={ref}
        required
        InputProps={{
          ...other,
        }}
      />
    )
  }
  
  renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query)
    const parts = parse(suggestion.label, matches)
  
    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={index} style={{ fontWeight: 300 }}>
                {part.text}
              </span>
            ) : (
              <strong key={index} style={{ fontWeight: 500 }}>
                {part.text}
              </strong>
            )
          })}
        </div>
      </MenuItem>
    )
  }
  
  renderSuggestionsContainer(options) {
    const { containerProps, children } = options
  
    return (
      <Paper {...containerProps} square>
        {children}
      </Paper>
    )
  }
  
  getSuggestionValue(suggestion) {
    return suggestion.label
  }
  
  getSuggestions(value) {
    const { data, minChars } = this.props
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    let count = 0
  
    return inputLength <= (minChars || 2)
      ? []
      : data.filter(suggestion => {
          const keep =
            count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue
  
          if (keep) {
            count += 1
          }
  
          return keep
        })
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    })
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  onSuggestionSelected = (event, { suggestion }) => {
    const { onChange } = this.props

    onChange && onChange(suggestion)
  }

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    })
  }

  render () {
    const { classes, label, error } = this.props

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={this.renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={{
          error: error,
          autoFocus: true,
          label: label,
          value: this.state.value,
          onChange: this.handleChange,
        }}
      />
    )
  }
}

export default Autocomplete
