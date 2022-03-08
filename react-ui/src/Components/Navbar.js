import React from "react"

import logo from "./images/logo.png"
import searchBarIcon from "./images/searchBarIcon.png"
import accountImg from "./images/accountImg.png"

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import "./Navbar.css"


const Navbar = (props) => {
  return (
    <Grid container columns = {24} spacing = {1} id = "navBarContainer">
        <Grid item xs = {4} id = "logoContainer">
            <img src = {logo} id = "logo" />
            
        </Grid>
        <Grid item xs = {10} id = "searchContainer">
            <TextField placeHolder = "Search for items here"  id = "searchBar"/>
            
        </Grid>

        <Grid item xs = {2} className = "textContainer" id = "expTextContainer">
            <div className = "linkText" id = "expLinkText">
              Explore
            </div>
            
        </Grid>

        <Grid item xs = {3} className = "textContainer" id = "invTextContainer">
            <div className = "linkText" id = "invLinkText">
              Inventory
            </div>
            
        </Grid>

        <Grid item xs = {2} className = "textContainer" id = "conTextContainer">
            <div className = "linkText" id = "conLinkText">
              Connect
            </div>
            
        </Grid>
        <Grid item xs = {3} id = "userTextContainer">
            <div id = "userText">
              Hi, Username
            </div>
        </Grid>



    

    </Grid>
  )
}
export default Navbar