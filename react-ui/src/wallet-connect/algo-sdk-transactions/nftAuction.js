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

    //create a client to interact with blockchain
    //  const token={
    //      "x-api-key": "DAvynGYXzzaY8IMPxgcH32wok98nqPS49wnjv2El" // fill in yours
    //  };
    //  let client = new algosdk.Algodv2(token, "https://testnet-algorand.api.purestake.io/ps2", "");

    const client = new algosdk.Algodv2("", "https://algoexplorerapi.io", "");

    // get default parameters for an smart contract
    let params = await client.getTransactionParams().do()
    // set transaction fee for writing to the contract to minimum
    params.fee = algosdk.ALGORAND_MIN_TX_FEE
    params.flatFee = true

    // Work out start and end times based on duration
    const date = new Date()
    const startTime = parseInt(date.getTime()/1000 + 100)
  //  const endTime = startTime + duration * 24 * 60 * 60
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

                    const txid = await client.sendRawTransaction(new Uint8Array(result[0])).do()
                
                    let confirmedTxn = await algosdk.waitForConfirmation(client, txid.txId, 5);
                    const appIndex = confirmedTxn['application-index']

                    let appAddr = algosdk.getApplicationAddress(appIndex)

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
                    //seller, appAddr, fundingAmount, seller, new Uint8Array(Buffer.from("Amount necessary for txn fees")

                    let fundAppTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({ from: seller, to: appAddr, suggestedParams: sug_params, amount: fundingAmount, note: new Uint8Array(Buffer.from("example note value")),})
                    let utf8Encode = new TextEncoder();
                    let setupTxn = algosdk.makeApplicationCallTxnFromObject({from: sender, suggestedParams: sug_params, appIndex: appIndex, onComplete: algosdk.OnApplicationComplete.NoOpOC, foreignAssets:[nftID], appArgs: [new Uint8Array(Buffer.from("setup"))] })
                    let fundNftTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({from: seller, to: appAddr, assetIndex: nftID, amount: 1, suggestedParams: sug_params, note: new Uint8Array(Buffer.from("example note value")) })
                    
                    
                   // algosdk.assignGroupID([fundAppTxn, setupTxn, fundNftTxn])

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
                    const fundNftTxns = [{txn: fundNftTxnEncoded}]
                    const fundNftParams = [fundNftTxns]
                    const fundNftRequest = formatJsonRpcRequest("algo_signTxn", fundNftParams);
                    const fundNftResult = await conTemp.sendCustomRequest(fundNftRequest);

                    const fundNftAdded = await client.sendRawTransaction(new Uint8Array(fundNftResult[0])).do()
                    let confirmedFundNftTxn = await algosdk.waitForConfirmation(client, fundNftAdded.txId, 5);

                    // const batchTxnMint = await client.sendRawTransaction(
                    //     [new Uint8Array(fundAppResult[0]),
                    //     new Uint8Array(setupResult[0]),
                    //     new Uint8Array(fundNftResult[0]),
                    // ]).do()

                    // let confirmedBatchTxns = await algosdk.waitForConfirmation(client, batchTxnMint.txId, 5);

            
                })
            
        })
}