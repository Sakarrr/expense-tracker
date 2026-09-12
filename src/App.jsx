import { useState } from 'react'
import { isLoggedIn } from './storage.js'
import Login from './Login.jsx'
import Dashboard from './Dashboard.jsx'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())

  if (loggedIn) {
    return <Dashboard onLogout={() => setLoggedIn(false)} />
  }

  return <Login onLoginSuccess={() => setLoggedIn(true)} />
}
