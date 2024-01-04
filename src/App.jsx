import { Routes, Route } from 'react-router-dom'
import authService from './Services/authService'
import uiService from './Services/uiService'
import noteService from './Services/noteService'
import userService from './Services/userService'
import { useEffect, useState } from 'react'
import Home from './Pages/Home'
import About from './Pages/About'
import SignIn from './Pages/SignIn'
import SignOn from './Pages/SignOn'
import Profile from './Pages/Profile'
import Users from './Pages/Users'
import Header from './Components/Header'
import { Toaster } from 'sonner'
import './App.css'

function App() {
  const [sessionData, setSessionData] = useState(null)
  const [notesPage, setNotesPage] = useState(0)
  const [notes, setNotes] = useState([])
  const [usersPage, setUsersPage] = useState(0)
  const [users, setUsers] = useState([])

  useEffect(() => {
    authService.checkSession()
      .then(user => {
        if (user) {
          uiService.showLoading()
          setSessionData(user)

          Promise.allSettled([
            loadNotes(),
            user.rol === 'admin' ? loadUsers() : null
          ])
          .catch((err) => console.error(err))
          .finally(() => uiService.dismissLoading())

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
            setNotesPage(0)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })

      } else {
        setTimeout(() => {
          noteService.getNotes(notesPage)
            .then((res) => {
              if (res && res.length > 0) {
                filter === '' ? setNotes(res) : setNotes(notes.concat(res))
                setNotesPage(notesPage + 1)
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

  const loadUsers = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        userService.getUsers(usersPage)
          .then((res) => {
            if (res && res.length > 0) {
              setUsers(users.concat(res))
              setUsersPage(usersPage + 1)
            }
            resolve()
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      }, 2000)
    })
  }

  return (
    <main className='wrapper'>
      <Header sessionData={sessionData} setSessionData={setSessionData} setNotes={setNotes} setPage={setNotesPage} />
      <Routes>
        <Route path="/" element={<Home notes={notes} loadNotes={loadNotes} setNotes={setNotes} />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<SignIn setSessionData={setSessionData} loadNotes={loadNotes} />} />
        <Route path='/register' element={<SignOn setSessionData={setSessionData} />} />
        <Route path='/profile' element={<Profile sessionData={sessionData} />} />
        <Route path='/users' element={<Users users={users} setUsers={setUsers} loadItems={loadUsers} sessionData={sessionData} /> } />
      </Routes>
      <Toaster closeButton expand={false} position="bottom-right" />
    </main>
  )
}

export default App
