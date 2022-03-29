const algosdk = require("algosdk")
const User = require('../models/user-model');
const NFTStorage = require('nft.storage').NFTStorage
const File = require('nft.storage').File

const mime = require('mime')
const fs = require('fs')
const path = require('path')


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
        
        const assetsFromRes = accountInfo.assets;

        var assets = assetsFromRes.map((asset) => ({
            id: Number(asset['asset-id']),
            amount: Number(asset.amount),
            creator: asset['creator'],
            frozen: asset['is-frozen'],
            decimals: 0
        }))

        console.log('mid')
        console.log(assets)

        await Promise.all(
            assets.map(async asset => {
                const { params } = await client.getAssetByID(asset.id).do()
                asset.name = params.name
                asset.unitName = params["unit-name"];
                asset.url = params.url.replace("ipfs://", "https://ipfs.io/ipfs/");;
                asset.decimals = params.decimals;
            })
        )

        console.log('final')
        console.log(assets)

        return res.status(200).json({
            success: true,
            assets: assets
        })

    })
}

const createNft = async (req, res) => {
    const { media, title, desc } = req.body;
    const nftStorage_key = require('../config/keys').nftstorage_key

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