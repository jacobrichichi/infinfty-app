import React, {useContext, useEffect} from "react";
import Grid from '@mui/material/Grid';
import depp from "./images/depp.png"
import "./AuctionGridding.css"
import { Button } from "@mui/material";

import WalletContext from '../wallet-connect'

function AuctionGridding(props){
    const { wallet } = useContext(WalletContext)

    const auctions = props.auctions 

    if(wallet.inventory_assets[0] === 'a'){
        wallet.getInventory()
    }

    const handleSell = (url, name, amount, id) => {
        wallet.setCurrentNFT(url, name, amount, id)
    }
    
    // xs (phones), sm (tablets), md (desktops), and lg (larger desktops)
    // Column widths are integer values between 1 and 12
    return (
       <div id = "griddingContainer">
        {auctions.map((auction) => (
           <div id = "gridCell">
               <div id = "nftImgCont">
                   <img src = {auction.state.nftURL} alt = "" id = "nftImg"></img>
               </div>
               <div id = "nftNameCont">
                   <p>{auction.state.nftName}</p>
               </div>

               <div id = "nftBidCont">
                    <p>Top Bid: {auction.state.bid_amount === 0 ? "None" : auction.state.bid_amount}</p>
               </div>
               <div id = "nftEndCont">
                    <p>End's at: {auction.state.end}</p>
               </div>

           </div>
        ))}
    </div>
    )
}

export default AuctionGridding;