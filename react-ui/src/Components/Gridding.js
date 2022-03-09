import React from "react";
import Grid from '@mui/material/Grid';
import depp from "./images/depp.png"

function Gridding(props){
    // xs (phones), sm (tablets), md (desktops), and lg (larger desktops)
    // Column widths are integer values between 1 and 12
    return (
        <div>
            <Grid container spacing={6}>
                {props.nftitems.map(({nftname, nftcost}) => (
                    <Grid item xs={12} sm={4}>
                        <img src = {depp} alt = ""></img>
                        <p>{nftname}</p>
                        <p>{nftcost}</p>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Gridding;