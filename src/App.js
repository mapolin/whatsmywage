import React from 'react'
import Login from './containers/Login'

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Background>
      <Login />
      <Map />
    </Background>
  </MuiThemeProvider>
)

export default App
