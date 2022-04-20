const algosdk = require("algosdk")
const User = require('../models/user-model');
const Sale = require('../models/sale-model');
const NFTStorage = require('nft.storage').NFTStorage
const File = require('nft.storage').File
const WalletConnect = require("@walletconnect/client");
const QRCodeModal = require("algorand-walletconnect-qrcode-modal");

const mime = require('mime')
const fs = require('fs')
const path = require('path')
const {spawn, exec} = require('child_process');
const shell = require('shelljs');

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
        
        const assetsFromRes = accountInfo.assets;

        var assets = assetsFromRes.map((asset) => ({
            id: Number(asset['asset-id']),
            amount: Number(asset.amount),
            creator: asset['creator'],
            frozen: asset['is-frozen'],
            decimals: 0
        }))

        await Promise.all(
            assets.map(async asset => {
                const { params } = await client.getAssetByID(asset.id).do()
                asset.name = params.name
                asset.unitName = params["unit-name"];
                asset.url = params.url.replace("ipfs://", "https://ipfs.io/ipfs/");;
                asset.decimals = params.decimals;
            })
        )

        // GET THE ACTIVE AUCTIONS CREATED AND THEIR DETAILS
        const auctions = user.auctions
        let auctionsMapped = []
            let auctionDetails = []

        auctions.forEach(auctionID => {
            auctionsMapped.push({ 'id': auctionID })
        })

        await Promise.all(
            auctionsMapped.map(async auction => {
                auction.state = await client.accountApplicationInformation(walletId, auction['id']).do()
                auction.state = auction.state['created-app']['global-state']
            })
        )

        auctionsMapped.forEach(auction => {
            auction.state.map((stateVar) => {
                stateVar.key = atob(stateVar.key)
            })
            
            let stateCompiled = {}

            auction.state.forEach((stateVar) => {
                stateCompiled[stateVar.key] = stateVar['value']
            })

            stateCompiled['bid_account'] = algosdk.encodeAddress(new Uint8Array(Buffer.from(stateCompiled['bid_account']['bytes'], "base64")))
            stateCompiled['end'] = stateCompiled['end']['uint']
            stateCompiled['min_bid_inc'] = stateCompiled['min_bid_inc']['uint']
            stateCompiled['nft_id'] = stateCompiled['nft_id']['uint']
            stateCompiled['reserve_amount'] = stateCompiled['reserve_amount']['uint']
            stateCompiled['seller'] = algosdk.encodeAddress(new Uint8Array(Buffer.from(stateCompiled['seller']['bytes'], "base64")))
            stateCompiled['start'] = stateCompiled['start']['uint']

            console.log(stateCompiled['bid_amount'])
            //stateCompiled['bid_amount'] !== null
            // if no bid was placed yet, then bid_amount isn't a variable
            if(typeof stateCompiled['bid_amount'] !== "undefined"){
                stateCompiled['bid_amount'] = stateCompiled['bid_amount']['uint']
            }
            else{
                stateCompiled['bid_amount'] = 0
            }

            auction.state = stateCompiled

            auctionDetails.push(auction)
        })

        await Promise.all(
            auctionDetails.map(async auction => {
                const { params } = await client.getAssetByID(auction.state['nft_id']).do()
                auction.state.nftName = params.name
                auction.state.nftUnitName = params["unit-name"];
                auction.state.nftURL = params.url.replace("ipfs://", "https://ipfs.io/ipfs/");;
                auction.state.nftDecimals = params.decimals;
            })
        )

        return res.status(200).json({
            success: true,
            assets: assets,
            auctions: auctionDetails
        })
        

    })
}

createNft = async (req, res) => {
    const { media, title, desc } = req.body;
    const nftStorage_key = require('../config/keys').nftstorage_key

    let user = User.findOne({ _id: req.userId}, async (err, user) => {
        if(err){
            return res.status(400).json({
                success: false,
                error: 'The subject user was not found'
            })
        }
        // Minting/Tokenize
        /*
        {
            nftFile: nftFile,
            nftName: nftName,
            nftDesc: nftDesc
        }
        */
        nftFile=res.body.nftFile
        nftName=res.body.nftName
        nftDesc=res.body.nftDesc
        console.log(nftFile);
        console.log(nftName);
        console.log(nftName);
    });
}

listNFTSale = async(req, res) => {
    const { id, reserve, minBidIncrement, duration } = req.body

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

        var dataToSend = ''
        var python = spawn('python', ['./server/controllers/pythonScripts/createNFTSaleListing.py', walletId, walletId, nftID, reserve, minBidIncrement, startTime, endTime])
    

    })
}

    // TODO: Add a check on the backend to confirm that this auction exists
    // prevents person from calling route and storing non existent auction
    // this will not be an issue if called in the way frontend calls it though,
    // so for now, on the back burner
storeCreatedAuction = async(req, res) => {
    const { appID } = req.body
    if(!appID) {
        return res.status(200).json({
            success: false,
            message: "App ID was not given"
        })
    }

    User.findOne({ _id: req.userId}, async (err, user) => {
        if(err){
            return res.status(400).json({
                success: false,
                message: 'The subject user was not found'
            })
        }
        const wallet = user.wallet

        if(user.wallet === 'a'){
            return res.status(200).json({
                success: false,
                message: 'User wallet not found'
            })
        }

        const newSale = new Sale({
            appID: appID, creatorWallet: wallet
        });

        user.auctions.push(appID)

        const savedSale = await newSale.save()

        if(typeof user.auction === 'undefined' || user.auction === null){
            user.auction = []
        }
        const savedUser = await user.save()

        return res.status(200).json({
            success: true
        })

    })
}

module.exports = {
    getInventory,
    addWallet,
    createNft,
    listNFTSale,
    storeCreatedAuction
}