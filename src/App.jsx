import { Routes, Route } from 'react-router-dom'
import authService from './Services/authService'
// import uiService from './Services/uiService'
import { useEffect, useState } from 'react'
import './App.css'
import Home from './Components/Home'
import About from './Components/About'
import Header from './Components/Header'
import SignIn from './Components/SignIn'
import SignOn from './Components/SignOn'

function App() {
  const [sessionData, setSessionData] = useState(null)

  useEffect(() => {
    authService.checkSession()
      .then(user => {
        if (user) {
          setSessionData(user)
        }
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <main className='wrapper'>
      <Header sessionData={sessionData} setSessionData={setSessionData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<SignIn setSessionData={setSessionData} />} />
        <Route path='/register' element={<SignOn setSessionData={setSessionData} />} />
      </Routes>
    </main>
  )
}

export default App
