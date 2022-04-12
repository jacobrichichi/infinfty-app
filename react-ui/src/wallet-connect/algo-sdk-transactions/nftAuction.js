import algosdk from 'algosdk'
import rawApprove from "../auction_contracts/approval.bin"
import rawClear from "../auction_contracts/clear.bin"

export const createAuction = async (sender, seller, nftID, reserve, minBidIncrement, duration) => {
    const date = new Date()
    const startTime = date.getTime()/1000 + 10
    const endTime = startTime + duration * 24 * 60 * 60
    let client = new algosdk.Algodv2("", "https://algoexplorerapi.io", "");

    let params = await client.getTransactionParams().do()

    params.fee = algosdk.ALGORAND_MIN_TX_FEE
    params.flatFee = true

    let utf8Encode = new TextEncoder();
    const appArgs = [
        algosdk.decodeAddress(seller),
        utf8Encode(nftID),
        utf8Encode(startTime),
        utf8Encode(endTime),
        utf8Encode(reserve),
        utf8Encode(minBidIncrement)
    ]

    fetch(rawApprove)
        .then(response => response.text())
        .then(approval=> {
            fetch(rawClear)
                .then(responseTwo => responseTwo.text())
                .then((clear) => {
                    globalSchema = algosdk.makeApplicationCreateTxn(sender, params,
                                    algosdk.OnApplicationComplete.NoOpOC, approval, clear,
                                    0, 0, 7, 2, appArgs)
                })
            
        })
}