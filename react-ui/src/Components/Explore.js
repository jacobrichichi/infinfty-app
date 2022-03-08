import React from "react";
import Navbar from "./Navbar";
import Gridding from "./Gridding";
import './General.css';

function Explore(){
    // var nftitems is some json object from backend, backend gets from database
    const testingjson=[
        {
            'nftname' : 'shakesppeer',
            'nftcost' : 'monnue'
        },{
            'nftname' : 'somemoremoney',
            'nftcost' : 'unnn moneerroo'
        },{
            'nftname' : 'dooodooo',
            'nftcost' : 'vrooom'
        },{
            'nftname' : 'im in me mums car',
            'nftcost' : 'get out me car'
        },{
            'nftname' : 'gas money up',
            'nftcost' : 'morebrokeness'
        },
    ]
    return (
        <div>
            <div style = {{paddingLeft: "30px"}}></div>
            <Navbar/>
            <h1 style={{textAlign: 'center'}}>
                Find Your NFT
            </h1>
            <Gridding nftitems={testingjson} />
        </div>
    );
}

export default Explore;