import React, { useEffect, useContext } from "react";
import Navbar from "./Navbar";
import Gridding from "./Gridding";
import './General.css'

import WalletContext from '../wallet-connect'

function Inventory(){

    const { wallet } = useContext(WalletContext)

    useEffect(() => {
        wallet.getInventory()
    }, []);

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



    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                Your Inventory
            </h1>
            <Gridding nftitems={wallet.inventory_assets} />
        </div>
    );
}

export default Inventory