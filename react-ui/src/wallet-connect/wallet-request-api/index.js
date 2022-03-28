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

export const getInventory = () => {
    return api.post(`/getInventory/`, {

    })
}

export const createNft = (nftFile, nftName, nftDesc) => {
    return api.post(`/createNft`, {
        nftFile: nftFile,
        nftName: nftName,
        nftDesc: nftDesc
    })
}

const apis = {
    addWallet,
    getInventory
}

export default apis