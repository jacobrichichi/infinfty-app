import React, { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import WalletContext from '../wallet-connect'

import './AuctionInfo.css'

function AuctionInfo(props) {

    const { wallet } = useContext(WalletContext)

    const handlePlaceBid = (event) => {
        event.preventDefault();
        return
    }

    let auction = wallet.currentAuction
    if(auction === null){
        auction = { 
            "state": {
                "nftURL": "https://source.unsplash.com/random/300x500", 
                "nftName": "",
                "description": "",
                "bid_amount": 0,
                "end": 0
        }}
    }



    return(
        <Grid id = "auction-main" container >
            <Grid id = "nft-container" item xs={6}>
                <Grid container>
                    <Grid item xs = {12}>
                        <div>
                            <img id = "nft-image" src={auction.state.nftURL}></img>
                        </div>
                    </Grid>

                    <Grid item xs = {12}>
                        <div id = "nft-description">
                            <h1>{auction.state.nftName}</h1>
                            <h2>{auction.state.description}</h2>
                        </div>
                    </Grid>
                </Grid>
            </Grid>

            <Grid  id = "options-container" item xs={6} >  
                <Grid container>
                    <Grid item>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <h2>Make Offer</h2>
                            <TextField variant="filled" margin="normal" fullWidth id="offer" label="Offer" name="Offer"
                            />
                            <Button type="submit" fullWidth variant="contained" sx={{bgcolor: "#CE4257", color: "white", mt: 3, mb: 2 }}>
                                Save
                            </Button>
                            <Button color="secondary" fullWidth variant="contained" sx={{bgcolor: "#CE4257", color: "white", mb: 3 }}>
                                Place Bid
                            </Button>
                            <Divider style={{width:'100%'}} />
                            <h2>Highest Offer</h2>
                            {auction.state.bid_amount}
                            <Divider style={{width:'100%'}} />
                            <h2>Duration</h2>
                            {auction.state.end}
                        </Box>
                    </Grid>
                </Grid>         
            </Grid>
        </Grid>
    )
}

export default AuctionInfo;


