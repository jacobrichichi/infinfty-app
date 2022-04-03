// const algosdk = require("algosdk")
// const {spawn} = require('child_process');
// //import { fullyCompileContract } from './utils'
// //import { approval_program, clear_state_program } from './contracts'

// var APPROVAL_PROGRAM = new Uint8Array()
// var CLEAR_STATE_PROGRAM = new Uint8Array()


// const createNFTSaleListing = (client, sender, seller, nftID, price, startTime, endTime) => {
//     if(APPROVAL_PROGRAM.length() === 0){

//         // Possible issue -> Differing client objects

//         var enc = new TextEncoder()

//         const pythonApproval = spawn('python', ['./server/controllers/nft-controller-helpers/fullyCompileApproval.py'])
//         var approval

//         pythonApproval.stdout.on('data', function(data){
//             console.log('Pipe data from python script')
//             approval = enc.encode(data.toString())
//         })
    
//         pythonApproval.stderr.on('data', function(data){
//             console.log('Error')
//             approval = data.toString()
    
//         })
//         pythonApproval.on('close', (code) => {
//             console.log(`child process close all stdio with code ${code}`);
//             // send data to browser
//             APPROVAL_PROGRAM = approval
//         })

//         const pythonClear = spawn('python', ['./server/controllers/nft-controller-helpers/fullyCompileClear.py'])
//         var clear

//         pythonClear.stdout.on('data', function(data){
//             console.log('Pipe data from python script')
//             clear = enc.encode(data.toString())
//         })
    
//         pythonClear.stderr.on('data', function(data){
//             console.log('Error')
//             clear = data.toString()
    
//         })
//         pythonClear.on('close', (code) => {
//             console.log(`child process close all stdio with code ${code}`);
//             // send data to browser
//             CLEAR_STATE_PROGRAM = clear
//         })

//     }
// }