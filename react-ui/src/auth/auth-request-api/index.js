import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:5000/auth',
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