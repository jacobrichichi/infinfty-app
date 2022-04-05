import React from 'react'
import DisplayNFT from "./DisplayNFT"
import DescripNFT from "./DescripNFT"

const ViewNFT = (props) => {

    return(
        <div id = "viewNFT" style = {{paddingTop: "20px"}}>
            <DisplayNFT/>
            <DescripNFT/>
        </div>
    )
}

export default ViewNFT;