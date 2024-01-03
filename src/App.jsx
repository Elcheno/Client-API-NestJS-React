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
    uiService.showLoading()
    authService.checkSession()
      .then(user => {
        if (user) {
          setSessionData(user)
          console.log(user)
          Promise.all([
            loadNotes(),
            loadUsers()
          ])
          .then(() => uiService.dismissLoading())
          .catch((err) => {
            console.error(err)
            uiService.dismissLoading()
          })
        } else {
          uiService.dismissLoading()
        }
      })
      .catch((err) => {
        console.error(err)
        uiService.dismissLoading()
      })
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
              if (res) {
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
      if (sessionData?.rol !== 'admin') resolve()
      userService.getUsers(usersPage)
      .then((res) => {
        console.log(res)
        if (res) {
          setUsers(users.concat(res))
          setUsersPage(usersPage + 1)
        }
        resolve()
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  }

  return (
    <main className='wrapper'>
      <Header sessionData={sessionData} setSessionData={setSessionData} setNotes={setNotes} setPage={setNotesPage} />
      <Routes>
        <Route path="/" element={<Home notes={notes} loadNotes={loadNotes} setNotes={setNotes} /> } />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<SignIn setSessionData={setSessionData} loadNotes={loadNotes} />} />
        <Route path='/register' element={<SignOn setSessionData={setSessionData} />} />
        <Route path='/profile' element={<Profile sessionData={sessionData}/> } />
        <Route path='/users' element={<Users users={users} setUsers={setUsers} loadItems={loadUsers} sessionData={sessionData} />} />
      </Routes>
      <Toaster closeButton expand={false} position="bottom-right" />
    </main>
  )
}

export default App
