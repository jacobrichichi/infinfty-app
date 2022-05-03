import React, { useContext } from "react"
import DesktopMainCard from "./DesktopMainCard"
import AlgoRundownCard from "./AlgoRundownCard"
import ExploreCarouselTwo from "./CarouselTwoComponents/ExploreCarouselTwo"
import WalletContext from '../../wallet-connect'

const Desktop = (props) => {
    const { wallet } = useContext(WalletContext)

   // if(wallet.exploreAuctions === []){
   //     wallet.getExploreAuctions()
   // }

    const carouselOneDataNew = {
        "carouselTitle": "Trending Auctions",
        "collections": wallet.exploreAuctions
    }

    const carouselTwoDataNew = {
        "carouselTitle": "Trending Auctions",
        "collections": wallet.exploreAuctions
    }

    return (
        <div>
            <DesktopMainCard/>
            <ExploreCarouselTwo data = {carouselOneDataNew}/>
            <AlgoRundownCard/>
            <ExploreCarouselTwo data = {carouselTwoDataNew}/>
            

        </div>
        

    )
}
export default Desktop