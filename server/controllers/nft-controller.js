const algosdk = require("algosdk")
const User = require('../models/user-model');
const NFTStorage = require('nft.storage').NFTStorage
const File = require('nft.storage').File

const mime = require('mime')
const fs = require('fs')
const path = require('path')
const {spawn} = require('child_process');

//const { createNFTSaleListing } = require('./nft-controller-helpers/operations')


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

        console.log(walletId)

        if(user.wallet === 'a'){
            return res.status(200).json({
                success: false,
                message: 'User has not added wallet'
            })
        }

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

createNft = async (req, res) => {
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

listNFTSale = async(req, res) => {
    const { id, price, duration } = req.body

    const nftID = id

    if(!id || !price || !duration) {
        return res.status(200).json({
            success: false,
            message: "All necessary variables (id, price, duration) were not given"
        })
    }

    User.findOne({ _id: req.userId}, async (err, user) => {
        if(err){
            return res.status(400).json({
                success: false,
                message: 'The subject user was not found'
            })
        }

        const walletId = user.wallet

        if(user.wallet === 'a'){
            return res.status(200).json({
                success: false,
                message: 'User has not added wallet'
            })
        }

        const client = new algosdk.Algodv2("", "https://algoexplorerapi.io", "");
        
        const date = new Date()
        const startTime = date.getTime()/1000 + 10
        const endTime = startTime + duration * 24 * 60 * 60

        //createNFTSaleListing(client, walletId, walletId, nftID, price, startTime, endTime)

    })
}

testPython = async(req, res) => {
    var dataToSend
    const python = spawn('python', ['./server/controllers/testPython.py'])
    python.stdout.on('data', function(data){
        console.log('Pipe data from python script')
        dataToSend = data.toString()
    })

    python.stderr.on('data', function(data){
        console.log('Error')
        dataToSend = data.toString()

    })
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        return res.status(200).json({
            success: true,
            data: dataToSend
        })
    })
}

module.exports = {
    getInventory,
    addWallet,
    createNft,
    listNFTSale,
    testPython
}