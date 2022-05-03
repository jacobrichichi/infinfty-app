import React from 'react'
import './AlgoRundownCard.css'
import eco from "../images/ecoIcon.png"
import fast from "../images/fastIcon.png"
import secure from "../images/secureIcon.png"

const AlgoRundownCard = (props) => {
    return(
        <div id = "rdContainer">
            <div id = "rdTitleCont">
                <b>Why Algorand?</b>
            </div>

            <div id = "rdMain">
                <div className = "rdReason">
                    <div className = "rdImageCont">
                        <img src = {eco} className = "rdImage"/>
                    </div>
                    <div className = "rdReasonHeader">
                        <span>Eco-Friendly</span>
                    </div>
                    <div className = "rdReasonDesc">
                        <span>
                        Algorand’s PoS system means that every transaction committed is carbon neutral, a major difference in comparison to PoW counterparts
                        </span>
                    </div>
                </div>

                <div className = "rdReason">
                    <div className = "rdImageCont">
                        <img src = {fast} className = "rdImage"/>
                    </div>
                    <div className = "rdReasonHeader">
                        <span>Fast Transactions</span>
                    </div>
                    <div className = "rdReasonDesc">
                        <span>
                        The ability to process over 1000 transactions per second,  100x faster then ETH, meaning your buys and sells can be verified within seconds
                        </span>
                    </div>
                </div>

                <div className = "rdReason">
                    <div className = "rdImageCont">
                        <img src = {secure} className = "rdImage"/>
                    </div>
                    <div className = "rdReasonHeader">
                        <span>Secure</span>
                    </div>
                    <div className = "rdReasonDesc">
                        <span>
                            The blockchain technology, created by MIT Professor and Turing Award winner Silvio Micali, was specially crafted to incentivize benevolent transaction processing
                        </span>
                    </div>

                </div>
            </div>

        </div>
    )
}
export default AlgoRundownCard;