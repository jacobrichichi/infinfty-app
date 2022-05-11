import React, {useContext, useEffect} from "react";
import Grid from '@mui/material/Grid';
import depp from "./images/depp.png"
import "./Gridding.css"
import { Button } from "@mui/material";

import WalletContext from '../wallet-connect'

function Gridding(props){
    const { wallet } = useContext(WalletContext)

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
        {props.nftitems.map(({url, name, amount, id}) => (
           <div id = "gridCell" key={name}>
               <div id = "nftImgCont">
                   <img src = {url} alt = "" id = "nftImg"></img>
               </div>
               <div id = "nftNameCont">
                   <p>{name}</p>
               </div>
               <div id = "nftSupplyCont">
                   <p>Supply: {amount}</p>
               </div>

               <div id = "sellButtonCont">
                   <Button onClick = {() => handleSell(url, name, amount, id)}>
                       Sell
                   </Button>
               </div>
           </div>
        ))}
    </div>
    )
}

export default Gridding;