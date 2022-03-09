import React from "react";
import Navbar from "./Navbar";
import Gridding from "./Gridding";
import './General.css';

function Explore(){
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
            <div style = {{paddingLeft: "30px"}}>
                <Navbar/>
            </div>
            <h1 style={{textAlign: 'center'}}>
                Find Your NFT
            </h1>
            <Gridding nftitems={testingjson} />
        </div>
    );
}

export default Explore;