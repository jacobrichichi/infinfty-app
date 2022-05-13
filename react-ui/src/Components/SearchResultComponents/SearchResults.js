import React, { useContext } from "react"
import WalletContext from '../../wallet-connect'
import './SearchResults.css'

const SearchResults = (props) => {
    const { wallet } = useContext(WalletContext)

    const results = wallet.searchResults

    return (
        <div id ="searchMainCont">
            <h1 style={{textAlign: 'center', color:' #DA762F'}}>
                Results
            </h1>
            <div id = "searchResultContainer">
            {results.map((auction) => (
            <div id = "searchGridCell">
                <div id = "searchNftImgCont">
                    <img src = {auction.state.nftURL} alt = "" id = "nftImg"></img>
                </div>
                <div id = "searchNftNameCont">
                    <p>{auction.state.nftName}</p>
                </div>

                <div id = "searchNftBidCont">
                        <p>Top Bid: {auction.state.bid_amount === 0 ? "No Bid" : (auction.state.bid_amount / 1000000 + " Algos")}</p>
                </div>
                <div id = "searchNftEndCont">
                        <p>End's at: {new Date(auction.state.end * 1000).toLocaleString()}</p>
                </div>
            </div>
            ))}

            
        </div>
    </div>
    )
}
export default SearchResults;