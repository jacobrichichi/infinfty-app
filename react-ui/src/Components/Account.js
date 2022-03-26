import React from "react";
import Navbar from "./Navbar";
import Gridding from "./Gridding";
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

import './General.css';
import './Account.css';

import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Card, Grid } from "@mui/material";


function Account() {
    return (
        <div id="container">
            <ProSidebar id = "sidebar">
                <Menu iconShape="square">
                    <MenuItem>Account</MenuItem>
                        <SubMenu title="Wallets">
                            <MenuItem>Wallet</MenuItem>
                            <MenuItem>Wallet</MenuItem>
                        </SubMenu>
                    <MenuItem>NFT
                    <Link to="/"></Link></MenuItem>
                </Menu>
            </ProSidebar>  

            <Container fixed id="main"> 
                <h1>ACCOUNT</h1>
                <Box sx={{
                    mt: 2,
                    width: 300,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <h2>Profile</h2>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="fname"
                        autoComplete="First Name"
                        autoFocus>
                    </TextField>

                    <TextField 
                        margin="normal"
                        fullWidth
                        id="lastname"
                        label="Last Name"
                        name="lname"
                        autoComplete="Last Name"
                        autoFocus>
                    </TextField>

                    <TextField 
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="Email"
                        autoFocus>
                    </TextField>
                    <Button variant="contained" sx = {{bgcolor: "#CE4257", color: "white",  mt: 3, mb: 3 }}>
                            Submit Changes
                    </Button>
                </Box>

                <Divider/>

                <Box sx={{
                    mt: 2,
                    width: 300,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <h2>Change Password</h2>
                    <TextField 
                            margin="normal"
                            fullWidth
                            id="oldPassword"
                            label="Password"
                            name="Password"
                            autoComplete="********"
                            autoFocus>
                    </TextField>
                    <TextField 
                            margin="normal"
                            fullWidth
                            id="newPassword"
                            label="New Password"
                            name="New Password"
                            autoComplete="********"
                            autoFocus>
                    </TextField>
                    <Button variant="contained" sx = {{bgcolor: "#CE4257", color: "white",  mt: 3, mb: 3 }}>
                            Submit Changes
                    </Button>
                </Box>
            </Container>
        </div>
    );
}

export default Account;