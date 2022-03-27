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

const Navbar = (props) => {
  const { wallet } = useContext(WalletContext)
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const handleLogin = () => {setLoggedIn(true); setOpen(false);}


  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const [walletOpen, setWalletOpen] = useState(false);
  
  const handleWalletOpen = () => {
    wallet.walletConnectInit();
  }

  const handleWalletClose = () => {

  }

  let walletPopup = "";

  if(walletOpen){


    walletPopup = 
    <Modal
        open={walletOpen}
        onClose={handleWalletClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style ={{
          maxHeight: "400px", minHeight: "400px", 
          maxWidth: "400px", minWidth: "400px", backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',}}>
          <img src = {wallet} style = {{maxHeight: "400px", maxWidth: "400px"}}></img>
        </div>
        
      </Modal> 
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
            <div className = "linkText " id = "invLinkText">
              Inventory
            </div>
          </Link>
        </Grid>

        <Grid item xs = {2} className = "textContainer" id = "conTextContainer">
            <div className = "linkText navLink" id = "conLinkText" onClick = {handleWalletOpen}>
              Connect
            </div>
        </Grid>

        {walletPopup}
        
        
        <Grid item xs = {3} id = "userTextContainer">
          {open ?
          <>
             <RegisterLoginModal open = {open} handleClose = {handleClose} handleLogin = {handleLogin}/>
          </>  
            :  
            loggedIn
            ?
            <div id = "userText" onClick={handleClick} >
              Hello User
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
            
            :
            <div id = "userText" className = "navLink" onClick={handleOpen}>
              Login
            </div>
            }
        </Grid>
    </Grid>
    </div>
  )
}

export default Navbar