import React from "react";
import Navbar from "./Navbar";
import Gridding from "./Gridding";
import './General.css'

function Inventory(){
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
            <div style = {{paddingLeft: "30px"}}>
                <Navbar/>
            </div>
            <h1 style={{textAlign: 'center'}}>
                Your Inventory
            </h1>
            <Gridding nftitems={testingjson} />
        </div>
    );
}

export default Inventory