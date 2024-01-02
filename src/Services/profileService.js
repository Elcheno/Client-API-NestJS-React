import axios from 'axios'
import authService from './authService'



const updateProfile = (data) => {
    return new Promise((resolve, reject) => {
        const user = authService.getUser()
        const token = user ? user.token : null
        if (!token) return resolve(null)
        axios.put(`http://localhost:8200/user`, data, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            if (!res || !res.data) resolve(null);
            resolve(res.data)
        })
        .catch(err => reject(err))
    })
}

export default { updateProfile }