import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Paper from 'material-ui/Paper'
import Autocomplete from '../components/Autocomplete'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { capitalize } from 'lodash'

import { find } from 'lodash'
import * as actions from '../actions'
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

class Login extends React.Component {
  state = {
    country: '',
    wage: '',
    city: '',
    error: {}
  }

  constructor () {
    super()

    this.setCountry = this.setCountry.bind(this)
    this.setCity = this.setCity.bind(this)
    this.setWage = this.setWage.bind(this)
    this.submitEntry = this.submitEntry.bind(this)
    this.goToMap = this.goToMap.bind(this)
  }

  setCountry ({ label, value }) {
    this.setState({
      country: value
    })
  }

  setCity (event) {
    let val = capitalize(event.target.value)
    this.setState({
      city: val
    })
  }

  setWage (event) {
    this.setState({
      wage: event.target.value
    })
  }

  submitEntry () {
    const { actions } = this.props
    const { error } = this.state

    error.city = this.state.city.length <= 1 ? true : false
    error.wage = this.state.wage.length <= 1 ? true : false
    error.country = !find(countries, { value: this.state.country }) ? true : false

    this.setState({
      error: error
    })

    if (!error.city && !error.wage && !error.country) {
      actions.submitData(this.state)
    }
  }

  goToMap () {
    const { history } = this.props

    history.push('/map')
  }

  render () {
    const { classes } = this.props;

    return (
      <Paper className={styles.entryWrapper} elevation={2}>
        <div className={styles.fieldWrapper}>
          <Autocomplete
            minChars={2}
            classes={classes}
            data={countries}
            label="Choose your country"
            onChange={this.setCountry}
            error={this.state.error.country} />
        </div>
        <div className={styles.fieldWrapper}>
          <TextField fullWidth value={this.state.city} error={this.state.error.city} required onChange={this.setCity} label="City" />
        </div>
        <div className={styles.fieldWrapper}>
          <TextField fullWidth value={this.state.wage} error={this.state.error.wage} required onChange={this.setWage} label="Wage" />
        </div>
        <div className={styles.buttonWrapper}>
          <Button raised className={styles.button} onClick={this.submitEntry} color="primary">Submit</Button>
          <Button raised className={styles.button} onClick={this.goToMap} color="default">Skip</Button>
        </div>
      </Paper>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Login))

