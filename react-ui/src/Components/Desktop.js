import React from "react"
import Navbar from "./Navbar"
import DesktopMainCard from "./DesktopMainCard"

const Desktop = (props) => {
    return (
        <div>
            <div style = {{paddingLeft: "30px"}}>
                <Navbar/> 
            </div>  
            <DesktopMainCard/>
        </div>
        

    )
}
export default Desktop