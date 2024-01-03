/* eslint-disable react/prop-types */
import CardSettings from "../Components/Profile/CardSettings"
import { useEffect, useState } from "react"
import {
    Card,
    CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import profileService from "../Services/profileService"
import uiService from "../Services/uiService"

const Profile = ({ sessionData }) => {
    useEffect(() => {
        setPicture({
            actualValue: sessionData?.picture ? sessionData?.picture : '',
            defaultValue: sessionData?.picture ? sessionData?.picture : ''
        })

        setUsername({
            actualValue: sessionData?.username ? sessionData?.username : '',
            defaultValue: sessionData?.username ? sessionData?.username : ''
        })

        setEmail({
            actualValue: sessionData?.email ? sessionData?.email : '',
            defaultValue: sessionData?.email ? sessionData?.email : ''
        })

        setName({
            actualValue: sessionData?.name ? sessionData?.name : '',
            defaultValue: sessionData?.name ? sessionData?.name : ''
        })
    }, [sessionData?.picture, sessionData?.email, sessionData?.username, sessionData])

    const [picture, setPicture] = useState({
        actualValue: '',
        defaultValue: ''
    })

    const [username, setUsername] = useState({
        actualValue: '',
        defaultValue: ''
    })

    const [email, setEmail] = useState({
        actualValue: '',
        defaultValue: ''
    })

    const [name, setName] = useState({
        actualValue: '',
        defaultValue: ''
    })

    const saveProfile = () => {
        const newProfile = {
            username: username.actualValue,
            name: name.actualValue,
            email: email.actualValue,
            picture: picture.actualValue
        }
        profileService.updateProfile(newProfile)
        .then(res => {
            const token = JSON.parse(window.localStorage.getItem('sessionData')).token
            window.localStorage.setItem('sessionData', JSON.stringify({
                ...res,
                token: token
            }))
            uiService.toast({ type: 'success', msg: 'Profile updated successfully' })
        })
        .catch(err => {
            console.error(err)
            uiService.toast({ type: 'error', msg: 'Failed to update profile' })
        })
    }

    const resetAll = () => {
        setPicture({
            actualValue: picture.defaultValue,
            defaultValue: picture.defaultValue
        })
        setUsername({
            actualValue: username.defaultValue,
            defaultValue: username.defaultValue
        })
        setEmail({
            actualValue: email.defaultValue,
            defaultValue: email.defaultValue
        })
    }

    return (
        <main className="bg-slate-100 flex flex-col items-center p-5 gap-y-5">
            <CardSettings title="Picture" label="This is your picture, you can change it, but if you not sure, click on reset button to reset it." value={ picture } setValue={ setPicture } />
            <CardSettings title="Username" inputPlaceholder="Insert your username" label="This is your username, you can change it, but if you not sure, click on reset button to reset it." value={ username } setValue={ setUsername } />
            <CardSettings title="Name" inputPlaceholder="Insert your name" label="This is your name, you can change it, but if you not sure, click on reset button to reset it." value={ name } setValue={ setName } />
            <CardSettings title="Email" inputPlaceholder="Insert your email" label="This is your email, you can change it, but if you not sure, click on reset button to reset it." value={ email } setValue={ setEmail } />

            <Card className="w-9/12 h-min">
                <CardFooter className="flex justify-between items-center gap-4 p-6">
                    <Button variant="outline" onClick={ resetAll }>Reset All</Button>
                    <Button onClick={ saveProfile }>Save All</Button>
                </CardFooter>
            </Card>
        </main>
    )
}

export default Profile