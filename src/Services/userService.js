import axios from "axios"
import authService from "./authService"

const getUsers = (page = 0) => {
    return new Promise((resolve, reject) => {
        const user = authService.getUser()
        const token = user ? user.token : null
        if (!token) return resolve(null)
        axios.get(`http://localhost:8200/user/page/${page}`, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            if (!res || !res.data) return resolve(null)
            resolve(res.data)
        })
        .catch(err => reject(err))
    })
}

const updateUserState = (user) => {
    return new Promise((resolve, reject) => {
        const myUser = authService.getUser()
        const token = myUser ? myUser.token : null
        if (!token) return resolve(null)
        console.log(user)
        axios.put(`http://localhost:8200/user/state`, user, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            if (!res || !res.data) return resolve(null)
            resolve(res.data)
        })
        .catch(err => reject(err))
    })
}

export default {
    getUsers,
    updateUserState,
}