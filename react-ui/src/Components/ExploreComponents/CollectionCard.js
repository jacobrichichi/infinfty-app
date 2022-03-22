import React from 'react'
import "./CollectionCard.css"

const CollectionCard = (props) => {

    const title = props.data.collectionTitle;
    console.log(process.env.PUBLIC_URL)
    const imageLocation = require("../images/" + props.data.image);
    const description = props.data.description;

    

    return (
        <div id = "collectionContainer">
            <div id = "collImgCont">
                <img src = {imageLocation}/>
            </div>
            <div id = "collTitleCont">
                <b>{title}</b>
            </div>
            <div id = "collDescCont">
                <span>{description}</span>
            </div>
        </div>
    )
}

export default CollectionCard