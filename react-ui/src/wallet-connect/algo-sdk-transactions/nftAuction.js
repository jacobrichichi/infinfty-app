import algosdk from 'algosdk'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import rawApprove from "../auction_contracts/approvalnew.txt"
import rawClear from "../auction_contracts/clearnew.txt"

import { formatJsonRpcRequest } from "@json-rpc-tools/utils";

export const bidOnAuction = async (auctionID, bidder, bidAmount) => {

    const conTemp = new WalletConnect({
        bridge: "https://bridge.walletconnect.org",
        qrcodeModal: QRCodeModal
    });

    const client = new algosdk.Algodv2("", "https://algoexplorerapi.io", "")

    let userInfo = await client.accountInformation(bidder).do()

    let appInfo = await client.accountApplicationInformation(bidder, userInfo['created-apps'][10].id).do()

    console.log(appInfo)


}

export const getAuctionDetails = async(auctionID, creatorWallet) => {
    const conTemp = new WalletConnect({
        bridge: "https://bridge.walletconnect.org",
        qrcodeModal: QRCodeModal
    });

    const client = new algosdk.Algodv2("", "https://algoexplorerapi.io", "")

    let auctionInfo = await client.accountApplicationInformation(creatorWallet, auctionID).do()
        
    // TODO: Decode the app state into human readable form
    // first need to decode the variable names, then the variable values

    console.log(auctionInfo)
}

// This will be repurposed to delete an auction SC given an application ID
export const deleteAuctions = async(sender, nftID) => {
    const conTemp = new WalletConnect({
        bridge: "https://bridge.walletconnect.org",
        qrcodeModal: QRCodeModal
    });

    const client = new algosdk.Algodv2("", "https://algoexplorerapi.io", "")

    let params = await client.getTransactionParams().do()
    // set transaction fee for writing to the contract to minimum
    params.fee = algosdk.ALGORAND_MIN_TX_FEE
    params.flatFee = true

    let info = await client.accountInformation(sender).do()
    let app =  info['created-apps'][5]

    let deleteTxn = algosdk.makeApplicationDeleteTxnFromObject({from: sender, suggestedParams: params, appIndex: app.id, foreignAssets: [nftID] })
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

export const createAuction = async (con, sender, seller, nftID, reserve, minBidIncrement, duration) => {

    // only here so i can see the methods that come with walletconnect, con should be grabbed from index.js
    const conTemp = new WalletConnect({
        bridge: "https://bridge.walletconnect.org",
        qrcodeModal: QRCodeModal
    });

    //create a client to interact with blockchain
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

    //const endTime = startTime + duration * 24 * 60 * 60
    const endTime = startTime + 30
    let microReserve = parseInt(reserve * 100000)
    let microIncrement = parseInt(minBidIncrement * 100000)
    // set the parameters to be passed into the auction contract, the seller, times, reserve, etc etc
    const appArgs = [
        algosdk.decodeAddress(sender).publicKey,
        algosdk.encodeUint64(nftID),
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
                    let setupTxn = algosdk.makeApplicationCallTxnFromObject({from: sender, suggestedParams: sug_params, appIndex: appIndex, onComplete: algosdk.OnApplicationComplete.NoOpOC, foreignAssets:[nftID], appArgs: [new Uint8Array(Buffer.from("setup"))] })
                    let fundNftTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({from: seller, to: appAddr, assetIndex: nftID, amount: 1, suggestedParams: sug_params, note: new Uint8Array(Buffer.from("example note value")) })
                    
                    
                   // algosdk.assignGroupID([fundAppTxn, setupTxn, fundNftTxn])

                   // Encode each txn one by one, and execute it
                   // Note: This isn't a great way to do this, as these should be executed atomically (all at once)
                   // if time is left, this switch should be made
                    const fundAppTxnEncoded = (Buffer.from(algosdk.encodeUnsignedTransaction(fundAppTxn))).toString("base64")
                    const fundAppTxns = [{txn: fundAppTxnEncoded, message: "This is a message"}]
                    const fundAppParams = [fundAppTxns]
                    const fundAppRequest = formatJsonRpcRequest("algo_signTxn", fundAppParams);
                    const fundAppResult = await conTemp.sendCustomRequest(fundAppRequest);
                    const fundAppAdded = await client.sendRawTransaction(new Uint8Array(fundAppResult[0])).do()
                    let confirmedFundAppTxn = await algosdk.waitForConfirmation(client, fundAppAdded.txId, 5);

                    const setupTxnEncoded = Buffer.from(algosdk.encodeUnsignedTransaction(setupTxn)).toString("base64")
                    const setupTxns = [{txn: setupTxnEncoded}]
                    const setupParams = [setupTxns]
                    const setupRequest = formatJsonRpcRequest("algo_signTxn", setupParams);
                    const setupResult = await conTemp.sendCustomRequest(setupRequest);
                    const setupAdded = await client.sendRawTransaction(new Uint8Array(setupResult[0])).do()
                    let confirmedSetupTxn = await algosdk.waitForConfirmation(client, setupAdded.txId, 5);

                    const fundNftTxnEncoded = Buffer.from(algosdk.encodeUnsignedTransaction(fundNftTxn)).toString("base64")
                    const fundNftTxns = [{ txn: fundNftTxnEncoded }]
                    const fundNftParams = [fundNftTxns]
                    const fundNftRequest = formatJsonRpcRequest("algo_signTxn", fundNftParams);
                    const fundNftResult = await conTemp.sendCustomRequest(fundNftRequest);
                    const fundNftAdded = await client.sendRawTransaction(new Uint8Array(fundNftResult[0])).do()
                    let confirmedFundNftTxn = await algosdk.waitForConfirmation(client, fundNftAdded.txId, 5);

                    // return success, and the appID so that it can be added to the database for the purpose of the explore page
                    return { success: true, appID: appIndex }
            
                })
        })

    console.log(fetchRes)
    return fetchRes
}