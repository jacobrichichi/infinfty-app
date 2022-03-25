import * as React from 'react';

import logo from "./images/logo.png"
import wallet from "./images/connectwallet.png"
import searchBarIcon from "./images/searchBarIcon.png"

import accountImg from "./images/accountImg.png"
import { Link } from 'react-router-dom'

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import "./Navbar.css"

// import IconButton from '@mui/icons-material/IconButton';



import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Navbar = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const handleLogin = () => {setLoggedIn(true); setOpen(false);}

  const [walletOpen, setWalletOpen] = React.useState(false);
  const handleWalletOpen = () => setWalletOpen(true);
  const handleWalletClose = () => setWalletOpen(false);
  

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
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={boxStyle}>
                  <Grid container spacing={2}  direction="column" justifyContent="center" alignItems="center">
                      <Grid item xs = {12}>
                          <div >
                            Login
                          </div>
                      </Grid>
                      <Grid item xs = {12}>
                          <input >
                          </input>
                      </Grid>
                      <Grid item xs = {12}>
                          <div >
                            Password
                          </div>
                      </Grid>
                      <Grid item xs = {12}>
                          <input >
                          </input>
                      </Grid>
                      <Grid item xs = {12}>
                      <Button variant="outlined" onClick={handleLogin} >Login</Button>
                      </Grid>
                  </Grid>
                </Box>
              </Modal>
          </>  
            :  
            loggedIn
            ?
            <div id = "userText" >
              Hello User
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