import React, { useEffect, useContext, useState } from "react";
import Gridding from "./Gridding";
import AuctionGridding from "./AuctionGridding";
import './General.css'
import "./Inventory.css"
import AuthContext from '../auth'


import WalletContext from '../wallet-connect'

function Inventory(){

    const { wallet } = useContext(WalletContext)
    const { auth } = useContext(AuthContext)
    const [ isWallet, setIsWallet ] = useState(false)

    // var nftitems is some json object from backend, backend gets from database
    const testingjson=[
        {
            'nftname' : 'Johnny Depp',
            'nftcost' : '100 Algos'
        },{
            'nftname' : 'Johnny Depp',
            'nftcost' : '100 Algos'
        },{
            'nftname' : 'Johnny Depp',
            'nftcost' : '100 Algos'
        },{
            'nftname' : 'Johnny Depp',
            'nftcost' : '100 Algos'
        },{
            'nftname' : 'Johnny Depp',
            'nftcost' : '100 Algos'
        },
    ]


    const noWalletDiv = <div id = "noWalletDiv">
                            You don't yet have a wallet connected!
                        </div>



    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                Your Inventory
            </h1>
            { auth.user !== null && auth.user.hasWallet ? <Gridding nftitems={wallet.inventory_assets} /> : noWalletDiv}
            
            <h1 style={{textAlign: 'center'}}>
                Your Auctions
            </h1>

            { auth.user !== null && auth.user.hasWallet ? <AuctionGridding auctions={wallet.auctions} /> : noWalletDiv}

        </div>
    );
}

export default Inventory