import React from 'react'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import TextField from 'material-ui/TextField'
import { MenuItem } from 'material-ui/Menu'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'

import countries from '../static/countries.json'
import styles from './login.scss'

const style = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
    zIndex: 20
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  }
});

function renderInput(inputProps) {
  const { classes, autoFocus, value, ref, ...other } = inputProps

  return (
    <TextField
      fullWidth
      autoFocus={autoFocus}
      value={value}
      inputRef={ref}
      InputProps={{
        ...other,
      }}
    />
  )
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
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

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  )
}

function getSuggestionValue(suggestion) {
  return suggestion.label
}

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return inputLength <= 2
    ? []
    : countries.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue

        if (keep) {
          count += 1
        }

        return keep
      })
}

class Login extends React.Component {
  state = {
    value: '',
    suggestions: [],
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    })
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    })
  }

  render () {
    const { classes } = this.props;

    return (
      <Paper className={styles.entryWrapper} elevation={2}>
        <div className={styles.fieldWrapper}><TextField fullWidth label="User" /></div>
        <div className={styles.fieldWrapper}>
          <Autosuggest
            theme={{
              container: classes.container,
              suggestionsContainerOpen: classes.suggestionsContainerOpen,
              suggestionsList: classes.suggestionsList,
              suggestion: classes.suggestion,
            }}
            renderInputComponent={renderInput}
            suggestions={this.state.suggestions}
            onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
            renderSuggestionsContainer={renderSuggestionsContainer}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
              autoFocus: true,
              placeholder: 'Choose your country',
              value: this.state.value,
              onChange: this.handleChange,
            }}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button raised className={styles.button} color="primary">Submit</Button>
          <Button raised className={styles.button} color="default">Skip</Button>
        </div>
      </Paper>
    )
  }
}

export default withStyles(style)(Login)
