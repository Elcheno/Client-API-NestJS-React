/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import authService from '../Services/authService'
import uiService from '../Services/uiService'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import imgService from "../Services/imgService"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Header = ({ sessionData, setSessionData, setNotes, setPage }) => {
    const [img, setImg] = useState(null)
    // const [picture, setPicture] = useState('')

    const logout = () => {
        authService.logout()
            .then(() => {
                setSessionData(null)
                setNotes([])
                setPage(0)
                uiService.toast({ icon: 'success', msg: 'You have been signed out' })
            })
            .catch((err) => console.error(err))
    }

    const saveImg = async () => {
        // const FR = new FileReader()
        // FR.addEventListener("load", async (evt) => {
        //     setPicture(evt.target.result)
        //     console.log(evt.target.result)
        // })
        // FR.readAsDataURL(img)
        console.log(sessionData.picture)
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
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Input id="picture" type="file" onChange={(e) => setImg(e.target.files[0])} />
                                </div>
                                <Button onClick={saveImg} >SAVE IMG</Button>
                                <h2> {sessionData.email}</h2>
                                <button onClick={logout} className="btn no-animation btn-error">Sign Out</button>
                                <Avatar>
                                    <AvatarImage src={sessionData.picture} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
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