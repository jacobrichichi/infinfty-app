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
    GET_INVENTORY: "GET_INVENTORY",
    DISCONNECT_WALLET: "DISCONNECT_WALLET",
    RECONNECT_WALLET: "RECONNECT_WALLET",
    SET_CURRENT_NFT: "SET_CURRENT_NFT"
}

function WalletContextProvider(props) {
    const [wallet, setWallet] = useState({
        connector: null,
        accounts: null,
        inventory_assets: [],
        isWallet: false,
        currentNFT: null
    })

    const navigate = useNavigate();

    const walletReducer = (action) => {
        const {type, payload} = action;

        switch(type) {
            case WalletActionType.GET_CONNECTOR: {
                return setWallet({
                    connector: payload.connector,
                    accounts: wallet.accounts,
                    inventory_assets: wallet.inventory_assets,
                    isWallet: wallet.isWallet,
                    currentNFT: wallet.currentNFT
                })
            }

            case WalletActionType.CONNECTION_ESTABLISHED: {
                return setWallet({
                    connector: wallet.connector,
                    accounts: payload.accounts,
                    inventory_assets: wallet.inventory_assets,
                    isWallet: true,
                    currentNFT: wallet.currentNFT
                })
            }

            case WalletActionType.GET_INVENTORY: {
                return setWallet({
                    connector: wallet.connector,
                    accounts: wallet.accounts,
                    inventory_assets: payload.assets,
                    isWallet: true,
                    currentNFT: wallet.currentNFT

                })
            }

            case WalletActionType.DISCONNECT_WALLET: {
                return setWallet({
                    connector: null,
                    accounts: null,
                    inventory_assets: null,
                    isWallet: false,
                    currentNFT: wallet.currentNFT
                })
            }

            case WalletActionType.RECONNECT_WALLET: {
                return setWallet({
                    connector: wallet.connector,
                    accounts: wallet.accounts,
                    inventory_assets: wallet.inventory_assets,
                    isWallet: true,
                    currentNFT: wallet.currentNFT
                })
            }

            case WalletActionType.SET_CURRENT_NFT: {
                return setWallet({
                    connector: wallet.connector,
                    accounts: wallet.accounts,
                    inventory_assets: wallet.inventory_assets,
                    isWallet: wallet.isWallet,
                    currentNFT: payload.currentNFT
                })
            }

            default:
                return wallet

        }

    }

    wallet.reconnectWallet = function(){
        const con = new WalletConnect({
            bridge: "https://bridge.walletconnect.org",
            qrcodeModal: QRCodeModal
        });

        walletReducer({
            type: WalletActionType.RECONNECT_WALLET,
            payload: {
                
            }
        })
    }

    wallet.walletConnectInit = async function() {

        if(!wallet.isWallet){
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
    wallet.disconnectWallet = function(){
        const con = new WalletConnect({
            bridge: "https://bridge.walletconnect.org",
            qrcodeModal: QRCodeModal
        });
 
        if (con.connected) {
            con.killSession()
            walletReducer({
                type: WalletActionType.DISCONNECT_WALLET,
                payload: {
                    
                }
            })
        }
    }


    // user for sale of NFT
    wallet.setCurrentNFT = function(url, name, amount, id) {
        walletReducer({
            type: WalletActionType.SET_CURRENT_NFT,
            payload: {
                currentNFT: { url, name, amount, id }
            }
        })

        localStorage.setItem("currentNFTUrl", url)
        localStorage.setItem("currentNFTName", name)
        localStorage.setItem("currentNFTAmount", amount)
        localStorage.setItem("currentNFTId", id)


        navigate('../sell')
    }

    wallet.resetCurrentNFT = function(url, name, amount, id) {
        walletReducer({
            type: WalletActionType.SET_CURRENT_NFT,
            payload: {
                currentNFT: { url, name, amount, id }
            }
        })
    }

    wallet.auctionNFT = async function(startPrice, reserve, duration){

    }

    wallet.sellNFT = async function(price, duration){
        const response = await api.testPython()

        console.log(response.data)

        //const response = await api.listNFTSale(wallet.currentNFT.id, price, duration)
    }

    useEffect(() => {
        const currentNFTUrl = localStorage.getItem("currentNFTUrl");
        if (currentNFTUrl) {
            wallet.resetCurrentNFT(currentNFTUrl, 
                localStorage.getItem("currentNFTName"), 
                localStorage.getItem("currentNFTAmount"), 
                localStorage.getItem("currentNFTId"))
            //auth.loginUser('','')
            //wallet.getWalletId()
        }
      }, []);


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
