/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../Services/authService";
import uiService from "../Services/uiService";

const SignIn = ({ setSessionData, loadNotes }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let navigate = useNavigate();

    const login = (event) => {
        event.preventDefault()
        uiService.showLoading()
        authService.login(email, password)
            .then(user => {
                uiService.dismissLoading()
                if (user) {
                    setSessionData(user)
                    navigate('/')
                    uiService.toast({ icon: 'success', msg: `Welcome back${' ' + user?.name}!` })
                    loadNotes()
                }
            })
            .catch((err) => {
                uiService.dismissLoading()
                console.error(err)
            })
    }

    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-center">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6 m-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
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

export default SignIn