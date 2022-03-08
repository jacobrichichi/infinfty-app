import React from "react"


import squid from "./images/squidft.png"
import "./DesktopMainCard.css"

import Grid from '@mui/material/Grid';


const DesktopMainCard = (props) => {
    return (
        <div style = {{paddingTop: "20px"}}>
            <div id = "background"/>

            <div id = "textDiv">
                <Grid container>
                    <Grid item xs = {12}>
                        <div id = "mainText">
                            Customers getting the art they deserve, and artists getting the cash they deserve.
                        </div>
                    </Grid>

                    <Grid item xs = {12}>
                        <div id = "secondaryText">
                            The worlds fastest growing NFT marketplace for the fastest growing cryptocurrency. 
                        </div>
                    </Grid>

                    
                </Grid>
            </div>

            <div id = "previewCard">
                <img src = {squid} id = "squid">
                </img>

            </div>
        </div>

    )
}
export default DesktopMainCard
