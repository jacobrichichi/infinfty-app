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

        // Assets in inventory
        const accountInfo = await client.accountInformation(walletId)
                                        .setIntDecoding(algosdk.IntDecoding.BIGINT)
                                        .do();   

        const assetsFromRes = accountInfo.assets;

        console.log(assetsFromRes)

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


// TODO, If for some reason auction is deleted from chain, but not from mongoDB database,
// need a way to catch this error, and handle it
getExploreAuctions = async(req, res) => {
    let searchTerm = req.body.searchTerm
    Sale.find({ }, async (err, auctions) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!auctions.length) {
            return res
                .status(404)
                .json({ success: false, error: `Auctions not found` })
        }
        else{
            const client = new algosdk.Algodv2("", "https://algoexplorerapi.io", "")
            let unshuffledAuctionsMapped = []
            let auctionDetails = []

            auctions.forEach(auction => {
                unshuffledAuctionsMapped.push({ 'id': auction.appID, 'wallet': auction.creatorWallet })
            })

            let auctionsMapped = unshuffledAuctionsMapped
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)

            await Promise.all(
                auctionsMapped.map(async auction => {
                    auction.state = await client.getApplicationByID(auction['id']).do()
                    auction.state = auction.state.params['global-state']
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
                stateCompiled['description'] = "Cool little auction!"

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
                    auction.state.nftName = params.name;
                    auction.state.nftUnitName = params["unit-name"];
                    auction.state.nftURL = params.url.replace("ipfs://", "https://ipfs.io/ipfs/");
                    auction.state.nftDecimals = params.decimals;
                })
            )
            // console.log(searchTerm)
            // console.log(auctionDetails[0].state.nftName.toLowerCase())

            let newSearchTerm = searchTerm.toLowerCase().trim()
            
            auctionDetails = auctionDetails.filter(auction => auction.state.nftName.toLowerCase().includes(newSearchTerm))
            

            return res.status(200).json({
                success: true,
                auctions: auctionDetails
            })
        }
    })
}

endAuction = async(req, res) => {
    console.log('hi')
    User.findOne({ _id: req.userId}, async (err, user) => {
        
        if(err){
            return res.status(400).json({
                success: false,
                message: 'The subject user was not found'
            })
        }
        console.log('user')

        const callerWallet = user.wallet
        if(callerWallet === 'a'){
            return res.status(200).json({
                success: false,
                message: 'User wallet not found'
            })
        }

        console.log(callerWallet)
        console.log(req.body)

        Sale.findOne({ appID: req.body.auctionID }, (err, auction) => {
            if(err){
                return res.status(400).json({
                    success: false,
                    message: 'The subject auction was not found'
                })
            }

            console.log('hi 2')

            if(auction.creatorWallet !== callerWallet) {
                return res.status(400).json({
                    success: false,
                    message: 'You can only close auctions with which you have created'
                })
            }

            // If i delete user list auction first, possibility of leaving hanging sale that has been closed
            // Would show up on explore page, even though it doesnt exist
            // attempt to fetch would lead to error

            // If vice versa


            callerAuctions = user.auctions
            
            for(let i = 0; i<callerAuctions.length; i++){
                if(callerAuctions[i] === auction.appID){
                    callerAuctions.splice(i, 1)
                    break;
                }
            }

            user.auctions = callerAuctions
            user.save()
                .then(() => {
                    Sale.findOneAndDelete({ appID: auction.appID }, () => {
                        return res.status(200).json({
                            success: true
                        })
                    })
                })

        })


    })

}

module.exports = {
    getInventory,
    addWallet,
    createNft,
    listNFTSale,
    storeCreatedAuction,
    getExploreAuctions,
    endAuction
}