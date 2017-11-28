import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Highcharts from 'highcharts/highmaps'
import WorldMap from '../static/map'
import styles from './map.scss'
import { amber, grey, orange, green, red } from 'material-ui/colors'

// import actions
import * as actions from '../actions'

Highcharts.maps["custom/world-highres"] = WorldMap
Highcharts.theme = {
	colorAxis: {
    min: 400,
    max: 25000,
    minColor: amber[900],
    maxColor: green[500]
  },
	chart: {
		backgroundColor: null,
		style: {
			fontFamily: 'Roboto, serif'
		}
	},
	tooltip: {
		borderWidth: 0
	}
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);

class Map extends React.Component {
  componentWillMount () {
    const { actions } = this.props
    
    actions.getData()
  }

  componentWillReceiveProps (nextProps) {
    const { data } = nextProps
    let series = data.series.map(s => [s.key.toLowerCase(), s.value])

    this.chart.series[0].setData(series)
  }

  componentDidMount () {
    this.chart = Highcharts.mapChart(this.ref, {
      chart: {
        map: 'custom/world-highres',
        backgroundColor: null
      },
      title: {
        text: null
      },
      mapNavigation: {
        enabled: false,
        buttonOptions: {
          verticalAlign: 'bottom'
        }
      },
      colorAxis: {
        min: 0
      },
      legend: {
        enabled: false
      },
      series: [{
        data: [],
        name: 'Avarage Wage',
        states: {
          hover: {
            color: amber[500]
          }
        },
        dataLabels: {
          enabled: false,
          format: '{point.name}'
        },
        tooltip: {
          valueSuffix: ' avarage $/year'
        }
      }]
    });
  }

  render () {
    return (
      <div className={styles.map} ref={item => this.ref = item}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Map)
