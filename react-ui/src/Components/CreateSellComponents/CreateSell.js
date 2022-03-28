import * as React from 'react';
import {useDropzone} from 'react-dropzone'
import axios from 'axios';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

import hspack from '../images/hspack.png'


function CreateSell(){

    const [files, setFiles]=React.useState([]);
    const [sellingtype, setSellingType]=React.useState(' ');
    const [price, setPrice]=React.useState(0);
    const [days, setDays]=React.useState(0);

    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*, video/*, audio/*',
        onDrop: (acceptedFiles) => {
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
        // // Create an object of formData
        // const formData = new FormData();
        // // Update the formData object
        // formData.append(
        //     "myFile",
        //     this.state.selectedFile,
        //     this.state.selectedFile.name
        // );
        // // Details of the uploaded file
        // console.log(this.state.selectedFile);
        // // Request made to the backend api
        // // Send formData object
        // axios.post("api/uploadfile", formData);
        let path = `../inventory`; 
        navigate(path);
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
                    <FormGroup sx={{width: '50%', padding: '2%'}}>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Are you...</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="some"
                                name="radio-buttons-group"
                                onChange={changeRadioButton}
                            >
                                <FormControlLabel value="selling" control={<Radio />} label="Selling" />
                                <FormControlLabel value="auction" control={<Radio />} label="Auction" />
                                <FormControlLabel value="keeps" control={<Radio />} label="Keeping" />
                            </RadioGroup>
                        </FormControl>

                        <FormControl variant="standard">
                            <InputLabel htmlFor="input-with-icon-adornment">
                                Price
                            </InputLabel>
                            <Input
                            onChange={changePrice}
                            id="input-with-icon-adornment1"
                            startAdornment={
                                <InputAdornment position="start">
                                    <img src=''></img>
                                </InputAdornment>
                            }
                            />
                        </FormControl>

                        <FormControl variant="standard">
                            <InputLabel htmlFor="input-with-icon-adornment">
                                Duration
                            </InputLabel>
                            <Input
                            onChange={changeDuration}
                            id="input-with-icon-adornment2"
                            startAdornment={
                                <InputAdornment position="start">
                                    <img src={hspack} style={{width: '20px'}}></img>
                                </InputAdornment>
                            }
                            />
                        </FormControl>
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