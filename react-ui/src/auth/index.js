import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import api from './auth-request-api'

const AuthContext = createContext();

export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    ADD_WRONG_CREDENTIALS: "ADD_WRONG_CREDENTIALS",
    REMOVE_WRONG_CREDENTIALS: "REMOVE_WRONG_CREDENTIALS" 
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

            default:
                return auth;
        }
    }

    auth.loginUser = async function(email, password) {
        const response = await api.loginUser(email, password);

        if(response.status === 200) {
            if(response.data.success){
                console.log(response.data.user)

                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                localStorage.setItem('userId', response.data.user._id)
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

    auth.loginUserById = async function(userId) {
        const response = await api.loginUserById(userId);

        if(response.status === 200){
            if(response.data.success){

                console.log(response.data)

                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
            }
        }
    }

    auth.closeErrorMessage = async function(store) {
        authReducer({
            type: AuthActionType.REMOVE_WRONG_CREDENTIALS,
            payload: {

            }
        })
    }

    useEffect(() => {
        const loggedInUserId = localStorage.getItem("userId");
        if (loggedInUserId && !auth.loggedIn) {
            //auth.loginUser('','')
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