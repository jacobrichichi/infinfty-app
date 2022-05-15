import axios from 'axios'
axios.defaults.withCredentials = true;

const baseURL = 'http://localhost:5000/auth'
//const baseURL = 'https://infinfty.herokuapp.com/auth'

/*if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:5000/auth'
}*/

const api = axios.create({
    baseURL: baseURL
})

export const getLoggedIn = () => api.get(`/loggedIn/`);

export const loginUser = (email, password) => {
    return api.post(`/login/`, {
        email : email,
        password : password
    })
}

export const loginUserById = (id) => {
    return api.get(`/loginById/${id}`)
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

export const removeWallet = () => {
    return api.get(`/removeWallet/`)
}

export const logoutUser = (id) => api.get(`/logout/${id}`)

export const refreshUser = () => api.get(`/refreshUser/`)

export const updateUser = (id, user) => api.put(`/updateUser`, user)

export const updatePassword = (id, user) => api.put(`/updatePassword`, user)

export const setUp2FA = (user) => api.post(`/synctotp`, user)

export const verifyTOTP = (user) => api.post(`/verifytotp`, user)

const apis = {
    getLoggedIn,
    loginUserById,
    registerUser,
    loginUser,
    logoutUser,
    refreshUser,
    updateUser,
    updatePassword,
    setUp2FA,
    verifyTOTP,
    removeWallet
}

export default apis