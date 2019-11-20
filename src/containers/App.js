import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { configureStore } from '../store'
import Navbar from './Navbar'
import Main from './Main'
import { setAuthorizationToken, setCurrentUser, logout } from '../store/actions/auth'
import jwtDecode from 'jwt-decode'

const store = configureStore()

// Rehydration
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken)
  // prevent someone from manually tampering with the key of jwtToken in localStorage
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
  } catch (err) {
    // store.dispatch(setCurrentUser({}))
    store.dispatch(logout())
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='onboarding'>
          <Navbar />
          <Main />
        </div>
      </Router>
    </Provider>
  )
}

export default App;
