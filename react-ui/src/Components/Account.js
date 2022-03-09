import React from "react";
import Navbar from "./Navbar";
import Gridding from "./Gridding";
import './General.css';
import './Account.css';

import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Grid } from "@mui/material";


function Account() {
    return (
        <div>
            <Navbar></Navbar>
            <Grid container>

                <Grid item xs = {4}>
                    <ProSidebar>
                        <Menu iconShape="square">
                            <MenuItem>Account</MenuItem>
                                <SubMenu title="Wallets">
                                    <MenuItem>Wallet</MenuItem>
                                    <MenuItem>Wallet</MenuItem>
                                </SubMenu>
                            <MenuItem>NFT</MenuItem>
                        </Menu>
                    </ProSidebar>  
                </Grid>  

                <Grid item xs>
                    <div id="mainPage">
                        <h1>ACCOUNT</h1>
                    </div> 
                </Grid> 

            </Grid>

        </div>
    );
}

export default Account;