import React from 'react'
import "./CarouselTwoCard.css"

const CarouselTwoCard = (props) => {

    const title = props.data.collectionTitle;
    const imageLocation = require("../../images/" + props.data.image);
    const description = props.data.description;
    
    return (
        <div id = "carTwoCardContainer">
            <div id = "carTwoImg">
                <img src = {imageLocation}/>
            </div>
            <div id = "carTwoTitle">
                <b>{title}</b>
                <br/>
                <div id = "carTwoDesc">
                    <span>{description}</span>
                </div>
            </div>
            
        </div>
    )
}


export default CarouselTwoCard