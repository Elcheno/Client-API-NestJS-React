import axios from "axios";
import authService from "./authService";

const getNotes = (page = 0) => {
    return new Promise((resolve, reject) => {
        const user = authService.getUser()
        const token = user ? user.token : null
        if (!token) return resolve(null)
        axios.get(`http://localhost:8200/note/page/${page}`, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            if (!res || !res.data) resolve(null);
            let result = []
            res.data.map((note) => {
                const aux = {...note, time: note.date}
                result.push(aux)
            })
            resolve(result)
        })
        .catch(err => reject(err))
    })
}

const saveNote = (note) => {
    return new Promise((resolve, reject) => {
        const user = authService.getUser()
        const token = user ? user.token : null
        if (!token) return resolve(null)
        axios.post(`http://localhost:8200/note`, note, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            if (!res || !res.data) resolve(null);
            let result = {...res.data, time: res.data.date}
            resolve(result)
        })
        .catch(err => reject(err))
    })
}

export default {
    getNotes,
    saveNote,
}