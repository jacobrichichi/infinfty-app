import algosdk from 'algosdk'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import rawApprove from "../auction_contracts/approvalnew.txt"
import rawClear from "../auction_contracts/clearnew.txt"
import web3 from 'web3';
import axios from 'axios';

import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { getBottomNavigationUtilityClass } from '@mui/material';

export const clearApps = async (wallet) => {

    try{
        const conTemp = new WalletConnect({
            bridge: "https://bridge.walletconnect.org",
            qrcodeModal: QRCodeModal
        });

        const client = new algosdk.Algodv2("", "https://algoexplorerapi.io", "")

        let accountInfo = await client.accountInformation(wallet).do()

        let apps = accountInfo['created-apps']

        let params = await client.getTransactionParams().do()
        // set transaction fee for writing to the contract to minimum
        params.fee = algosdk.ALGORAND_MIN_TX_FEE
        params.flatFee = true

        for(let i = 0; i<apps.length; i++) {
            let auction = apps[i]
            auction.state = auction.params['global-state']

            auction.state.map((stateVar) => {
                stateVar.key = atob(stateVar.key)
            })
            
            let stateCompiled = {}

            auction.state.forEach((stateVar) => {
                stateCompiled[stateVar.key] = stateVar['value']
            })

            let nft_id = stateCompiled['nft_id']['uint']

            let deleteTxn = algosdk.makeApplicationDeleteTxnFromObject({from: wallet, suggestedParams: params, foreignAssets: [nft_id], appIndex: auction.id, accounts: [wallet] })
            let encoding = algosdk.encodeUnsignedTransaction(deleteTxn)
            let buffering = Buffer.from(encoding)
            let finalToString = buffering.toString("base64")

            const walletTxns = [{txn: finalToString}]
            
            const requestParams = [walletTxns];
            const request = formatJsonRpcRequest("algo_signTxn", requestParams);
            const result = await conTemp.sendCustomRequest(request)

            const txid = await client.sendRawTransaction(new Uint8Array(result[0])).do()

            let confirmedTxn = await algosdk.waitForConfirmation(client, txid.txId, 5);
        }
    }
    catch(error) {
        return { success: false, error: error}
    }

    return { success: true }
}
/**
 * 
 * name: 'testnet',
 * server: 'https://testnet-algorand.api.purestake.io/ps1',
 * label: 'TESTNET',
 * explorer: 'https://goalseeker.purestake.io/algorand/testnet'
 */


export const getAuctionDetails = async(auctionID, creatorWallet) => {
    
    const conTemp = new WalletConnect({
        bridge: "https://bridge.walletconnect.org",
        qrcodeModal: QRCodeModal
    });

    const client = new algosdk.Algodv2("", "https://algoexplorerapi.io", "")

    let auction = await client.getApplicationByID(auctionID).do().catch(error => {
        localStorage.removeItem("currentAuctionID")
        return null
    })
        
    // TODO: Decode the app state into human readable form
    // first need to decode the variable names, then the variable values

    if(auction !== null && auction.params !== null){
        auction.state = auction.params['global-state']

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

        const { params } = await client.getAssetByID(auction.state['nft_id']).do()
        auction.state.nftName = params.name
        auction.state.nftUnitName = params["unit-name"];
        auction.state.nftURL = params.url.replace("ipfs://", "https://ipfs.io/ipfs/");;
        auction.state.nftDecimals = params.decimals;

        return auction
    }
    else{
        return {id: "",
             state: {
                bid_account:"",
                end: 0,
                min_bid_inc: 0,
                nft_id: 0,
                reserve_amount: 0,
                seller: "",
                start: 0,
                description: "",
                nftName: "",
                nftUnitName: "",
                nftURL: "",
                nftDecimals: 0,
                bid_amount: 0
            }
        }
    }
}

const pinFileToIPFS = async (nftFile, nftName, nftDesc) => {
    // Cause pinata sdk doesn't support frontend blobs, even Blob.stream() doesn't work
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const data = new FormData();
    data.append('file', nftFile);
    const metadata = JSON.stringify({
        name: nftName,
        keyvalues: {
            description: nftDesc
        }
    });
    data.append('pinataMetadata', metadata);
    const pinataOptions = JSON.stringify({
        cidVersion: 0,
    });
    data.append('pinataOptions', pinataOptions);

    return axios.post(url, data, {
        maxBodyLength: 'Infinity', // this is needed to prevent axios from erroring out with large files
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            'pinata_api_key': process.env.REACT_APP_PINATA_KEY,
            'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET,
        },
    }).then((response) => {
        console.log(response);
        return response
    })
    .catch((error) => {
        console.log(error);
        return getBottomNavigationUtilityClass
    });
};

