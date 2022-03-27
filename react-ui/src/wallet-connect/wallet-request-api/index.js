import axios from 'axios'
axios.defaults.withCredentials = true;

//const baseURL = 'https://infinftapp.herokuapp.com/auth'
const baseURL = 'http://localhost:5000/nft'

/*if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:5000/auth'
}*/

const api = axios.create({
    baseURL: baseURL
})

export const addWallet = (wallet) => {
    return api.post(`/addWallet`, {
        wallet: wallet
    })
}

export const getAssets = (account, chain) => {
    return api.post(`/getAssets/`, {
        account: account,
        chain: chain
    })
}

const apis = {
    addWallet,
    getAssets
}

export default apis