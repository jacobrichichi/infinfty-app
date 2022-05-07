import React, { useContext } from 'react'
import "./CollectionCard.css"
import { Link } from 'react-router-dom'
import WalletContext from '../../wallet-connect'


const CollectionCard = (props) => {

    const { wallet } = useContext(WalletContext)

    const title = props.data.state.nftName;
    const imageLocation = props.data.state.nftURL;
    let description = props.data.state.description;
    if(title === 'Cow Getting Abducted'){
        description += 'ifgugvbjkasbnl swhflksanvjkls slafhklsvb a uslafkshlic'
    }
    console.log(props.data.state)

    const goToAuction = (event) => {
        wallet.goToAuction(props.data)
    }

    return (
            <div id = "collectionContainer" onClick = {goToAuction}>
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