import React from 'react'
import test from "../images/test_nft.png"
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom'



const EditNFT = (props) => {
    const navigate = useNavigate();
    return(
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <div>
        <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        src = {test}
        />
        <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Description Placeholder</InputLabel>
            <OutlinedInput
                id="outlined-adornment-amount"
                label="Amount"
            />
        </FormControl>
        <div><p>Owned by David Liang</p></div>
        <div><p>Part of the Collection: <Link onClick={() => {
                        navigate('/collection')
                    }}>My First Collection</Link></p></div>
        
        </div>
        </Box>
    )

}

export default EditNFT;