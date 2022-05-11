import React, {useContext} from 'react'
import "./CarouselTwoCard.css"
import Stack from '@mui/material/Stack'
import WalletContext from '../../../wallet-connect'

const CarouselTwoCard = (props) => {
    const { wallet } = useContext(WalletContext)

    const title = props.data.state.nftName;
    const imageLocation = props.data.state.nftURL;
    const description = props.data.state.description;
    const topBid = props.data.state.bid_amount;
    console.log(props.data.state)
    
    const goToAuction = (event) => {
        wallet.goToAuction(props.data)
    }

    return (
        // <div id = "carTwoCardContainer">

        <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={1.5}
        id = "carTwoCardContainer"
        onClick={goToAuction}
        >
            <img id = "carTwoImg" src = {imageLocation}/>
            <div id = "carTwoTitle">
                <b>{title}</b>
            </div>
            <div id = "carTwoTopBid">
                <span>Top Bid: {topBid / 1000000} Algos</span>
            </div>  
            <div id = "carTwoDesc">
                <span>{description}</span>
            </div>  
        </Stack>
           
            
    )
}


export default CarouselTwoCard