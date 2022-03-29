import React from "react";
import Grid from '@mui/material/Grid';
import depp from "./images/depp.png"
import "./Gridding.css"

function Gridding(props){
    // xs (phones), sm (tablets), md (desktops), and lg (larger desktops)
    // Column widths are integer values between 1 and 12
    return (
        <div id = "griddingContainer">
                {props.nftitems.map(({url, name, amount}) => (
                    <div id = "gridCell">
                        <div id = "nftImgCont">
                            <img src = {url} alt = "" id = "nftImg"></img>
                        </div>
                        <div id = "nftNameCont">
                            <p>{name}</p>
                        </div>
                        <div id = "nftSupplyCont">
                            <p>Supply: {amount}</p>
                        </div>
                    </div>
                
                ))}
        </div>
    );
}

export default Gridding;