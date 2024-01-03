import axios from "axios"
import authService from "./authService"

const getUsers = ({ page = 0 }) => {
    return new Promise((resolve, reject) => {
        const user = authService.getUser()
        const token = user ? user.token : null
        if (!token) return resolve(null)
        axios.get(`http://localhost:8200/user/page/${page}`, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            if (!res || !res.data) resolve(null)
            resolve(res.data)
        })
        .catch(err => reject(err))
    })
}

export default {
    getUsers,
}