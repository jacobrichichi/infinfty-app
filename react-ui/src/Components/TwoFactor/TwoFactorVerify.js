import { Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';

import AuthContext from "../../auth";


function TwoFactorVerify(props){
    const { auth } = useContext(AuthContext);
    const [totpToken, setTotpToken] = useState(0);
    const [retryText, setRetryText] = useState("");
    var email=props.email // Email input from login form


    var tokenChange = (event) => {
        setTotpToken(event.target.value)
    }

    var handleSubmit = async function() {
        const result = await auth.verifyTOTP(email, totpToken)
        // {success: Boolean, message: String}
        if(!result.success){
            setRetryText(result.message)
        }else{
            // Proceed to homepage or something
        }
    }

    return(
        <div>
            <h2>2 Factor Authentication</h2>
            <h4>Use Authy or Google Authenticator</h4>
            <TextField style={{margin: "20px"}} required label="Input 6 digit token" onChange={tokenChange}></TextField>
            <br></br>
            <Button variant="contained" onClick={handleSubmit}>Test</Button>
            <br></br>
            {retryText}
        </div>
    );
}

export default TwoFactorVerify;