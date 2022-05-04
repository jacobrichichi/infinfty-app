import React, { useContext, useState } from 'react';
import {useDropzone} from 'react-dropzone'
import axios from 'axios';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormGroup from '@mui/material/FormGroup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';


import hspack from '../images/hspack.png'
import WalletContext from '../../wallet-connect'
import { TextField } from '@mui/material';


function CreateSell(){
    const { wallet } = useContext(WalletContext)

    const [files, setFiles]= useState([]);
    const [sellingtype, setSellingType]= useState(' ');
    const [price, setPrice]= useState(0);
    const [days, setDays]= useState(0);

    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*, video/*, audio/*',
        onDrop: (acceptedFiles) => {
            // doesn't append
            setFiles(
                acceptedFiles.map( (file) => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
            );
            console.log(files);
        }
    });

    const images = files.map( (file) => (
        <div key={file.name}>
            <div>
                <img src={file.preview} style={{width: '100%'}} alt='preview'/>
            </div>
        </div>
    ));

    let navigate = useNavigate();
    // On file upload (click the upload button)
	const onFileUpload = (e) => {
        e.preventDefault();
        console.log('pressed submit');

        const formData = new FormData(e.currentTarget)

        // Will have to add parameters for price, sellingtype, price, days
        wallet.createNft(files[0], formData.get('nftName'), 'An NFT that is the first made through this website')
        
        //let path = `/inventory`; 
        //navigate(path);
	};

    const changeRadioButton = (e) => {
        var val=e.target.value;
        setSellingType(val);
        console.log(val);
    }

    const changePrice = (e) => {
        var val=e.target.value;
        setPrice(val);
        console.log(val);
    }

    const changeDuration = (e) => {
        var val=e.target.value;
        setDays(val);
        console.log(val);
    }

    return(
        <div>
            <h1 style={{padding: '1%'}}>Create Your NFT</h1>
            <form id='form'>
                <div style={{width: '50%', float: 'left'}}>
                    <Box component="form" noValidate onSubmit={onFileUpload} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="nftName"
                            label="NFT Name"
                            name="nftName"
                            autoComplete=""
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size = 'small'
                            sx={{ mt: 3, mb: 2 }}>
                                Create
                        </Button>
                    </Box>
                </div>
                <div id='preview-nft' style={{width: '50%', float: 'right'}}>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} id='fileupload'/>
                        <label htmlFor='fileupload' style={{padding: '50px'}}>Drop your NFT here</label>
                    </div>
                    <div>
                        {images}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateSell;