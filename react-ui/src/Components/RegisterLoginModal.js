import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthContext from '../auth'
import './RegisterLoginModal.css'

import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const RegisterLoginModal = (props) => {

    const boxStyle = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, 
                    bgcolor: 'background.paper',    border: '2px solid #000', boxShadow: 24, p: 4};

    const { auth } = useContext(AuthContext);

    const [loginMode, setLoginMode] = useState(true)
    const [registerSuccess, setRegisterSuccess] = useState(false)
    const [ isMessageModalOpen, setIsMessageModalOpen ] = useState(false)

    let navigate = useNavigate()
    const handleCloseMessageModal = (event) => {      
        event.stopPropagation();
        if(auth.isWrongCredentials){
            auth.closeErrorMessage();
            setIsMessageModalOpen(false)
        }else{
            setIsMessageModalOpen(false)
            if(loginMode){
                // If currently login mode
                // props.handleLogin() just closes RegisterLoginModal
                props.handleLogin()
                if(!auth.twoFactorPass){
                    navigate(`/twofactorverify`)
                }
            }else{
                // If not login mode (hence registering mode),
                // Set(loginmode) so messageModal has login fields
                setLoginMode(true)
            }
        }
    }

    var messageModal = ""

    if(auth.isWrongCredentials){
        const errorMessage = auth.wrongCredentials
        messageModal = (
            <Modal open = {isMessageModalOpen} onClose={handleCloseMessageModal} aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">   
                <Box sx = {boxStyle}>
                    <Alert severity="warning">{errorMessage}</Alert>
                    <Button variant="outlined" onClick = {handleCloseMessageModal}>OK</Button>
                </Box>
            </Modal>
        )
    }else if(loginMode){
        messageModal =(
            <Modal open = {isMessageModalOpen} onClose={handleCloseMessageModal} aria-labelledby="modal-modal-title" 
                aria-describedby="modal-modal-description">   
                <Box sx = {boxStyle}>
                    <Alert severity="success">Login Found!</Alert>
                    <Button variant="outlined" onClick = {handleCloseMessageModal}>OK</Button>
                </Box>
            </Modal>
        )
    }else{
        messageModal = (
            <Modal open = {isMessageModalOpen} onClose={handleCloseMessageModal} aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">   
                <Box sx = {boxStyle}>
                    <Alert severity="success">Registration Successful!</Alert>
                    <Button variant="outlined" onClick = {handleCloseMessageModal}>OK</Button>
                </Box>
            </Modal>
        )
    }
    
    const handleLogToReg = () => {setLoginMode(false)}

    const handleRegToLog = () => {setLoginMode(true)}
    const handleSubmit= (event) => {
        // Checks which type of form is being submitted
        if(loginMode){
            // Logging in
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            auth.loginUser(
                formData.get('email'),
                formData.get('password')
            );
            // Direct users to 2FA if possible
            setIsMessageModalOpen(true)
        }else{
            // Registering
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            auth.registerUser(
                formData.get('firstName'),
                formData.get('lastName'),
                formData.get('username'),
                formData.get('email'),
                formData.get('password'),
                formData.get('passwordVerify')
            )
            setIsMessageModalOpen(true)
        }
    }


    var modal = (
        <Modal open={props.open && loginMode} onClose={props.handleClose} aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={boxStyle}>
                <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email"
                            autoComplete="email" autoFocus/>
                        <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password"
                            autoComplete="current-password"/>
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me"/>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <span onClick = {handleLogToReg}>Register</span>  
                    </Box>
                </Box>
            </Box>
        </Modal>
    )

    if(!loginMode){
        modal = (
            <Modal
            open={props.open && !loginMode}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <Box sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                    >
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            />
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="User Name"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            />
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="firstName"
                            autoFocus
                            />
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lastName"
                            autoFocus
                            />
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            />
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="passwordVerify"
                            label="Re-Enter Password"
                            type="password"
                            id="passwordVerify"
                            autoComplete="current-password"
                            />
                            <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                            />
                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                                Register
                            </Button>
                            <span onClick = {handleRegToLog}>Log In</span>  
                        </Box>
                    </Box>
                </Box>
            </Modal>
        )
    }


    return (
        <div>
            {modal}
            {messageModal}
        </div>
    )
}

export default RegisterLoginModal