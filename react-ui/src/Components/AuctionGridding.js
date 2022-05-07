import React, {useContext, useEffect, useState} from "react";
import Alert from '@mui/material/Alert'
import { Button } from "@mui/material";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import "./AuctionGridding.css"
import WalletContext from '../wallet-connect'

function AuctionGridding(props){
    const { wallet } = useContext(WalletContext)
    const [ isConfirmEndModalOpen, setIsConfirmEndModalOpen ] = useState(false)

    const auctions = props.auctions 

    if(wallet.inventory_assets[0] === 'a'){
        wallet.getInventory()
    }

    

    const handleCloseConfirmEndModal = (event) => {
        setIsConfirmEndModalOpen(false)
    }

    const handleEnd = (auction) => {
        console.log(auction)
        wallet.setCurrentAuctionNoID(auction)
        setIsConfirmEndModalOpen(true)
    }

    const handleConfirmEnd = (event) => {
        event.stopPropagation()
        console.log('confirm end')
        wallet.endAuction()
        setIsConfirmEndModalOpen(false)
    }
    
    let confirmEndModal = <Modal
                            open = {isConfirmEndModalOpen}
                            onClose={handleCloseConfirmEndModal}
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
                                <Alert severity="warning">Are you sure you would like to end this auction?</Alert>
                                <Button variant="outlined" onClick = {handleConfirmEnd}>Yes</Button>
                            </Box>
                        </Modal>

    
    // xs (phones), sm (tablets), md (desktops), and lg (larger desktops)
    // Column widths are integer values between 1 and 12
    return (
       <div id = "griddingContainer">
        {confirmEndModal}
        {auctions.map((auction) => (
           <div id = "gridCell">
               <div id = "nftImgCont">
                   <img src = {auction.state.nftURL} alt = "" id = "nftImg"></img>
               </div>
               <div id = "nftNameCont">
                   <p>{auction.state.nftName}</p>
               </div>

               <div id = "nftBidCont">
                    <p>Top Bid: {auction.state.bid_amount === 0 ? "No Bid" : (auction.state.bid_amount / 1000000 + " Algos")}</p>
               </div>
               <div id = "nftEndCont">
                    <p>End's at: {new Date(auction.state.end * 1000).toLocaleString()}</p>
               </div>
               <div id = "endAuctionCont">
                   <Button onClick = {() => handleEnd(auction)}>
                       End
                   </Button>
               </div>

           </div>
        ))}

        
    </div>
    )
}

export default AuctionGridding;