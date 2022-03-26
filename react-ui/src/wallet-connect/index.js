import { getNativeSelectUtilityClasses } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import api from './wallet-request-api'

const WalletContext = createContext();

export const WalletActionType = {
    GET_CONNECTOR: "GET_CONNECTOR",
    CONNECTION_ESTABLISHED: "CONNECTION_ESTABLISHED"
}

function WalletContextProvider(props) {
    const [wallet, setWallet] = useState({
        connector: null,
        accounts: null
    })

    const history = useNavigate();

    const walletReducer = (action) => {
        const {type, payload} = action;

        switch(type) {
            case WalletActionType.GET_CONNECTOR: {
                return setWallet({
                    connector: payload.connector,
                    accounts: null
                })
            }

            case WalletActionType.CONNECTION_ESTABLISHED: {
                return setWallet({
                    connector: wallet.connector,
                    accounts: payload.accounts
                })
            }

            default:
                return wallet

        }

    }

    wallet.walletConnectInit = async function(){
        const con = new WalletConnect({
            bridge: "https://bridge.walletconnect.org",
            qrcodeModal: QRCodeModal
        });
 
        if (!con.connected) {
            con.createSession();
        }

        con.on("connect", (error, payload) => {
            if (error) {
                throw error;
            }
            
            // Get provided accounts
            const { accounts } = payload.params[0];

            walletReducer({
                type: WalletActionType.CONNECTION_ESTABLISHED,
                payload: {
                    accounts: accounts
                }
            })

            //const response = await api.addWallet(accounts)
        });

        con.on("session_update", (error, payload) => {
            if (error) {
              throw error;
            }
          
            // Get updated accounts 
            const { accounts } = payload.params[0];

            walletReducer({
                type: WalletActionType.CONNECTION_ESTABLISHED,
                payload: {
                    accounts: accounts
                }
            })
          });

        

        walletReducer({
            type: WalletActionType.GET_CONNECTOR,
            payload: {
                connector: con
            }
        })

        
    }




    return (
        <WalletContext.Provider value={{
            wallet
        }}>
            {props.children}
        </WalletContext.Provider>
    );
}

export default WalletContext;
export { WalletContextProvider }
