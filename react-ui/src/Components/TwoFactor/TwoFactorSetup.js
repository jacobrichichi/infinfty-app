import React, { useContext, useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button, TextField } from '@mui/material';

import AuthContext from "../../auth";
import '../General.css';
import '../Account.css';

/**
 * Page to setup 2F of Account
 * 
*/

function TwoFactorSetup(){
    const { auth } = useContext(AuthContext);
    const [qrcode, setQrcode] = useState("");
    const [tokenmatch, setTokenmatch] = useState("");
    const [totpToken, setTotpToken] = useState(0);

    useEffect(()=>{
        async function getQR(){
            if (auth.user!== null && !qrcode){
                const qr = await auth.setUp2FA();
                setQrcode(qr);
            }
        }
        getQR();
    })

    var tokenChange = (event) => {
        setTotpToken(event.target.value)
    }

    var handleSubmit = async function() {
        const result = await auth.verifyTOTP(auth.user.email, totpToken)
        // {success: Boolean, message: String}
        setTokenmatch(result.message)
    }

    return(
        <div>
            <div align={"center"}>
                <h1>Your QR Code</h1>
                {qrcode ?  <QRCodeCanvas value={qrcode} /> : ""}
                <h4>Scan with Authy or Google Authenticator</h4>
                <TextField style={{margin: "20px"}} required label="Input 6 digit token" onChange={tokenChange}></TextField>
                <br></br>
                <Button variant="contained" onClick={handleSubmit}>Test</Button>
                <br></br>
                {tokenmatch}
            </div>
        </div>
    );
}

export default TwoFactorSetup;