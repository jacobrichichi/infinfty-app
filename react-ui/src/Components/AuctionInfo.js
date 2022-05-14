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
        const formData = new FormData(event.currentTarget);
        wallet.placeBid(formData.get('offer'));
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

    let bidOrEndDiv = 
        <Box component="form" onSubmit = {handlePlaceBid} noValidate sx={{ mt: 1 }}>
            <h2>Make Offer</h2>
            <TextField variant="filled" margin="normal" fullWidth id="offer" label="Offer" name="offer"
            />
            <Button type="submit" fullWidth variant="contained" sx={{bgcolor: "#CE4257", color: "white", mt: 3, mb: 2 }}>
                Save
            </Button>
            <Button color="secondary" fullWidth variant="contained" sx={{bgcolor: "#CE4257", color: "white", mb: 3 }}>
                Place Bid
            </Button>
        </Box>

    if(wallet.accounts === auction.state.seller){
        bidOrEndDiv = <Box sx={{ mt: 1 }}>
                        <h2>Your Auction's Details</h2>
                        <Button type="submit" fullWidth variant="contained" sx={{bgcolor: "#CE4257", color: "white", mt: 3, mb: 2 }}>
                            End Auction
                        </Button>
                    </Box>
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
                            <h2>{auction.description}</h2>
                        </div>
                    </Grid>
                </Grid>
            </Grid>

            <Grid  id = "options-container" item xs={6} >  
                <Grid container>
                    <Grid item>
                        {bidOrEndDiv}
                        <Divider style={{width:'100%'}} />
                        <h2>Highest Offer</h2>
                        {auction.state.bid_amount/1000000} Algos
                        <Divider style={{width:'100%'}} />
                        <h2>End Time:</h2>
                        {new Date(auction.state.end * 1000).toLocaleString()}
                    </Grid>
                </Grid>         
            </Grid>
        </Grid>
    )
}

export default AuctionInfo;


