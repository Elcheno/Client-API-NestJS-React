import axios from "axios"

let user = null

const setUser = (newUser) => {
    user = newUser
}

const getUser = () => {
    return user
}

const login = (email, password) => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:8200/auth/login', { email, password })
        .then(res => {
            if (!res || !res.data) resolve(null);
            setUser(res.data)
            window.localStorage.setItem('sessionData', JSON.stringify(res.data))
            resolve(res.data)
        })
        .catch(err => reject(err))
    });
}

const logout = () => {
    return new Promise ((resolve, reject) => {
        try {
            setUser(null)
            window.localStorage.removeItem('sessionData')
            resolve()
        } catch (err) {
            reject(err)
        }
    })
}

const checkSession = () => {
    return new Promise((resolve, reject) => {
        try {
            const sessionData = window.localStorage.getItem('sessionData')
            if (!sessionData) resolve(null);

            const token = JSON.parse(sessionData).token

            axios.post('http://localhost:8200/auth', { token })
            .then(res => {
                if (!res || !res.data) resolve(null);
                setUser(res.data)
                resolve(res.data)
            })
            .catch(err => reject(err));


        } catch (err) {
            reject(err)

        }
    })
}

export default { 
    setUser,
    getUser, 
    login, 
    logout, 
    checkSession,
}