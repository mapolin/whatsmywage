import React from 'react'
import styles from './background.scss'

class Background extends React.Component {
  render () {
    return <div className={styles.background}>{this.props.children}</div>
  }
}

export default Background
