import { Routes, Route } from 'react-router-dom'
import authService from './Services/authService'
import uiService from './Services/uiService'
import noteService from './Services/noteService'
import { useEffect, useState } from 'react'
import './App.css'
import Home from './Components/Home'
import About from './Components/About'
import Header from './Components/Header'
import SignIn from './Components/SignIn'
import SignOn from './Components/SignOn'

function App() {
  const [sessionData, setSessionData] = useState(null)
  const [page, setPage] = useState(0)
  const [notes, setNotes] = useState([])

  useEffect(() => {
    authService.checkSession()
      .then(user => {
        if (user) {
          uiService.showLoading()
          setSessionData(user)
          loadNotes().then(() => uiService.dismissLoading())
        }
      })
      .catch((err) => console.error(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadNotes = (filter = null) => {
    return new Promise((resolve, reject) => {
      if (filter) {
        noteService.getNotesFiltered(filter)
        .then((notes) => {
          setNotes(notes)
          setPage(0)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })

      } else {
        setTimeout(() => {
          noteService.getNotes(page)
            .then((res) => {
              if (res) {
                filter === '' ? setNotes(res) : setNotes(notes.concat(res))
                setPage(page + 1)
              }
              resolve()
            })
            .catch((err) => {
              console.log(err)
              reject(err)
            })
        }, 500)
      }

    })
  }

  return (
    <main className='wrapper'>
      <Header sessionData={sessionData} setSessionData={setSessionData} setNotes={setNotes} setPage={setPage} />
      <Routes>
        <Route path="/" element={<Home notes={notes} loadNotes={loadNotes} setNotes={setNotes} /> } />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<SignIn setSessionData={setSessionData} loadNotes={loadNotes} />} />
        <Route path='/register' element={<SignOn setSessionData={setSessionData} />} />
      </Routes>
    </main>
  )
}

export default App
