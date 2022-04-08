import React from 'react'
import test from "../images/test_nft.png"
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { green, purple, blue } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom'

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: "#000000",
    },
  },
});

const DescripNFT = (props) => {

    return(
        <div>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </div>
    )
}

const DisplayNFT = (props) => {

    return(
        <div>
            <img src = {test}/>
        </div>
    )
}

const OwnerNFT = (props) => {
    return(
        <>
        Owned by David Liang
        </>
    )
}

const CollectionNFT = (props) => {
    return(
        <>
        Part of Collection:
        <a href="www.google.com">
        The Dior Gucci NFT Collection
        </a>
        </>
    )
}


const ViewNFT = (props) => {
    const navigate = useNavigate();
    return(
        <div id = "viewNFT" style = {{paddingTop: "20px"}}>
            <Grid container spacing={1}>
                <Grid container justifyContent="flex-end">
                    <ThemeProvider theme={theme}>
                    <Button variant="outlined" color="secondary" onClick={() => {
                        navigate('/edit')
                    }} >Edit</Button>
                    <Button variant="contained" onClick={() => {
                        navigate('/sell')
                    }} color="primary">Sell</Button>
                    </ThemeProvider>
                </Grid>
                <Grid item xs={8}>
                <DisplayNFT/>
                </Grid>
                <Grid item xs={4}>
                <DescripNFT/>
                </Grid>
                <Grid item xs={4}>
                <OwnerNFT/>
                </Grid>
                <Grid item xs={6}>
                <CollectionNFT/>
                </Grid>
                <Grid item xs={2}>
                </Grid>
            </Grid>
        </div>
    )
}

export default ViewNFT;