import React from "react";
import Grid from '@mui/material/Grid';

function Gridding(props){
    // xs (phones), sm (tablets), md (desktops), and lg (larger desktops)
    // Column widths are integer values between 1 and 12
    return (
        <div>
            <Grid container spacing={6}>
                {props.nftitems.map(({nftname, nftcost}) => (
                    <Grid item xs={12} sm={4}>
                        <p>{nftname}</p>
                        <p>{nftcost}</p>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Gridding;