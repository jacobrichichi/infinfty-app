import axios from 'axios'
axios.defaults.withCredentials = true;

//const baseURL = 'https://infinftapp.herokuapp.com/auth'
const baseURL = 'http://localhost:5000/auth'

/*if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:5000/auth'
}*/

const api = axios.create({
    baseURL: baseURL
})

export const loginUser = (email, password) => {
    return api.post(`/login/`, {
        email : email,
        password : password
    })
}

export const registerUser = (firstName, lastName, userName, email, password, passwordVerify) => {
    return api.post(`/register/`, {
        firstName : firstName,
        lastName : lastName,
        userName: userName,
        email : email,
        password : password,
        passwordVerify : passwordVerify
    })
}


const apis = {
    registerUser,
    loginUser
}

export default apis