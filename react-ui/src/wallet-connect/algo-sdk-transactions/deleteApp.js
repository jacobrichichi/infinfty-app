    // DELETE AN APP, MIGHT WORK IDK YET

// let info = await client.accountInformation(sender).do()

//     let app =  info['created-apps'][9]

//     let deleteTxn = algosdk.makeApplicationDeleteTxnFromObject({from: sender, suggestedParams: params, appIndex: app.id })
//         let encoding = algosdk.encodeUnsignedTransaction(deleteTxn)
//         let buffering = Buffer.from(encoding)
//         let finalToString = buffering.toString("base64")

//         const walletTxns = [{txn: finalToString}]
        
//         const requestParams = [walletTxns];
//         const request = formatJsonRpcRequest("algo_signTxn", requestParams);
//         const result = await conTemp.sendCustomRequest(request)

//         const txid = await client.sendRawTransaction(new Uint8Array(result[0])).do()
    
//         let confirmedTxn = await algosdk.waitForConfirmation(client, txid.txId, 5);
//         const appIndex = confirmedTxn['application-index']


    // for(let app in info['created-apps']){
    //     //let appGlobalState = await client.getApplicationByID(app.id).do()
    //     let deleteTxn = algosdk.makeApplicationDeleteTxnFromObject({from: sender, suggestedParams: params, appIndex: app.id })
    //     let encoding = algosdk.encodeUnsignedTransaction(deleteTxn)
    //     let buffering = Buffer.from(encoding)
    //     let finalToString = buffering.toString("base64")

    //     const walletTxns = [{txn: finalToString}]
        
    //     const requestParams = [walletTxns];
    //     const request = formatJsonRpcRequest("algo_signTxn", requestParams);
    //     const result = await conTemp.sendCustomRequest(request)

    //     const txid = await client.sendRawTransaction(new Uint8Array(result[0])).do()
    
    //     let confirmedTxn = await algosdk.waitForConfirmation(client, txid.txId, 5);
    //     const appIndex = confirmedTxn['application-index']
    // }




    // CREATE DUMMY ASSET, DOESNT RLLY WORK :(
    // const createTxns = [{txn: Buffer.from(algosdk.encodeUnsignedTransaction(createTxn)).toString("base64")}]
    
    // const requestParamsCreate = [createTxns];
    // const createRequest = formatJsonRpcRequest("algo_signTxn", requestParamsCreate);
    // const createResult = await conTemp.sendCustomRequest(createRequest)

    // const createtxid = await client.sendRawTransaction(new Uint8Array(createResult[0])).do()

    // let createConfirmedTxn = await algosdk.waitForConfirmation(client, createtxid.txId, 5);
    // let nftIDDummy = createConfirmedTxn['asset-index']