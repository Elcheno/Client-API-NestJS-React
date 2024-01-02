/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import authService from '../Services/authService'
import uiService from '../Services/uiService'
import DropdownProfile from "./DropdownProfile"

const Header = ({ sessionData, setSessionData, setNotes, setPage }) => {

    const logout = () => {
        authService.logout()
            .then(() => {
                setSessionData(null)
                setNotes([])
                setPage(0)
                uiService.toast({ type: 'success', msg: 'You have been signed out' })
            })
            .catch((err) => {
                console.error(err)
                uiService.toast({ type: 'error', msg: `Failed to sign out!` })
            })
    }

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl no-animation">Client App React</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/">Home</Link></li>
                </ul>
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/about">About</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                {
                    sessionData
                        ? (
                            <div className='flex items-center gap-4'>
                                <DropdownProfile user={sessionData} logOut={logout} />
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