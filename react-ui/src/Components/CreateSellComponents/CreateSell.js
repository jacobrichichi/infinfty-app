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
import { TextField } from '@mui/material';


import hspack from '../images/hspack.png'
import WalletContext from '../../wallet-connect'


function CreateSell(){
    const { wallet } = useContext(WalletContext)

    const [files, setFiles] = useState([]);
    const [assetName, setAssetname] = useState("An NFT")
    const [assetDesc, setAssetDesc] = useState("Desc of NFT created")

    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*, video/*, audio/*',
        onDrop: (acceptedFiles) => {
            // Doesn't append, need to select more than one
            setFiles(
                acceptedFiles.map( (file) => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
            );
            console.log(files.length);
        }
    });

    const images = files.map( (file) => (
        <div key={file.name}>
            <div>
                <img src={file.preview} style={{width: '50%'}} alt='preview'/>
            </div>
        </div>
    ));

    var changeNFTName = (e) => {setAssetname(e.target.value)}
    var changeNFTDescription = (e) => {setAssetDesc(e.target.value)}
    var submiterror = "";
    let navigate = useNavigate();

	const onFileUpload = async (e) => {
        e.preventDefault();
        console.log('pressed submit');
        // Will have to add parameters for price, sellingtype, price, days
        if(wallet.isWallet){
            let res = await wallet.createNft(files[0], assetName, assetDesc, wallet.accounts)
            if (res.sucess){
                let path = `/inventory`; 
                navigate(path);
            }else{
                submiterror = (<h2>Something failed.</h2>)
            }
        }else{
            submiterror = (<h2>No active wallet.</h2>)
        }
	};

    return(
        <div>
            <h1 style={{padding: '1%'}}>Create Your NFT</h1>
            {submiterror}
            <form id='form'>
                <div style={{width: '50%', float: 'left'}}>
                    <FormGroup sx={{width: '50%', padding: '2%'}}>
                        <TextField name='nftname' onChange={changeNFTName} placeholder="What is your NFT name?"></TextField>
                        <TextField name='nftdesc' onChange={changeNFTDescription} placeholder="Describe your NFT"></TextField>
                        <Button variant="contained" size='small' onClick={onFileUpload}>Submit</Button>
                    </FormGroup>
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