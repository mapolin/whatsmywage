import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import styles from './error.scss'

class Error extends React.Component {
  constructor () {
    super()

    this.goToMap = this.goToMap.bind(this)
  }

  goToMap () {
    const { history } = this.props

    history.push('/map')
  }

  render () {
    const { classes } = this.props;

    return (
      <Paper className={styles.errorWrapper}>
        <h2>Ugh... isn't that embarrassing</h2>

        <div><Button raised color="accent" onClick={this.goToMap}>It's fine!</Button></div>
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
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Error)

