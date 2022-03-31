import React, { useContext, useState } from 'react';

import logo from "./images/logo.png"
import wallet from "./images/connectwallet.png"
import searchBarIcon from "./images/searchBarIcon.png"

import accountImg from "./images/accountImg.png"
import { Link } from 'react-router-dom'

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem';


import "./Navbar.css"

// import IconButton from '@mui/icons-material/IconButton';
import Modal from '@mui/material/Modal';

import RegisterLoginModal from './RegisterLoginModal';
import WalletContext from '../wallet-connect'
import AuthContext from '../auth'

const Navbar = (props) => {
  const { wallet } = useContext(WalletContext)
  const { auth } = useContext(AuthContext)
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const handleLogin = () => {setLoggedIn(true); setOpen(false);}


  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleWalletOpen = () => {
    wallet.walletConnectInit();
  }

  const handleInventory = () => {
    //wallet.getInventory()
  }

  var accountInfo =<div id = "userText" className = "navLink" onClick={handleOpen}>
                    Login
                  </div> 

  if(auth.loggedIn){
    accountInfo = <div id = "userText" onClick={handleClick} >
        Hello {auth.user.firstName}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={openMenu}
          onClose={handleMenuClose}
          onClick={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}><Link to='/account'></Link>Account Settings</MenuItem>
          <MenuItem>Logout</MenuItem> 
        </Menu>
      </div>
  }

  var loginModal = ""

  if(open){
    loginModal = <RegisterLoginModal open = {open} handleClose = {handleClose} handleLogin = {handleLogin}/>
  }

  return (
    <div>
    <Grid container columns = {24} spacing = {1} id = "navBarContainer">
        <Grid item xs = {4} id = "logoContainer">
          <Link to = "/">
            <img src = {logo} id = "logo" />
          </Link>
        </Grid>

        <Grid item xs = {10} id = "searchContainer">
            <TextField id = "searchBar"/>
        </Grid>

        <Grid item xs = {2} className = "textContainer" id = "expTextContainer">
          <Link to = "/explore" className='navLink'>
              <div className = "linkText" id = "expLinkText">
                Explore
              </div>
            </Link>
        </Grid>

        <Grid item xs = {2} className = "textContainer " id = "invTextContainer">
          <Link to = "/inventory" className='navLink'>
              <div className = "linkText " id = "invLinkText" onClick = {handleInventory}>
                Inventory
              </div>
            </Link>
        </Grid>

        <Grid item xs = {2} className = "textContainer" id = "conTextContainer">
            <div className = "linkText navLink" id = "conLinkText" onClick = {handleWalletOpen}>
              Connect
            </div>
        </Grid>
        
        
        <Grid item xs = {3} id = "userTextContainer">
          {accountInfo}
        </Grid>

        {loginModal}
    </Grid>
    </div>
  )
}

export default Navbar