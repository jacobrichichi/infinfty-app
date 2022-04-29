import React from 'react'
import "./CollectionCard.css"
import { Link } from 'react-router-dom'


const CollectionCard = (props) => {

    const title = props.data.state.nftName;
    const imageLocation = props.data.state.nftURL;
    let description = props.data.state.description;
    if(title === 'Cow Getting Abducted'){
        description += 'ifgugvbjkasbnl swhflksanvjkls slafhklsvb a uslafkshlic'
    }
    console.log(props.data.state)

    

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