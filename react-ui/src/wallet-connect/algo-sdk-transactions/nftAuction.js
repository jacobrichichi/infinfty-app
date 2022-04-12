import algosdk from 'algosdk'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import rawApprove from "../auction_contracts/approval.bin"
import rawClear from "../auction_contracts/clear.bin"

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
        algosdk.decodeAddress(seller),
        utf8Encode(nftID),
        utf8Encode(startTime),
        utf8Encode(endTime),
        utf8Encode(reserve),
        utf8Encode(minBidIncrement)
    ]

    // get the approval smart contract from its' file
    fetch(rawApprove)
        .then(response => response.text())
        .then(approval=> {
            // get the clear contract from its file
            fetch(rawClear)
                .then(responseTwo => responseTwo.text())
                .then((clear) => {
                    // create a new auction, with the sender being the creator, default params, 
                    //how the app behaves on completion, contracts, data partitioning between local and global, and args passed in
                    let txn = algosdk.makeApplicationCreateTxn(sender, params,
                            algosdk.OnApplicationComplete.NoOpOC, approval, clear,
                            0, 0, 7, 2, appArgs)
                    // figure out how 2 properly sign
                    let signedTxn = conTemp.signTransaction(txn)
                    
                })
            
        })
}