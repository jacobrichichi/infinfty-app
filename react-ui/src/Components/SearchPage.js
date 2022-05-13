import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import AuthContext from "../auth";
import WalletContext from '../wallet-connect'

import './SearchPage.css'

function SearchPage(props) {
    const { wallet } = useContext(WalletContext)
    const searchQuery = props.searchValue

    const collections = wallet.exploreAuctions

    return (
        <div id="search-main">
            {typeof collections !== 'undefined' ? collections.map((collection, index) => (
                <div class="search-card loading">
                    <div class="image">
                
                    </div>
                <div class="content">
                    <h4></h4>
                    <div class="description">
                
                    </div>
                </div>
            </div>
            )) : <div></div>}
            
        </div>
    )
}

export default SearchPage;