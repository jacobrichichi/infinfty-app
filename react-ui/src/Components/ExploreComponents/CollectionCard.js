import React from 'react'
import "./CollectionCard.css"
import { Link } from 'react-router-dom'


const CollectionCard = (props) => {

    const title = props.data.collectionTitle;
    
    console.log(process.env.PUBLIC_URL)
    const imageLocation = require("../images/" + props.data.image);
    const description = props.data.description;

    

    return (
        <Link to = {"/explore/" + title}>
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
        </Link>
    )
}

export default CollectionCard