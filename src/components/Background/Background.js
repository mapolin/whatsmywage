import React from 'react'
import { amber, deepOrange } from 'material-ui/colors'
import styles from './background.scss'
import './particle-network.min.js'

class Background extends React.Component {
  componentDidMount () {
    const options = {
      particleColor: amber[500],
      interactive: true,
      speed: 'medium',
      density: 'high'
    }
    const particleCanvas = new ParticleNetwork(this.el, options)
  }
  render () {
    return (
      <div className={styles.background} ref={el => this.el = el} >
        {this.props.children}
        <div className={styles.effects} />
      </div>
    )
  }
}

export default Background
