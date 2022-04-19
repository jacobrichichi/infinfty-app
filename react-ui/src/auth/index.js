import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import api from './auth-request-api'



const AuthContext = createContext();

export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
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
        isWrongCredentials: false
    })

    const history = useNavigate();

    const authReducer = (action) => {
        const {type, payload} = action;

        switch(type) {
            
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    wrongCredentials: null,
                    isWrongCredentials: false
                })
            }

            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    wrongCredentials: null,
                    isWrongCredentials: false
                })
            }

            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    wrongCredentials: null,
                    isWrongCredentials: false
                })
            }

            case AuthActionType.EDIT_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    wrongCredentials: null,
                    isWrongCredentials: false
                })
            }

            case AuthActionType.ADD_WRONG_CREDENTIALS: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    wrongCredentials: payload.message,
                    isWrongCredentials: true
                })
            }

            case AuthActionType.REMOVE_WRONG_CREDENTIALS: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    wrongCredentials: null,
                    isWrongCredentials: false
                })
            }
            case AuthActionType.ADD_BACK_WALLET: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    wrongCredentials: null,
                    isWrongCredentials: false
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
                console.log('auth.loginUser  ' + response.data.user)

                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                localStorage.setItem('userId', response.data.user._id)
                if(response.data.user.hasWallet){
                    localStorage.setItem('wallet', response.data.user.wallet)
                }

            }

            else {
                authReducer({
                    type: AuthActionType.ADD_WRONG_CREDENTIALS,
                    payload: {
                        message: response.data.errorMessage
                    }
                })
            }
        }
    }

    auth.registerUser = async function(firstName, lastName, userName, email, password, passwordVerify) {
        const response = await api.registerUser(firstName, lastName, userName, email, password, passwordVerify); 
        
        if (response.status === 200) {
            if(response.data.success) {
                authReducer({
                    type:AuthActionType.REGISTER_USER,
                    payload: {

                    }
                })
            }
            else{
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

                console.log('refreshUser  ' + response.data);

                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })


            }
        }

    }

    auth.loginUserById = async function(userId) {
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


            }
        }
    }

    auth.editUser = async function(newFirstName, newLastName, newEmail) {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            let user = response.data.user;
            user.firstName = newFirstName;
            user.lastName = newLastName;
            user.email = newEmail;
            authReducer( {
                type: AuthActionType.EDIT_USER,
                payload: {
                    user: user
                }
            })
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
        console.log('logoutUser  ' + localStorage.getItem("userId"))
        const response = await api.logoutUser(localStorage.getItem("userId"));
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            history('../')
            localStorage.removeItem('userId')
            localStorage.removeItem('wallet')
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


    useEffect(() => {
        const loggedInUserId = localStorage.getItem("userId");
        const walletSaved = localStorage.getItem("wallet")
        if (loggedInUserId && !auth.loggedIn) {
            // If there exist localstorage of userID and user is not logged in
            //auth.loginUser('','')
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