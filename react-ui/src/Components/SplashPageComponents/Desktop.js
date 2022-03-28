import React from "react"
import DesktopMainCard from "./DesktopMainCard"
import AlgoRundownCard from "./AlgoRundownCard"
import ExploreCarouselTwo from "./CarouselTwoComponents/ExploreCarouselTwo"


const Desktop = (props) => {
    const carouselOneData =
        {
            "carouselTitle": "Trending Collections",
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

        }

    const carouselTwoData =  {
        "carouselTitle": "Hot New Drops",
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





    return (
        <div>
            <DesktopMainCard/>
            <ExploreCarouselTwo data = {carouselOneData}/>
            <ExploreCarouselTwo data = {carouselTwoData}/>
            <AlgoRundownCard/>

        </div>
        

    )
}
export default Desktop