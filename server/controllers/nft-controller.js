const algosdk = require("algosdk")
const User = require('../models/user-model');

addWallet = async (req, res) => {
    const body = req.body;
    console.log(body)

    if(!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body in order to add a wallet'
        })
    }

    User.findOne({ _id: req.userId }, (err, user) => {
        if(err){
            return res.status(400).json({
                success: false,
                error: 'The subject user was not found'
            })
        }
        user.wallet = body.wallet[0]

        user.save().then(() => {
            return res.status(200).json({
                success: true,
                message: 'Wallet successfully added',
            })
        }).catch(error => {
            return res.status(400).json({
                success: false,
                message: "User could not be successfully saved"
            })
        })

    })
}

getInventory = async (req, res) => {
    User.findOne({ _id: req.userId}, async (err, user) => {
        if(err){
            return res.status(400).json({
                success: false,
                error: 'The subject user was not found'
            })
        }

        const walletId = user.wallet

        const client = new algosdk.Algodv2("", "https://algoexplorerapi.io", "");

        const accountInfo = await client.accountInformation(walletId)
                                        .setIntDecoding(algosdk.IntDecoding.BIGINT)
                                        .do();
        console.log(accountInfo)                                

    })
}

const createNft = async (req, res) => {
    user = User.findOne({ _id: req.userId}, async (err, user) => {
        if(err){
            return res.status(400).json({
                success: false,
                error: 'The subject user was not found'
            })
        }
        return user
    });
    // Minting/Tokenize
}



module.exports = {
    getInventory,
    addWallet,
    createNft
}