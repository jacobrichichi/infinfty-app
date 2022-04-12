import axios from 'axios'
axios.defaults.withCredentials = true;

//const baseURL = 'https://infinftapp.herokuapp.com/nft'
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

export const walletConnect = (QRCodeModal) => {
    return api.post(`/walletConnect/`, {
        QRCodeModal: QRCodeModal
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

export const listNFTSale = (id, price, duration) => {
    return api.post(`listNFTSale`, {
        id, price, duration
    })
}

export const testPython = () => {
    return api.get(`testPython`)
}

export const testAuction = () => {
    return api.post(`testAuction`, { })
}

const apis = {
    addWallet,
    getInventory,
    createNft,
    listNFTSale,
    testPython,
    testAuction,
    walletConnect
}

export default apis