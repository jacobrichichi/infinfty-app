import { getNativeSelectUtilityClasses } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { Navigate, UNSAFE_NavigationContext, useNavigate } from 'react-router-dom'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import api from './wallet-request-api'

const WalletContext = createContext();

export const WalletActionType = {
    GET_CONNECTOR: "GET_CONNECTOR",
    CONNECTION_ESTABLISHED: "CONNECTION_ESTABLISHED",
    GET_INVENTORY: "GET_INVENTORY"
}

function WalletContextProvider(props) {
    const [wallet, setWallet] = useState({
        connector: null,
        accounts: null,
        inventory_assets: []
    })

    const navigate = useNavigate();

    const walletReducer = (action) => {
        const {type, payload} = action;

        switch(type) {
            case WalletActionType.GET_CONNECTOR: {
                return setWallet({
                    connector: payload.connector,
                    accounts: wallet.accounts,
                    inventory_assets: wallet.inventory_assets
                })
            }

            case WalletActionType.CONNECTION_ESTABLISHED: {
                return setWallet({
                    connector: wallet.connector,
                    accounts: payload.accounts,
                    inventory_assets: wallet.inventory_assets
                })
            }

            case WalletActionType.GET_INVENTORY: {
                return setWallet({
                    connector: wallet.connector,
                    accounts: wallet.accounts,
                    inventory_assets: payload.assets

                })
            }

            default:
                return wallet

        }

    }

    wallet.walletConnectInit = async function() {

        const con = new WalletConnect({
            bridge: "https://bridge.walletconnect.org",
            qrcodeModal: QRCodeModal
        });
 
        if (!con.connected) {
            con.createSession();
        }

        con.on("connect", async (error, payload) => {
            if (error) {
                throw error;
            }
            
            // Get provided accounts
            const { accounts } = payload.params[0];

            const response = await api.addWallet(accounts)

            console.log(con)

            if(response.status === 200){
                if(response.data.success){
                    walletReducer({
                        type: WalletActionType.CONNECTION_ESTABLISHED,
                        payload: {
                            accounts: accounts
                        }
                    })
                }
            }

            else{
                console.log(response.message)
            }
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

          con.on("disconnect", (error, payload) => {

          })

        walletReducer({
            type: WalletActionType.GET_CONNECTOR,
            payload: {
                connector: con
            }
        })

        
    }

    wallet.getInventory = async function() {
        const response = await api.getInventory();

        if(response.status === 200){
            if(response.data.success){
                walletReducer({
                    type: WalletActionType.GET_INVENTORY,
                    payload: {
                        assets: response.data.assets
                    }
                })

                navigate('../inventory')
            }
        }
    }

    wallet.createNft = async function(nftFile, nftName, nftDesc) {
        const response = await api.createNft(nftFile, nftName, nftDesc);
    

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
