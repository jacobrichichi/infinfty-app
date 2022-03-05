import React from "react"
import Navbar from "./Navbar"

import logo from "./images/logo.png"
import searchBarIcon from "./images/searchBarIcon.png"
import accountImg from "./images/accountImg.png"
import advertisement from "./images/advertBg.png"
import ecoFrndlyIcon1 from "./images/ecoFrndlyIcon1.png"
import fastIcon1 from "./images/fastIcon1.png"
import secureIcon21 from "./images/secureIcon21.png"

import Grid from '@mui/material/Grid';

const Desktop = (props) => {
    return (
        <Grid container spacing = {1}>
        <Grid item xs = {2}>
            <img src = {logo}/>
            
        </Grid>
        

    </Grid>

    )
}
export default Desktop