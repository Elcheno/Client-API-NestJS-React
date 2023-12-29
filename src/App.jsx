/* eslint-disable react/prop-types */
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import authService from './Services/authService'
import { useEffect, useState } from 'react'
import './App.css'


const Home = () => {
  return (
    <div className="hero h-full" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Home</h1>
          <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  )
}

const About = () => {
  return (
    <div className="hero" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">About</h1>
          <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  )
}

const SignIn = ({ setSessionData }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let navigate = useNavigate();

  const login = (event) => {
    event.preventDefault()
    authService.login(email, password)
      .then(user => {
        setSessionData(user)
        navigate('/')
      })
      .catch((err) => console.error(err))
  }

  // const logout = () => {
  //   authService.logout()
  //     .then(() => setSessionData(null))
  // }

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={login} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

const Header = ({ sessionData, setSessionData }) => {

  const logout = () => {
    authService.logout()
      .then(() => setSessionData(null))
  }

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl no-animation">Client App React</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        {
          sessionData
            ? (
              <div className='flex items-center gap-4'>
                <h2> {sessionData.email}</h2>
                <button onClick={logout} className="btn no-animation btn-error">Sign Out</button>
              </div>
            )
            : <Link to="/login" className="btn no-animation btn-primary">Sign In</Link>
        }
      </div>
    </div>
  )
}

function App() {
  const [sessionData, setSessionData] = useState(null)

  useEffect(() => {
    authService.checkSession()
      .then(user => setSessionData(user))
      .catch((err) => console.error(err))
  }, [])

  return (
    <main className='wrapper'>
      <Header sessionData={sessionData} setSessionData={setSessionData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<SignIn setSessionData={setSessionData} />} />
      </Routes>
    </main>
  )
}

export default App
