import React, { useContext, useState } from 'react'
import './SellAuctionNFT.css'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Modal from '@mui/material/Modal';

import WalletContext from '../../wallet-connect'

const SellAuctionNFT = (props) => {
    const { wallet } = useContext(WalletContext)

    const [ isAuction, setIsAuction ] = useState(false)
    const [ error, setError ] = useState("")
    const [modalOpen, setModalOpen] = useState(false);

    const [disable, setDisable] = React.useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if(isAuction){
            const startPrice = formData.get('startPrice')
            const reserve = formData.get('reserve')
            const duration = formData.get('duration')
            const description = formData.get('description')
            
            if(startPrice === "" || reserve === "" || duration === ""){
                setError("All Fields Must Be Filled")
            }

            else{
                setDisable(true)
                setModalOpen(true)
                wallet.auctionNFT(startPrice, reserve, duration, description)
            }
        }
        else{
            const price = formData.get('price')
            const duration = formData.get('duration')

            if(price === "" || duration === ""){
                setError("All Fields Must Be Filled")
            }

            else{
                setDisable(true)
                setModalOpen(true)
                wallet.sellNFT(price, duration)
            }
        }
    }

    const handleSwitch = (event) => {
        setIsAuction(!isAuction)
    }

    const handleCloseModal = (event) => {
        setModalOpen(false)
    }

    let furtherDirectionModal = <Modal
                            open = {modalOpen}
                            onClose={handleCloseModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >   
                            <Box sx = 
                                {{position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: 'background.paper',
                                border: '2px solid #000',
                                boxShadow: 24,
                                p: 4,}}
                                >
                                <Alert severity="warning">Refer to your Pera Algo Wallet in order to sign necessary transactions</Alert>
                                <Button variant="outlined" onClick = {handleCloseModal}>OK</Button>
                            </Box>
                        </Modal>

    // Straight selling NFT
    var heading = "List Your NFT"
    var headingColor = "#000000"
    var switchLabel = "Sell"
    var errorMessage = ""

    var inputFields = 
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                type="number"
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
                type="number"
                autoComplete="5"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={disable}
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
                    type="number"
                    autoFocus
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="reserve"
                    label="Reserve"
                    id="reserve"
                    type="number"
                    autoComplete="10"
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="duration"
                    label="Duration (hours)"
                    id="duration"
                    type="number"
                    autoComplete="5"
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    id="description"
                    autoComplete="5"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={disable}
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
            {furtherDirectionModal}
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
                    {error}
                </div>

                <div id = "saNFTCardCont">
                    {nftCard}
                </div>

            </div>
        </div>
    )
}

export default SellAuctionNFT