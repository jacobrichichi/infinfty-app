import React from "react"
import "./ExploreCategories.css"
import CategoryCard from "./CategoryCard"


function ExploreCategories(){

    // The data in this array will soon be data derived from hooks state data, which is retreived from the database
    const categoryData = [
        {
            "categoryTitle": "In Game NFTs",
            "collections": [
                {
                    "collectionTitle": "World of Warcraft",
                    "description": 'This is super cool game with super cool items!!!!',
                    "image": "wow.png"
                },
                {
                    "collectionTitle": "Gods Unchained",
                    "description": 'This is super cool game with super cool items!!!!',
                    "image": "gu.png"
                },
                {
                    "collectionTitle": "Axie Infinity",
                    "description": 'This is super cool game with super cool items!!!!',
                    "image": "axie.png"
                }
            ]

        },
        {
            "categoryTitle": "Hot Loot Boxes and Card Packs",
            "collections": [
                {
                    "collectionTitle": "HearthStone Packs",
                    "description": 'This is super cool pack with super cool items!!!!',
                    "image": "hspack.png"
                },
                {
                    "collectionTitle": "G.U. Packs",
                    "description": 'This is super cool pack with super cool items!!!!',
                    "image": "gupack.png"
                },
                {
                    "collectionTitle": "CSGO NFT Case",
                    "description": 'This is super cool case with super cool items!!!!',
                    "image": "csgocase.png"
                }
            ]

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