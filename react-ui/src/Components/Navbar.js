import React, { useContext, useState } from 'react';

import logo from "./images/logo.png"
import wallet from "./images/connectwallet.png"
import searchBarIcon from "./images/searchBarIcon.png"

import accountImg from "./images/accountImg.png"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

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
  
  // open State to close RegisterLoginModal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loggedIn, setLoggedIn] = useState(false);
  // handleLogin -> setLoggedIn -> open State close RegisterLoginModal for to refresh navbar
  // ^ Purpose of loggedIn State is trivial
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

  const handleLogout = () => {
    wallet.disconnectWallet()
    auth.logoutUser();
    wallet.doneLoggingOut();
  }

  var accountInfo = (
    <div id = "userText" className = "navLink" onClick={handleOpen}>
      Login
    </div> 
  )

  var accountMenu = ""

  if(auth.loggedIn && auth.twoFactorPass){
    const localWallet = localStorage.getItem("wallet")
    if(auth.user.hasWallet && !wallet.isWallet && !wallet.disconnecting && localWallet !== null){

      // repeatedly reconnecting wallet when there is no
      console.log('Reconnecting wallet')
      wallet.reconnectWallet()
    }
    if(!auth.user.hasWallet && wallet.isWallet){
      console.log('Refreshing User info')
      auth.refreshUser();
    }
    // console.log('Refreshing login')
    // console.log(auth.user)
    // console.log(wallet)

    accountInfo = (
      <div id = "userText" onClick = {handleClick}>
        Hello {auth.user.firstName}
      </div>
    )

    accountMenu = (
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={openMenu}
        onClose={handleMenuClose}
        onClick={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}><Link to='/account'>Account Settings</Link></MenuItem>
        <MenuItem onClick = {handleLogout}>Logout</MenuItem> 
      </Menu>
    )
  }

  var loginModal = ""

  if(open){
    // open State to close RegisterLoginModal
    loginModal = <RegisterLoginModal open = {open} handleClose = {handleClose} handleLogin = {handleLogin}/>
  }

  let navigate = useNavigate();
  var walletconnect = () => {
    if(auth.loggedIn && (auth.user.hasWallet)){
      return(
        <Grid item xs = {2} className = "textContainer" id = "conTextContainer">
            <div className = "linkText navLink" id = "conLinkText" onClick = {() => {navigate(`/create`)}}>
              Create
            </div>
        </Grid>
      )
    }
    return(
        <Grid item xs = {2} className = "textContainer" id = "conTextContainer">
            <div className = "linkText navLink" id = "conLinkText" onClick = {handleWalletOpen}>
              Connect
            </div>
        </Grid>
      )
  };

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

        {walletconnect()}
        
        
        <Grid item xs = {3} id = "userTextContainer">
          {accountInfo}
        </Grid>

        

        {loginModal}
        {accountMenu}
    </Grid>
    </div>
  )
}

export default Navbar