const pinJSONToIPFS = async (nftFile, nftName, nftDesc, resultFile, integrity) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    const json = JSON.stringify({
        pinataContent:{
            name: `${nftName}@arc3`,
            description: nftDesc,
            media: `ipfs://${resultFile.IpfsHash}`,
            media_integrity: `sha256-${integrity.base64}`,
            media_mimetype: `${nftFile.type}`,
            properties: {
                file_url: `arc3-asa`,
                file_url_integrity: `sha256-${integrity.base64}`,
                file_url_mimetype: `${nftFile.type}`,
            }
        },
        pinataMetadata:{
            name: `${nftName}_arc3`,
            keyvalues: {
                description: nftDesc
            }
        },
        pinataOptions:{
            cidVersion: 0,
        }
    })

    return axios.post(url, json, {
        headers: {
            'pinata_api_key': process.env.REACT_APP_PINATA_KEY,
            'pinata_secret_api_key': process.env.REACT_APP_PINATA_SECRET,
        }
    }).then((response) => {
        console.log(response)
        return response
    }).catch((err) => {
        console.log(err)
        return null
    });
}

export const createNFT = async (nftFile, nftName, nftDesc, bidder) => {
    /**
        ASA Paramters: NFT Specific
        Creator (required)
        AssetName (optional, but recommended)
        UnitName (optional, but recommended) => INFIMINT
        Total (required) => 1
        Decimals (required) => 0
        DefaultFrozen (required) => True
        URL (optional) => Link to IPFS or Pinning service
        MetaDataHash (optional) => Hash from IPFS
     */

    /* Pinning services */
    // Pin the file to IPFS via Pinata
    const resultFile = await pinFileToIPFS(nftFile, nftName, nftDesc)
    if (!resultFile){
        return { success: false }
    }
    if(resultFile.data.isDuplicate){
        return { success: 'duplicate' }
    }
    // Constructing metadata JSON
    let integrity = web3.utils.asciiToHex(resultFile.data.IpfsHash)
    // Pin metadata to IPFS via Pinata
    const resultMeta = await pinJSONToIPFS(nftFile, nftName, nftDesc, resultFile, integrity)
    if (!resultMeta){
        return { success: false }
    }

    /* Create asset onto Algorand chain */
    /**
     * > Asset URL (au) points to a JSON Metadata file URI. 
     * In the case of using IPFS , only standard IPFS URI (ipfs://...) 
     * must be used and not gateway format (https://ipfs.io/ipfs/...). 
     * No http URI is allowed for web security standards reasons. If Asset 
     * Name does not end with "@arc3" then the Asset URL has to end with "#arc3". 
     * > Asset Metadata Hash (am) is defined as the SHA-256 digest of the JSON 
     * Metadata file as a 32-byte string (as defined in NIST FIPS 180-4), when 
     * no extra_metadata is defined in JSON Metadata file (most of use cases).
     */
    const client = new algosdk.Algodv2('', 'https://algoexplorerapi.io', '');

    let params = await client.getTransactionParams().do();
    // Immutable parameters
    params.fee = algosdk.ALGORAND_MIN_TX_FEE;
    params.flatFee = true;
    let note = undefined; // arbitrary data to be stored in the transaction; here, none is stored
    // Asset creation specific parameters: The following parameters are asset specific
    // We will also change the manager later in the example
    let addr = bidder;
    // Whether user accounts will need to be unfrozen before transacting    
    let defaultFrozen = false;
    // integer number of decimals for asset unit calculation
    let decimals = 0;
    // total number of this asset available for circulation   
    let totalIssuance = 1;
    // Used to display asset units to user    
    let unitName = `INFIMINT`;
    // Friendly name of the asset    
    let assetName = `${nftName}`;
    // Optional string pointing to a URL relating to the asset
    let assetURL = `ipfs://${resultFile.data.IpfsHash}`;
    // Optional hash commitment of some sort relating to the asset. 32 character length.
   // const hash = sha256.create();

    //let assetMetadataHash = resultFile.data.IpfsHash
    //(new Uint8Array(Buffer.from(`sha256-${resultFile.data.IpfsHash}`, "base64")));
    // Mutable paramters. Can only be changed by the current manager
    // Specified address can change reserve, freeze, clawback, and manager
    let manager = bidder;
    // Specified address is considered the asset reserve
    // (it has no special privileges, this is only informational)
    let reserve = bidder;
    // Specified address can freeze or unfreeze user asset holdings 
    let freeze = bidder;
    // Specified address can revoke user asset holdings and send them to other addresses    
    let clawback = bidder;
    // Signing and Sending "Txn" to allow "addr" to create an asset
    // Signing will take place via app, sends API request to app
    
    let txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
        from: addr,
        suggestedParams: params,
        assetURL: assetURL,
        assetName: assetName,
        unitName: unitName,
        decimals: decimals,
        defaultFrozen: false,
        total: 1,
    })


    // Format unsignedTxn for API request to app
    let encodedtxn = algosdk.encodeUnsignedTransaction(txn)
    let buffertxn = Buffer.from(encodedtxn)
    let finalToString = buffertxn.toString("base64")
    const walletTxns = [{txn: finalToString}]
    const requestParams = [walletTxns];
    const request = formatJsonRpcRequest("algo_signTxn", requestParams);
    const conTemp = new WalletConnect({
        bridge: "https://bridge.walletconnect.org",
        qrcodeModal: QRCodeModal
    });
    const results = await conTemp.sendCustomRequest(request) // API request to app
    const tx = await client.sendRawTransaction(new Uint8Array(results[0])).do()
    let assetID = null;
    // Wait for transaction to be confirmed
    const ptx = await algosdk.waitForConfirmation(client, tx.txId, 5);
    // Get the new asset's information from the creator account
    assetID = ptx["asset-index"];
    // Get the completed Transaction
    console.log("Transaction " + tx.txId + " confirmed in round " + ptx["confirmed-round"]);

    // let cTxn = algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject({
    //     from: addr,
    //     suggestedParams: params,
    //     assetIndex: assetID,
    //     manager: manager,
    //     reserve: reserve,
    //     freeze: freeze,
    //     clawback: clawback,
    //     strictEmptyAddressChecking: false,
    // })
    return { success: true }
}

