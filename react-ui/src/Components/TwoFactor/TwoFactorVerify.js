import { Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import AuthContext from "../../auth";


function TwoFactorVerify(props){
    const { auth } = useContext(AuthContext);
    const [totpToken, setTotpToken] = useState(0);
    const [retryText, setRetryText] = useState("");


    var tokenChange = (event) => {
        setTotpToken(event.target.value)
    }

    let navigate = useNavigate()
    var handleSubmit = async function() {
        const result = await auth.verifyTOTP(auth.user.email, totpToken)
        // {success: Boolean, message: String}
        if(!result.success){
            setRetryText(result.message)
        }else{
            // Proceed to homepage or something
            auth.passTwoFact()
            navigate(`/`)
        }
    }

    return(
        <div align="center">
            <h2>2 Factor Authentication</h2>
            <h4>Use Authy or Google Authenticator</h4>
            <TextField style={{margin: "20px"}} required label="Input 6 digit token" onChange={tokenChange}></TextField>
            <br></br>
            <Button variant="contained" onClick={handleSubmit}>Test</Button>
            <br></br>
            <br></br>
            {retryText}
        </div>
    );
}

export default TwoFactorVerify;