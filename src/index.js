import injectTapEventPlugin from 'react-tap-event-plugin'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import reducers from './reducers'

// Import wrappers and MUI theme
import Background from './components/Background'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { amber, orange, deepOrange } from 'material-ui/colors'

// setup theme
const theme = createMuiTheme({
  palette: {
    primary: amber,
    default: orange,
    accent: deepOrange
  }
})

// Import containers
import Login from './containers/Login'
import Map from './containers/Map'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Background>
        <ConnectedRouter history={history}>
          <div>
            <Route exact path="/" component={Login}/>
            <Route exact path="/map" component={Map}/>
          </div>
        </ConnectedRouter>
      </Background>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)