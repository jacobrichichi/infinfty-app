import React, { useContext, useState } from 'react'
import './SellAuctionNFT.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';

import WalletContext from '../../wallet-connect'

const SellAuctionNFT = (props) => {
    const { wallet } = useContext(WalletContext)

    const [ isAuction, setIsAuction ] = useState(false)

    const handleSubmit = (event) => {

    }

    const handleSwitch = (event) => {
        setIsAuction(!isAuction)
    }

    // Straight selling NFT
    var heading = "List Your NFT"
    var headingColor = "#000000"
    var switchLabel = "Sell"

    var inputFields = 
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                autoComplete="100"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="duration"
                label="Duration"
                id="duration"
                autoComplete="5"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Complete Listing
            </Button>
        </Box>   

    if(isAuction){
        heading = "Auction Your NFT"
        headingColor = "#C5A63B"
        switchLabel = "Auction"

        inputFields =
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="startPrice"
                    label="Start Price"
                    name="startPrice"
                    autoComplete="10"
                    autoFocus
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="reserve"
                    label="Reserve"
                    id="reserve"
                    autoComplete="10"
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="duration"
                    label="Duration"
                    id="duration"
                    autoComplete="5"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Complete Listing
                </Button>
            </Box>   
    }

    var nftCard = <div>Loading...</div>

    if(wallet.currentNFT !== null){
        nftCard = <div id = "saNFTCard">
                    <div id = "saNFTImgCont">
                        <img src = {wallet.currentNFT.url} id = "saNFTImg"/>
                    </div>
                    <div id = "saNFTTitleCont">
                            <b>{wallet.currentNFT.name}</b>
                    </div>
                    <div id = "saNFTAmountCont">
                        <span>Amount: {wallet.currentNFT.amount} NFT's</span>
                    </div>
                </div>
    }

    return(
        <div id = "saMainCont">
            <div id = "saHeadingCont">
                <div style = {{color: headingColor}}>
                    {heading}
                </div>

                <Switch checked = {isAuction} onChange = { handleSwitch } label = "Switch"/>
            </div>

            <div id = "saBodyCont">
                <div id = "saTextInputCont">
                    <hr></hr>
                    {inputFields}
                </div>

                <div id = "saNFTCardCont">
                    {nftCard}
                </div>

            </div>

        </div>
    )
}

export default SellAuctionNFT