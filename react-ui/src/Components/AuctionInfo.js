import React, { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import './AuctionInfo.css'

function AuctionInfo(props) {

    const handlePlaceBid = (event) => {
        event.preventDefault();
        return

    }
    return(
        <Grid id = "auction-main" container >
            <Grid id = "nft-container" item xs={6}>
                <Grid container>
                    <Grid item xs = {12}>
                        <div id = "nft-image">
                            <img src="https://source.unsplash.com/random/300x500"></img>
                        </div>
                    </Grid>

                    <Grid item xs = {12}>
                        <div id = "nft-description">
                            <h1>NFT Image Title</h1>
                            <h2>Description</h2>
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
                            Placeholder
                            <Divider style={{width:'100%'}} />
                            <h2>Duration</h2>
                            20 hrs 45 mins
                        </Box>
                    </Grid>
                </Grid>         
            </Grid>
        </Grid>
    )
}

export default AuctionInfo;


