import React from 'react'
import "./CarouselTwoCard.css"
import Stack from '@mui/material/Stack'

const CarouselTwoCard = (props) => {

    const title = props.data.state.nftName;
    const imageLocation = props.data.state.nftURL;
    const description = props.data.state.description;
    
    return (
        // <div id = "carTwoCardContainer">

        <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={1.5}
        >
            <img id = "carTwoImg" src = {imageLocation}/>
            <div id = "carTwoTitle">
                <b>{title}</b>
            </div>
            <div id = "carTwoDesc">
                <span>{description}</span>
            </div>  
        </Stack>
           
            
    )
}


export default CarouselTwoCard