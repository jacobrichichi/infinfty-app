import React from 'react'
import './RegisterLoginModal.css'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


const RegisterLoginModal = (props) => {

    const boxStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    const [loginMode, setLoginMode] = React.useState(true)

    const handleLogToReg = () => {
        setLoginMode(false)
    }

    const handleRegToLog = () => {
        setLoginMode(true)
    }


    var modal = 
        <Modal
            open={props.open && loginMode}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={boxStyle}>
            <Grid container spacing={2}  direction="column" justifyContent="center" alignItems="center">
                <Grid item xs = {12}>
                    <div >
                        Email
                    </div>
                </Grid>
                <Grid item xs = {12}>
                    <input >
                    </input>
                </Grid>

                <Grid item xs = {12}>
                    <div >
                        Password
                    </div>
                </Grid>
                <Grid item xs = {12}>
                    <input >
                    </input>
                </Grid>
                <Grid item xs = {12}>
                    <Button variant="outlined" onClick={props.handleLogin} >Login</Button>
                </Grid>
                <Grid item xs = {12}>
                    <span onClick = {handleLogToReg}>Sign Up</span>    
                </Grid>
            </Grid>
            </Box>
        </Modal>

    //<span onClick = {setLoginMode(false)}>Sign Up</span>    

    if(!loginMode){
        modal = 
        <Modal
        open={props.open && !loginMode}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={boxStyle}>
        <Grid container spacing={2}  direction="column" justifyContent="center" alignItems="center">
            <Grid item xs = {12}>
                <div >
                    Email
                </div>
            </Grid>
            <Grid item xs = {12}>
                <input >
                </input>
            </Grid>
            <Grid item xs = {12}>
                <div >
                    First Name
                </div>
            </Grid>
            <Grid item xs = {12}>
                <input >
                </input>
            </Grid>
            <Grid item xs = {12}>
                <div >
                    Last Name
                </div>
            </Grid>
            <Grid item xs = {12}>
                <input >
                </input>
            </Grid>
            <Grid item xs = {12}>
                <div >
                    User Name
                </div>
            </Grid>
            <Grid item xs = {12}>
                <input >
                </input>
            </Grid>
            <Grid item xs = {12}>
                <div >
                    Password
                </div>
            </Grid>
            <Grid item xs = {12}>
                <input >
                </input>
            </Grid>
            <Grid item xs = {12}>
                <div >
                    Re-Enter Password
                </div>
            </Grid>
            <Grid item xs = {12}>
                <input >
                </input>
            </Grid>
            <Grid item xs = {12}>
                <Button variant="outlined" onClick={props.handleLogin} >Login</Button>
            </Grid>
            <Grid item xs = {12}>
                <span onClick = {handleRegToLog}>Sign Up</span>    
            </Grid>
        </Grid>
        </Box>
    </Modal>
    }


    return (
        <div>
            {modal}
        </div>
    )
}

export default RegisterLoginModal