export const bidOnAuction = async (auction, bidder, bidAmount) => {
    try{
        const conTemp = new WalletConnect({
            bridge: "https://bridge.walletconnect.org",
            qrcodeModal: QRCodeModal
        });

        const client = new algosdk.Algodv2("", "https://algoexplorerapi.io", "")

        let userInfo = await client.accountInformation(bidder).do()

        let prevBidder = auction.state.bid_account
        let prevBidAmount = auction.state.bid_amount


        let sug_params = await client.getTransactionParams().do()
        sug_params.fee = algosdk.ALGORAND_MIN_TX_FEE
        sug_params.flatFee = true

        let appAddr = algosdk.getApplicationAddress(parseInt(auction.id))

        let payTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: bidder,
            to: appAddr,
            amount: parseInt(bidAmount * 1000000),
            suggestedParams: sug_params
        })

        let bidTxn = algosdk.makeApplicationCallTxnFromObject({
                                                        from: bidder,
                                                        suggestedParams: sug_params,
                                                        appIndex: parseInt(auction.id),
                                                        onComplete: algosdk.OnApplicationComplete.NoOpOC,
                                                        appArgs: [new Uint8Array(Buffer.from("bid"))],
                                                        foreignAssets: [auction.state.nft_id],
                                                        accounts: prevBidAmount !== 0 ? [prevBidder] : []
                                                    })

        let optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: bidder,
            to: bidder,
            suggestedParams: sug_params,
            amount: 0,
            assetIndex: auction.state.nft_id,
        })

        algosdk.assignGroupID([payTxn, bidTxn, optInTxn])

        const paymentTxnEncoded = Buffer.from(algosdk.encodeUnsignedTransaction(payTxn)).toString("base64")
        const bidTxnEncoded = Buffer.from(algosdk.encodeUnsignedTransaction(bidTxn)).toString("base64")
        const optInTxnEncoded = Buffer.from(algosdk.encodeUnsignedTransaction(optInTxn)).toString("base64")
        const paymentTxns = [{txn: paymentTxnEncoded}, {txn: bidTxnEncoded}, {txn: optInTxnEncoded}]
        const paymentParams = [paymentTxns]
        const paymentRequest = formatJsonRpcRequest("algo_signTxn", paymentParams);

        const paymentResult = await conTemp.sendCustomRequest(paymentRequest);
        console.log(paymentResult)
        const paymentAdded = await client.sendRawTransaction([new Uint8Array(paymentResult[0]), new Uint8Array(paymentResult[1]), new Uint8Array(paymentResult[2])]).do()
        let confirmedPaymentTxn = await algosdk.waitForConfirmation(client, paymentAdded.txId, 5);
    }
    catch(error) {
        return { success: false, error: error}
    }
    return { success: true }

}

