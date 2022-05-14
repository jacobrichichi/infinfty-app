import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import api from './auth-request-api'



const AuthContext = createContext();

export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    TWO_FACT_PASS: "TWO_FACT_PASS",
    REGISTER_USER: "REGISTER_USER",
    EDIT_USER: "EDIT_USER",
    ADD_WRONG_CREDENTIALS: "ADD_WRONG_CREDENTIALS",
    REMOVE_WRONG_CREDENTIALS: "REMOVE_WRONG_CREDENTIALS",
    ADD_BACK_WALLET: "ADD_BACK_WALLET",
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        wrongCredentials: null,
        isWrongCredentials: false,
        twoFactorPass: false,
    })

    const history = useNavigate();

    const authReducer = (action) => {
        const {type, payload} = action;
        console.log(type)

        switch(type) {
            
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    wrongCredentials: null,
                    isWrongCredentials: false,
                    twoFactorPass: false,
                })
            }
            case AuthActionType.TWO_FACT_PASS: {
                return setAuth((prevState) => ({
                    ...prevState,
                    twoFactorPass: true,
                }))
            }
            case AuthActionType.TWO_FACT_FAIL: {
                // Resets to default state
                return setAuth({
                    user: null,
                    loggedIn: false,
                    wrongCredentials: null,
                    isWrongCredentials: false,
                    twoFactorPass: false,
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    wrongCredentials: null,
                    isWrongCredentials: false,
                    twoFactorPass: false,
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    wrongCredentials: null,
                    isWrongCredentials: false,
                    twoFactorPass: false,
                })
            }
            case AuthActionType.EDIT_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    wrongCredentials: null,
                    isWrongCredentials: false,
                    twoFactorPass: true,
                })
            }
            case AuthActionType.ADD_WRONG_CREDENTIALS: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    wrongCredentials: payload.message,
                    isWrongCredentials: true,
                    twoFactorPass: false,
                })
            }
            case AuthActionType.REMOVE_WRONG_CREDENTIALS: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    wrongCredentials: null,
                    isWrongCredentials: false,
                    twoFactorPass: false,
                })
            }
            case AuthActionType.ADD_BACK_WALLET: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    wrongCredentials: null,
                    isWrongCredentials: false,
                    twoFactorPass: true,
                })
            }
            default:
                return auth;
        }
    }

    auth.loginUser = async function(email, password) {
        const response = await api.loginUser(email, password);
        if(response.status === 200) {
            if(response.data.success){
                console.log('auth.loginUser  reponse  ' + response.data.user)
                if(!response.data.user.twofactorsecret){
                    localStorage.setItem('userId', response.data.user._id)
                    if(response.data.user.hasWallet){
                        localStorage.setItem('wallet', response.data.user.wallet)
                    }
                    authReducer({
                        type: AuthActionType.LOGIN_USER,
                        payload: {
                            user: response.data.user
                        }
                    })
                    authReducer({
                        type: AuthActionType.TWO_FACT_PASS,
                    })
                }else{
                    authReducer({
                        type: AuthActionType.LOGIN_USER,
                        payload: {
                            user: response.data.user
                        }
                    })
                }
            }else{
                authReducer({
                    type: AuthActionType.ADD_WRONG_CREDENTIALS,
                    payload: {
                        message: response.data.errorMessage
                    }
                })
            }
            
        }
    }

    auth.passTwoFact = async function(){
        authReducer({
            type: AuthActionType.TWO_FACT_PASS,
        })
        localStorage.setItem('userId', auth.user._id)
        if(auth.user.hasWallet){
            localStorage.setItem('wallet', auth.user.hasWallet)
        }
    }

    auth.failTwoFact = async function(){
        authReducer({
            type: AuthActionType.TWO_FACT_FAIL,
        })
    }

    auth.registerUser = async function(firstName, lastName, userName, email, password, passwordVerify) {
        const response = await api.registerUser(firstName, lastName, userName, email, password, passwordVerify); 
        if (response.status === 200) {
            if(response.data.success) {
                authReducer({
                    type:AuthActionType.REGISTER_USER,
                    payload: {}
                })
            }else{
                authReducer({
                    type: AuthActionType.ADD_WRONG_CREDENTIALS,
                    payload: {
                        message: response.data.errorMessage
                    }
                })
            }
        }
    }

    auth.refreshUser = async function(){
        const response = await api.refreshUser();
        if(response.status === 200){
            if(response.data.success){

                if(!response.data.user.twofactorsecret){
                    localStorage.setItem('userId', response.data.user._id)
                    if(response.data.user.hasWallet){
                        localStorage.setItem('wallet', response.data.user.wallet)
                    }

                    authReducer({
                        type: AuthActionType.LOGIN_USER,
                        payload: {
                            user: response.data.user
                        }
                    })
                    authReducer({
                        type: AuthActionType.TWO_FACT_PASS,
                    })
                }
            }
        }
    }

    auth.loginUserById = async function(userId) {
        // Log in by userID in localstorage
        const response = await api.loginUserById(userId);
        if(response.status === 200){
            if(response.data.success){
                // console.log('loginUserById  ' + response.data)
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                authReducer({
                    type: AuthActionType.TWO_FACT_PASS,
                })
            }
        }
    }

    auth.editUser = async function(newFirstName, newLastName, newUserName, newEmail) {
        let response = await api.getLoggedIn();
        console.log("Success 2")
        console.log(response.status)
        if (response.status === 200) {

            let user = response.data.user;
            console.log("Success 3")
            console.log(user)

            user.firstName = newFirstName;
            user.lastName = newLastName;
            user.userName = newUserName;
            user.email = newEmail;
            console.log("Success 4")
            console.log(user)
            console.log(user._id)

            async function updateUser(user){
                response = await api.updateUser(user._id, user);
                if (response.status === 200){
                    authReducer( {
                        type: AuthActionType.EDIT_USER,
                        payload: {
                            user: user
                        }
                    })
                }
            }
            updateUser(user)
            
        }
    }

    auth.changePassword = async function(password, newPassword) {
        let response = await api.getLoggedIn();
        console.log("changePassword reached")
        if (response.status === 200) {
            let user = response.data.user;

            user.password = password;
            user.newPassword = newPassword;
            console.log("passwords")
            console.log(password)
            console.log(newPassword)

            async function updatePassword(user){
                response = await api.updatePassword(user._id, user);
                if (response.status === 200){
                    authReducer( {
                        type: AuthActionType.EDIT_USER,
                        payload: {
                            user: user
                        }
                    })
                }
            }
            updatePassword(user)
        }
    }

    auth.closeErrorMessage = async function(store) {
        authReducer({
            type: AuthActionType.REMOVE_WRONG_CREDENTIALS,
            payload: {

            }
        })
    }

    // Remove wallet from data base on logout
    auth.logoutUser = async function() {
        // console.log('logoutUser  ' + localStorage.getItem("userId"))
        const response = await api.logoutUser(localStorage.getItem("userId"));
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            history('../')
            localStorage.removeItem('userId')
            
        }
    }

    auth.addBackWallet = function(wallet){
        let newUser = auth.user
        newUser.hasWallet = true
        newUser.wallet = wallet
        authReducer( {
            type: AuthActionType.ADD_BACK_WALLET,
            payload: {
                user: newUser
            }
        })
    }

    auth.setUp2FA = async function(){
        let user = auth.user
        const response = await api.setUp2FA(user)
        if(response.status===200){
            if(response.data.success){
                console.log("auth.setUp2FA  " + response.data.message)
                return response.data.qrcode
            }
        }
    }

    auth.verifyTOTP = async function(useremail, totpToken){
        let user = {
            email: useremail,
            totpToken: totpToken
        }
        const response = await api.verifyTOTP(user)
        console.log('verifyTOTP  ' + response)
        return response.data
    }

    auth.removeWallet = async function() {
        const response = await api.removeWallet()
        if(response.status === 200){
            if(response.data.success) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })

                authReducer({
                    type: AuthActionType.TWO_FACT_PASS,
                })
            }
        }
    }


    useEffect(() => {
        const loggedInUserId = localStorage.getItem("userId");
        const walletSaved = localStorage.getItem("wallet")
        if (loggedInUserId && !auth.loggedIn) {
            // If there exist localstorage of userID and user is not logged in
            console.log('auth.userEffect1')
            auth.loginUserById(loggedInUserId)
        }
        if(walletSaved && auth.user !== null && !auth.user.hasWallet){
            // If there is a walletSaved onto localstorage, and user not null and doesn't have wallet
            console.log('auth.userEffect2')
            auth.loginUserById(loggedInUserId)
        }
      }, []);

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider }