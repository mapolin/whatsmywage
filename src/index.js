import injectTapEventPlugin from 'react-tap-event-plugin'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router'
import thunk from 'redux-thunk';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import reducers from './reducers'

// Import wrappers and MUI theme
import Background from './components/Background'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { amber, orange, blue } from 'material-ui/colors'
import './static/global.scss'

// setup theme
const theme = createMuiTheme({
  palette: {
    primary: amber,
    default: orange,
    secondary: amber
  }
})

// Import containers
import Login from './containers/Login'
import Map from './containers/Map'
import Error from './containers/Error'

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
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(middleware, thunk)
)

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Background>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/map" component={Map}/>
            <Route component={Error}/>
          </Switch>
        </ConnectedRouter>
      </Background>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