export const endAuction = async (auctionID, walletID, bidderAccount, nftID) => {
    try{
        const conTemp = new WalletConnect({
            bridge: "https://bridge.walletconnect.org",
            qrcodeModal: QRCodeModal
        });

        const client = new algosdk.Algodv2("", "https://algoexplorerapi.io", "")

        let accountInfo = await client.accountInformation(walletID).do()

        let params = await client.getTransactionParams().do()
        // set transaction fee for writing to the contract to minimum
        params.fee = algosdk.ALGORAND_MIN_TX_FEE
        params.flatFee = true
        let deleteTxn = algosdk.makeApplicationDeleteTxnFromObject({from: walletID, 
            suggestedParams: params,
            appIndex: auctionID, 
            foreignAssets: [nftID],
            accounts: [walletID, bidderAccount]
        
        })
        let encoding = algosdk.encodeUnsignedTransaction(deleteTxn)
        let buffering = Buffer.from(encoding)
        let finalToString = buffering.toString("base64")

        const walletTxns = [{txn: finalToString}]
        
        const requestParams = [walletTxns];
        const request = formatJsonRpcRequest("algo_signTxn", requestParams);
        const result = await conTemp.sendCustomRequest(request)

        const txid = await client.sendRawTransaction(new Uint8Array(result[0])).do()

        let confirmedTxn = await algosdk.waitForConfirmation(client, txid.txId, 5);
        const appIndex = confirmedTxn['application-index']
    }   
    catch(error) {
        return { success: false, error: error}
    }
    return { success: true }
}

