import { getNativeSelectUtilityClasses } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";

const WalletContext = createContext();

export const WalletActionType = {
    GET_CONNECTOR: "GET_CONNECTOR",
    CONNECTION_ESTABLISHED: "CONNECTION_ESTABLISHED"
}

function WalletContextProvider(props) {
    const [wallet, setWallet] = useState({
        connector: null,
        walletID: null
    })

    const history = useNavigate();

    const walletReducer = (action) => {
        const {type, payload} = action;

        switch(type) {
            case WalletActionType.GET_CONNECTOR: {
                return setWallet({
                    connector: payload.connector,
                    walletID: null
                })
            }

            case WalletActionType.CONNECTION_ESTABLISHED: {
                return setWallet({
                    connector: null,
                    walletID: payload.walletID
                })
            }

            default:
                return wallet

        }

    }

    wallet.walletConnectInit = function(){
        const con = new WalletConnect({
            bridge: "https://bridge.walletconnect.org",
            qrcodeModal: QRCodeModal
          });

        QRCodeModal.open(con.uri);  

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
