import algosdk from 'algosdk'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import rawApprove from "../auction_contracts/approvalnew.txt"
import rawClear from "../auction_contracts/clearnew.txt"

import { formatJsonRpcRequest } from "@json-rpc-tools/utils";

export const createAuction = async (con, sender, seller, nftID, reserve, minBidIncrement, duration) => {

    // only here so i can see the methods that come with walletconnect, con should be grabbed from index.js
    const conTemp = new WalletConnect({
        bridge: "https://bridge.walletconnect.org",
        qrcodeModal: QRCodeModal
    });

    // Work out start and end times based on duration
    const date = new Date()
    const startTime = date.getTime()/1000 + 10
    const endTime = startTime + duration * 24 * 60 * 60

    // create a client to interact with blockchain
    // const token={
    //     "x-api-key": "DAvynGYXzzaY8IMPxgcH32wok98nqPS49wnjv2El" // fill in yours
    // };
    // let client = new algosdk.Algodv2(token, "https://testnet-algorand.api.purestake.io", "");

    const client = new algosdk.Algodv2("", "https://algoexplorerapi.io", "");

    // get default parameters for an smart contract
    let params = await client.getTransactionParams().do()

    // set transaction fee for writing to the contract to minimum
    params.fee = algosdk.ALGORAND_MIN_TX_FEE
    params.flatFee = true


    // set the parameters to be passed into the auction contract, the seller, times, reserve, etc etc
    let utf8Encode = new TextEncoder();
    const appArgs = [
        algosdk.decodeAddress(sender).publicKey,
        algosdk.encodeUint64(nftID),
        // algosdk.encodeUint64(startTime),
        // algosdk.encodeUint64(endTime),
        // algosdk.encodeUint64(reserve),
        // algosdk.encodeUint64(minBidIncrement)
        // new Uint8Array(Buffer.from(nftID, "base64")),
        // new Uint8Array(Buffer.from(startTime, "base64")),
        // new Uint8Array(Buffer.from(endTime, "base64")),
        // new Uint8Array(Buffer.from(reserve, "base64")),
        // new Uint8Array(Buffer.from(minBidIncrement, "base64"))
        // utf8Encode.encode(nftID),
        // utf8Encode.encode(startTime),
        // utf8Encode.encode(endTime),
        // utf8Encode.encode(reserve),
        // utf8Encode.encode(minBidIncrement)
    ]

    // get the approval smart contract from its' file
    fetch(rawApprove)
        .then(async response => response.text())
        .then(async approval=> {
            // get the clear contract from its file
            fetch(rawClear)
                .then(async responseTwo => responseTwo.text())
                .then(async (clear) => {
                    // create a new auction, with the sender being the creator, default params, 
                    //how the app behaves on completion, contracts, data partitioning between local and global, and args passed in
                    let approvalCompiled = await client.compile(approval).do()
                    let clearCompiled = await client.compile(clear).do()
                    
                    let approvalEncoded = new Uint8Array(Buffer.from(approvalCompiled.result, "base64"))
                    let clearEncoded = new Uint8Array(Buffer.from(clearCompiled.result, "base64"))

                    let txn = algosdk.makeApplicationCreateTxn(sender, params,
                            algosdk.OnApplicationComplete.NoOpOC, approvalEncoded, clearEncoded,
                            0, 0, 7, 2, appArgs)

                    let encoding = algosdk.encodeUnsignedTransaction(txn)
                    let buffering = Buffer.from(encoding)
                    let finalToString = buffering.toString("base64")

                    const walletTxns = [{txn: finalToString}]
                    
                    const requestParams = [walletTxns];
                    const request = formatJsonRpcRequest("algo_signTxn", requestParams);
                    const result = await conTemp.sendCustomRequest(request)


                    const decodedResult = result.map(element => {
                        return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
                      });

                    let stThree = Buffer.from(result).toString("base64")
                    
                    console.log(stThree)

                    let stFour = new Uint8Array(result[0])
                    console.log(stFour)


                    const { txid } = await client.sendRawTransaction(stFour).do()


                    let appIndex = 0
                    // let lastStatus = await client.status().do()
                    // let lastRound = lastStatus["last-round"]
                    // let startRound = lastRound
                    // let appIndex

                    // while(lastRound < startRound + 10){
                    //     let pendingTxn = await client.pendingTransactionInformation(txn.txID()).do()
                    //     if(pendingTxn["confirmed-round"] > 0){
                    //         appIndex = pendingTxn["application-index"]
                    //     }
                    //     lastStatus = await client.statusAfterBlock(lastRound + 1).do()
                    //     lastRound += 1
                    
                    // }
                
                    let confirmedTxn = await algosdk.waitForConfirmation(client, txid, 4);

                    let appAddr = algosdk.getApplicationAddress(appIndex)

                    let sug_params = await client.getTransactionParams().do()

                    let fundingAmount = (
                        // min account balance
                        100000
                        // additional min balance to opt into NFT
                        + 100000
                        // 3 * min txn fee
                        + 3 * 1000
                    )
                    //seller, appAddr, fundingAmount, seller, new Uint8Array(Buffer.from("Amount necessary for txn fees")

                    let fundAppTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({ from: seller, to: appAddr, suggestedParams: sug_params, amount: 1 })
                    let setupTxn = algosdk.makeApplicationCallTxnFromObject({from: sender, suggestedParams: sug_params, appIndex: appIndex, onComplete: algosdk.OnApplicationComplete.NoOpOC, foreignAssets:[nftID], appArgs: [new Uint8Array(Buffer.from("setup"))] })
                    let fundNftTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({from: seller, to: appAddr, assetIndex: nftID, amount: 1, suggestedParams: sug_params })
                    algosdk.assignGroupID([fundAppTxn, setupTxn, fundNftTxn])

                    const fundAppTxns = [{txn: fundAppTxn}]
                    const fundAppParams = [fundAppTxns]
                    const fundAppRequest = formatJsonRpcRequest("algo_signTxn", fundAppParams);
                    const fundAppResult = await conTemp.sendCustomRequest(fundAppRequest);

                    const setupTxns = [{txn: setupTxn}]
                    const setupParams = [setupTxns]
                    const setupRequest = formatJsonRpcRequest("algo_signTxn", setupParams);
                    const setupResult = await conTemp.sendCustomRequest(setupRequest);

                    const fundNftTxns = [{txn: fundAppTxn}]
                    const fundNftParams = [fundNftTxns]
                    const fundNftRequest = formatJsonRpcRequest("algo_signTxn", fundNftParams);
                    const fundNftResult = await conTemp.sendCustomRequest(fundNftRequest);
                })
            
        })
}