export const createAuction = async (con, sender, seller, nftID, reserve, minBidIncrement, duration) => {
    try{
    // only here so i can see the methods that come with walletconnect, con should be grabbed from index.js
    const conTemp = new WalletConnect({
        bridge: "https://bridge.walletconnect.org",
        qrcodeModal: QRCodeModal
    });

    //  create a client to interact with blockchain
    //  this switches to test net
    //  const token={
    //      "x-api-key": "DAvynGYXzzaY8IMPxgcH32wok98nqPS49wnjv2El" // fill in yours
    //  };
    //  let client = new algosdk.Algodv2(token, "https://testnet-algorand.api.purestake.io/ps2", "");

    const client = new algosdk.Algodv2("", "https://algoexplorerapi.io", "")
    // get default parameters for an smart contract
    let params = await client.getTransactionParams().do()
    // set transaction fee for writing to the contract to minimum
    params.fee = algosdk.ALGORAND_MIN_TX_FEE
    params.flatFee = true

    // Work out start and end times based on duration
    const date = new Date()
    const startTime = parseInt(date.getTime()/1000 + 100)

    const endTime = startTime + duration * 60 * 60
    //const endTime = startTime + 1800
    let microReserve = parseInt(reserve * 1000000)
    let microIncrement = parseInt(minBidIncrement * 1000000)

    let properNftId = nftID

    if(typeof properNftId === "string"){
        properNftId = parseInt(properNftId)
    }

    // set the parameters to be passed into the auction contract, the seller, times, reserve, etc etc
    const appArgs = [
        algosdk.decodeAddress(sender).publicKey,
        algosdk.encodeUint64(properNftId),
        algosdk.encodeUint64(startTime),
        algosdk.encodeUint64(endTime),
        algosdk.encodeUint64(microReserve),
        algosdk.encodeUint64(microIncrement)
    ]

    // get the approval smart contract from its' file
    let fetchRes = await fetch(rawApprove)
        .then(async response => await response.text())
        .then(async approval=> {
            // get the clear contract from its file
            return await fetch(rawClear)
                .then(async responseTwo => await responseTwo.text())
                .then(async (clear) => {
                    // create a new auction, with the sender being the creator, default params, 
                    //how the app behaves on completion, contracts, data partitioning between local and global, and args passed in
                    
                    // Take the SC teal files, and compile it into binary
                    let approvalCompiled = await client.compile(approval).do()
                    let clearCompiled = await client.compile(clear).do()
                    
                    // Encode the SC so they can be understood by the chain
                    let approvalEncoded = new Uint8Array(Buffer.from(approvalCompiled.result, "base64"))
                    let clearEncoded = new Uint8Array(Buffer.from(clearCompiled.result, "base64"))

                    // Create the txn object, with the creator, SC's, amount of var space, arg's etc
                    let txn = algosdk.makeApplicationCreateTxn(sender, params,
                            algosdk.OnApplicationComplete.NoOpOC, approvalEncoded, clearEncoded,
                            0, 0, 7, 2, appArgs)
                    
                    // encode the txn
                    let encoding = algosdk.encodeUnsignedTransaction(txn)
                    let buffering = Buffer.from(encoding)
                    let finalToString = buffering.toString("base64")

                    // put it into an array
                    const walletTxns = [{txn: finalToString}]
                    
                    // req into an array
                    const requestParams = [walletTxns];
                    // format the RPC request to be sent for signing by the wallet owner
                    const request = formatJsonRpcRequest("algo_signTxn", requestParams);
                    // send to Pera Wallet for signing, get back the signed txn as the result
                    const result = await conTemp.sendCustomRequest(request)

                    // send the signed transaction into the chain, encode it
                    const txid = await client.sendRawTransaction(new Uint8Array(result[0])).do()
                        
                    // wait the txn to be written the chain for 5 rounds, get back the result
                    let confirmedTxn = await algosdk.waitForConfirmation(client, txid.txId, 5);
                    // get the app index that was returned from this writing
                    const appIndex = confirmedTxn['application-index']

                    // get the wallet address of the smart contract from it's index
                    let appAddr = algosdk.getApplicationAddress(appIndex)

                    // suggested params for a txn
                    let sug_params = await client.getTransactionParams().do()
                   // sug_params.fee = algosdk.ALGORAND_MIN_TX_FEE
                   // sug_params.flatFee = true

                    let fundingAmount = (
                        // min account balance
                        100000
                        // additional min balance to opt into NFT
                        + 100000
                        // 3 * min txn fee
                        + 3 * 1000
                    )

                    // 3 TXN's to be made now
                    // Fund App transfers the necessary amount of Algo's necessary for an auction to the smart contract wallet
                    // setup opt's into the NFT so it can be sent to the contract
                    // fund NFT sends the NFT to the contracts wallet address
                    let fundAppTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({ from: seller, to: appAddr, suggestedParams: sug_params, amount: fundingAmount, note: new Uint8Array(Buffer.from("example note value")) })
                    let setupTxn = algosdk.makeApplicationCallTxnFromObject({from: sender, suggestedParams: sug_params, appIndex: appIndex, onComplete: algosdk.OnApplicationComplete.NoOpOC, foreignAssets:[properNftId], appArgs: [new Uint8Array(Buffer.from("setup"))] })
                    let fundNftTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({from: seller, to: appAddr, assetIndex: properNftId, amount: 1, suggestedParams: sug_params, note: new Uint8Array(Buffer.from("example note value")) })
                    
                    
                    algosdk.assignGroupID([fundAppTxn, setupTxn, fundNftTxn])

                   // Encode each txn one by one, and execute it
                   // Note: This isn't a great way to do this, as these should be executed atomically (all at once)
                   // if time is left, this switch should be made
                    const fundAppTxnEncoded = (Buffer.from(algosdk.encodeUnsignedTransaction(fundAppTxn))).toString("base64")
                    const setupTxnEncoded = Buffer.from(algosdk.encodeUnsignedTransaction(setupTxn)).toString("base64")
                    const fundNftTxnEncoded = Buffer.from(algosdk.encodeUnsignedTransaction(fundNftTxn)).toString("base64")

                    const secondaryTxns = [{txn: fundAppTxnEncoded, message: "This is a message"}, {txn: setupTxnEncoded}, {txn: fundNftTxnEncoded}]
                    const secondaryParams = [secondaryTxns]
                    const secondaryRequest = formatJsonRpcRequest("algo_signTxn", secondaryParams);

                    const secondaryResult = await conTemp.sendCustomRequest(secondaryRequest);
                    const secondaryAdded = await client.sendRawTransaction([new Uint8Array(secondaryResult[0]), new Uint8Array(secondaryResult[1]), new Uint8Array(secondaryResult[2])]).do()
                    let confirmedSecondaryTxn = await algosdk.waitForConfirmation(client, secondaryAdded.txId, 5);

                    // return success, and the appID so that it can be added to the database for the purpose of the explore page
                    return { success: true, appID: appIndex }
            
                })
        })

        return fetchRes
    }
    catch(error) {
        return { success: false, error: error}
    }
    
}
