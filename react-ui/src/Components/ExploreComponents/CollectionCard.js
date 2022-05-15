import React, { useContext } from 'react'
import "./CollectionCard.css"
import { Link } from 'react-router-dom'
import WalletContext from '../../wallet-connect'
import Stack from '@mui/material/Stack';


const CollectionCard = (props) => {

    const { wallet } = useContext(WalletContext)

    const title = props.data.state.nftName;
    const imageLocation = props.data.state.nftURL;
    let description = props.data.description;
    if(title === 'Cow Getting Abducted'){
        description += 'ifgugvbjkasbnl swhflksanvjkls slafhklsvb a uslafkshlic'
    }
    console.log(props.data.state)

    const goToAuction = (event) => {
        wallet.goToAuction(props.data)
    }

    return (
            <div id = "collectionContainer" onClick = {goToAuction}>
                <Stack direction="column"   pb = {4} justifyContent="space-evenly"  alignItems="center" spacing={2}>
                    <div id = "collImgCont">
                        <img id = "nftImage" src = {imageLocation} />
                    </div>
                    <div id = "collTitleCont">
                            <b>{title}</b>
                    </div>
                    <div id = "collDescCont">
                        <span>{description}</span>
                    </div>
                </Stack>
            </div>
    )
}

export default CollectionCard