import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import AuthContext from "../auth";

import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Modal from '@mui/material/Modal';
import FormControlLabel from '@mui/material/FormControlLabel';

//ah

import './General.css';
import './Account.css';

import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

function Account() {
    const { auth } = useContext(AuthContext)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log("Success!")
        console.log(formData.get('fname'))
        auth.editUser(
            formData.get('fname'),
            formData.get('lname'),
            formData.get('userName'),
            formData.get('email'),
        )
        handleOpen()

    };

    const handlePassword = (event) => {
        console.log("handlepassword reached")
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        auth.changePassword(
            formData.get('Password'),
            formData.get('New Password'),
        )
    };

    var disableTwoAuth = () => {
        console.log('weeerooo');
    }

    if (!auth.loggedIn) {
        // console.log("Not Logged In")
        return (<div></div>)
    }
    return (

        <div id="container">
            <div id="account-modal">
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4
                }}   >
                    Change Successful
                </Box>
            </Modal>
            </div>
            <ProSidebar id = "sidebar">
                <Menu iconShape="square">
                    <MenuItem>Account</MenuItem>
                        <SubMenu title="Wallets">
                            <MenuItem>Wallet</MenuItem>
                            <MenuItem>Wallet</MenuItem>
                        </SubMenu>
                    <MenuItem>Inventory
                    <Link to="/inventory"></Link></MenuItem>
                </Menu>
            </ProSidebar>  

            <Container fixed id="main"> 
                <h1>ACCOUNT</h1>
                <Box sx={{ mt: 2, width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                    component="form" onSubmit={handleSubmit}>
                    <h2>Profile</h2>
                    <TextField margin="normal" fullWidth id="firstName" label="First Name" name="fname" autoComplete="First Name"
                        defaultValue={auth.user.firstName} >
                    </TextField>
                    <TextField margin="normal" fullWidth id="lastname" label="Last Name" name="lname" autoComplete="Last Name" 
                        defaultValue={auth.user.lastName} >
                    </TextField>
                    <TextField margin="normal" fullWidth id="userName" label="User Name" name="userName" autoComplete="User Name" 
                        defaultValue={auth.user.userName} >
                    </TextField>
                    <TextField margin="normal" fullWidth id="email" label="Email" name="email" autoComplete="Email"
                        defaultValue={auth.user.email} >
                    </TextField>

                    <Button variant="contained" sx = {{bgcolor: "#CE4257", color: "white",  mt: 3, mb: 3 }} type="submit">
                            Submit Changes
                    </Button>
                </Box>

                <Divider/>
                
                <Box sx={{ mt: 2, width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center'}} 
                    component="form" onSubmit={handlePassword}>
                    <h2>Change Password</h2>
                    <TextField type="password" margin="normal" fullWidth id="oldPassword" label="Password" name="Password" autoComplete="********"
                        >
                    </TextField>
                    <TextField type="password" variant="filled" margin="normal" fullWidth id="newPassword" label="New Password" name="New Password" autoComplete="********"
                        >
                    </TextField>
                    <Button variant="contained" sx = {{bgcolor: "#CE4257", color: "white",  mt: 3, mb: 3 }} type="submit">
                            Submit Changes
                    </Button>
                </Box>

                <Link to = "/twofactorsetup">
                <Button color="success" variant="contained" sx={{ mt: 3, mb: 2 }}>
                        <div className = "linkText" id = "expLinkText">
                            Enable 2 Factor
                        </div>
                    </Button>
                </Link>

                <Button color="secondary" variant="contained" sx={{mb: 4 }} onClick = {disableTwoAuth}>
                    <div className = "linkText" id = "expLinkText">
                        Disable 2 Factor
                    </div>
                </Button>
                
            </Container>
            <br></br>
            <br></br>
        </div>
    );
}

export default Account;