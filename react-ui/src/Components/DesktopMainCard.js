import React from "react"
import squid from "./images/squidft.png"
import axie from "./images/axie_pack.png"
import sara from "./images/sarafranimage.jpg"
import "./DesktopMainCard.css"
import Grid from '@mui/material/Grid';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


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
                <Carousel showArrows={false} showIndicators = {false} showStatus = {false} showThumbs = {false} infiniteLoop = "true" autoPlay = {true} interval = {3000}>
                    <div>
                        <img src = {squid} id = "cardImage"/>
                        <div id = "cardTextContainer">
                            <div id = "cardTitleText">
                                Squidwardo
                            </div>
                            <div id = "cardDescriptionText">
                                This is a hot ticket item, tops of the tops!
                            </div>
                        </div>
                    
                    </div>

                    <div>
                        <img src = {sara} id = "cardImage"/>
                        <div id = "cardTextContainer">
                            <div id = "cardTitleText">
                                3LADIES
                            </div>
                            <div id = "cardDescriptionText">
                                Sara Franzese is an Italian post-modern artist with a keen eye for 
                                capturing the fine details and contours of the human figure.
                                Take a look at her latest piece here
                            </div>
                        </div>
                    
                    </div>

                    <div>
                        <img src = {axie} id = "cardImage"/>
                        <div id = "cardTextContainer">
                            <div id = "cardTitleText">
                                Axie Infinity
                            </div>
                            <div id = "cardDescriptionText">
                                Only the hottest NFT video game!
                            </div>
                        </div>
                    
                    </div>

                    
                </Carousel>


            </div>
        </div>

    )
}
export default DesktopMainCard
