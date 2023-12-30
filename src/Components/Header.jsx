/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import authService from '../Services/authService'
import uiService from '../Services/uiService'

const Header = ({ sessionData, setSessionData }) => {

    const logout = () => {
        authService.logout()
            .then(() => {
                setSessionData(null)
                uiService.toast({ icon: 'success', msg: 'You have been signed out' })
            })
            .catch((err) => console.error(err))
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
                        : (
                            <div className='flex items-center gap-2'>
                                <Link to="/login" className="btn no-animation btn-primary">Sign In</Link>
                                <Link to="/register" className="btn no-animation btn-accent">Sign On</Link>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default Header