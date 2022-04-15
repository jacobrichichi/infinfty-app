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
    let client = new algosdk.Algodv2("", "https://algoexplorerapi.io", "");

    // get default parameters for an smart contract
    let params = await client.getTransactionParams().do()

    // set transaction fee for writing to the contract to minimum
    params.fee = algosdk.ALGORAND_MIN_TX_FEE
    params.flatFee = true


    // set the parameters to be passed into the auction contract, the seller, times, reserve, etc etc
    let utf8Encode = new TextEncoder();
    const appArgs = [
        algosdk.decodeAddress(sender).publicKey,
        utf8Encode.encode(nftID),
        utf8Encode.encode(startTime),
        utf8Encode.encode(endTime),
        utf8Encode.encode(reserve),
        utf8Encode.encode(minBidIncrement)
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
                    let approvalNew = client.compile(approval)
                    let clearNew = client.compile(clear)
                    
                    let approvalTwo = Buffer.from(new Uint8Array(approval))
                    let clearTwo = Buffer.from(new Uint8Array(clear))


                    let approvalFinal = new Uint8Array(Buffer.from(approval, "base64"))
                    let clearFinal = new Uint8Array(Buffer.from(clear, "base64"))
                    
                    let txn = algosdk.makeApplicationCreateTxn(sender, params,
                            algosdk.OnApplicationComplete.NoOpOC, approvalFinal, clearFinal,
                            0, 0, 7, 2, appArgs)

                    let encoding = algosdk.encodeUnsignedTransaction(txn)
                    let buffering = Buffer.from(encoding)
                    let finalToString = buffering.toString("base64")

                    const walletTxns = [{txn: finalToString}]
                    
                    const requestParams = [walletTxns];
                    const request = formatJsonRpcRequest("algo_signTxn", requestParams);
                    const result = await conTemp.sendCustomRequest(request);
                    console.log(result)
                    

                    
                })
            
        })
}