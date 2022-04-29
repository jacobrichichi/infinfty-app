import React, { useContext } from "react"
import "./ExploreCategories.css"
import CategoryCard from "./CategoryCard"
import WalletContext from '../../wallet-connect'

function ExploreCategories(){

    const { wallet } = useContext(WalletContext)

    // The data in this array will soon be data derived from hooks state data, which is retreived from the database
    const categoryData = [
        {
            "categoryTitle": "In Game NFTs",
            "collections": wallet.exploreAuctions
        },

        {
            "categoryTitle": "Hot Loot Boxes and Card Packs",
            "collections": wallet.exploreAuctions

        }
    ]

    var categoryComponents = 
    <div id = "categoryComponents">
        {categoryData.map((category, index) => (
            <CategoryCard data = {category}/>
        ))}
    </div>

    return (
        <div id = "mainContainer">
                <div id = "titleTextContainer">
                    <span id = "titleText">
                        Explore Our Collections!
                    </span>
                </div>

            {categoryComponents}
        </div>
    )
}

export default ExploreCategories;