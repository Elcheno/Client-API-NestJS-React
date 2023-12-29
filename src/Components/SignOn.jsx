/* eslint-disable react/prop-types */
import { useState } from 'react'
import authService from '../Services/authService'
import { useNavigate } from 'react-router-dom'

const SignOn = ({ setSessionData }) => {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    let navigate = useNavigate()

    const register = (event) => {
        event.preventDefault()
        authService.register(name, email, password)
        .then(user => {
            setSessionData(user)
            navigate('/')
        })
        .catch((err) => console.error(err))
    }

    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={register} className="card-body">
                        <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="name" className="input input-bordered" required />
                            </div>
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
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </form>
                    </div>
                    <div className="text-center lg:text-center">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-5 m-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignOn