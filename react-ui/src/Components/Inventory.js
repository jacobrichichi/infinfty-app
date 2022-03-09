import React from "react";
import Navbar from "./Navbar";
import Gridding from "./Gridding";
import './General.css'

function Inventory(){
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
            <div style = {{paddingLeft: "30px"}}/>
            <Navbar/>
            <h1 style={{textAlign: 'center'}}>
                Your Inventory
            </h1>
            <Gridding nftitems={testingjson} />
        </div>
    );
}

export default Inventory