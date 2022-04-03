const algosdk = require("algosdk")
const {spawn} = require('child_process');
//import { fullyCompileContract } from './utils'
//import { approval_program, clear_state_program } from './contracts'

var APPROVAL_PROGRAM = new Uint8Array()
var CLEAR_STATE_PROGRAM = new Uint8Array()


const createNFTSaleListing = (client, sender, seller, nftID, price, startTime, endTime) => {
    if(APPROVAL_PROGRAM.length() === 0){
        const python = spawn('python', ['fullyCompileContract.py'])

        //APPROVAL_PROGRAM = fullyCompileContract(client, approval_program)
        //CLEAR_STATE_PROGRAM = fullyCompileContract(client, clear_state_program)
    }
}