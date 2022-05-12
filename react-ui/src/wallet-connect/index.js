import { getNativeSelectUtilityClasses } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { Navigate, UNSAFE_NavigationContext, useNavigate } from 'react-router-dom'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import api from './wallet-request-api'
import { bidOnAuction, createAuction, createNFT, deleteAuctions, getAuctionDetails, endAuction } from './algo-sdk-transactions/nftAuction'

const WalletContext = createContext();

export const WalletActionType = {
    GET_CONNECTOR: "GET_CONNECTOR",
    CONNECTION_ESTABLISHED: "CONNECTION_ESTABLISHED",
    GET_INVENTORY: "GET_INVENTORY",
    DISCONNECT_WALLET: "DISCONNECT_WALLET",
    RECONNECT_WALLET: "RECONNECT_WALLET",
    SET_CURRENT_NFT: "SET_CURRENT_NFT",
    SET_EXPLORE_AUCTIONS: "SET_EXPLORE_AUCTIONS",
    SET_CURRENT_AUCTION: "SET_CURRENT_AUCTION",
    DONE_DISCONNECTING: "DONE_DISCONNECTING",
    REFRESH_PAGE: "REFRESH_PAGE"
}

function WalletContextProvider(props) {
    const [wallet, setWallet] = useState({
        connector: null,
        accounts: null,
        inventory_assets: ['a'],
        auctions: [],
        isWallet: false,
        currentNFT: null,
        currentAuction: null,
        exploreAuctions: [],
        disconnecting: false
    })

    const navigate = useNavigate();

    const walletReducer = (action) => {
        const { type, payload } = action;
        console.log(type)

        switch(type) {
            case WalletActionType.GET_CONNECTOR: {
                return setWallet({
                    connector: payload.connector,
                    accounts: wallet.accounts,
                    inventory_assets: wallet.inventory_assets,
                    auctions: wallet.auctions,
                    isWallet: wallet.isWallet,
                    currentNFT: wallet.currentNFT,
                    currentAuction: wallet.currentAuction,
                    exploreAuctions: wallet.exploreAuctions,
                    disconnecting: wallet.disconnecting
                })
            }

            case WalletActionType.CONNECTION_ESTABLISHED: {
                return setWallet({
                    connector: wallet.connector,
                    accounts: payload.accounts,
                    inventory_assets: wallet.inventory_assets,
                    auctions: wallet.auctions,
                    isWallet: true,
                    currentNFT: wallet.currentNFT,
                    currentAuction: wallet.currentAuction,
                    exploreAuctions: wallet.exploreAuctions,
                    disconnecting: wallet.disconnecting 
                })
            }

            case WalletActionType.GET_INVENTORY: {
                return setWallet({
                    connector: wallet.connector,
                    accounts: wallet.accounts,
                    inventory_assets: payload.assets,
                    auctions: payload.auctions,
                    isWallet: wallet.isWallet,
                    currentNFT: wallet.currentNFT,
                    currentAuction: wallet.currentAuction,
                    exploreAuctions: wallet.exploreAuctions,
                    disconnecting: wallet.disconnecting

                })
            }

            case WalletActionType.DISCONNECT_WALLET: {
                return setWallet({
                    connector: null,
                    accounts: null,
                    inventory_assets: ['a'],
                    auctions: wallet.auctions,
                    isWallet: false,
                    currentNFT: wallet.currentNFT,
                    currentAuction: wallet.currentAuction,
                    exploreAuctions: wallet.exploreAuctions,
                    disconnecting: true
                })
            }

            case WalletActionType.RECONNECT_WALLET: {
                return setWallet({
                    connector: wallet.connector,
                    accounts: payload.wallet,
                    inventory_assets: wallet.inventory_assets,
                    auctions: wallet.auctions,
                    isWallet: true,
                    currentNFT: wallet.currentNFT,
                    currentAuction: wallet.currentAuction,
                    exploreAuctions: wallet.exploreAuctions,
                    disconnecting: wallet.disconnecting
                })
            }

            case WalletActionType.SET_CURRENT_NFT: {
                return setWallet({
                    connector: wallet.connector,
                    accounts: wallet.accounts,
                    inventory_assets: wallet.inventory_assets,
                    auctions: wallet.auctions,
                    isWallet: wallet.isWallet,
                    currentNFT: payload.currentNFT,
                    currentAuction: wallet.currentAuction,
                    exploreAuctions: wallet.exploreAuctions,
                    disconnecting: wallet.disconnecting
                })
            }

            case WalletActionType.SET_EXPLORE_AUCTIONS: {
                return setWallet({
                    connector: wallet.connector,
                    accounts: wallet.accounts,
                    inventory_assets: wallet.inventory_assets,
                    auctions: wallet.auctions,
                    isWallet: wallet.isWallet,
                    currentNFT: wallet.currentNFT,
                    currentAuction: wallet.currentAuction,
                    exploreAuctions: payload.exploreAuctions,
                    disconnecting: wallet.disconnecting
                })
            }
            case WalletActionType.SET_CURRENT_AUCTION: {
                return setWallet({
                    connector: wallet.connector,
                    accounts: wallet.accounts,
                    inventory_assets: wallet.inventory_assets,
                    auctions: wallet.auctions,
                    isWallet: wallet.isWallet,
                    currentNFT: wallet.currentNFT,
                    currentAuction: payload.currentAuction,
                    exploreAuctions: wallet.exploreAuctions,
                    disconnecting: wallet.disconnecting

                })
            }

            case WalletActionType.DONE_DISCONNECTING: {
                return setWallet({
                    connector: wallet.connector,
                    accounts: null,
                    inventory_assets: wallet.inventory_assets,
                    auctions: wallet.auctions,
                    isWallet: false,
                    currentNFT: wallet.currentNFT,
                    currentAuction: wallet.currentAuction,
                    exploreAuctions: wallet.exploreAuctions,
                    disconnecting: false

                })
            }
            case WalletActionType.REFRESH_PAGE: {
                return setWallet({
                    connector: wallet.connector,
                    accounts: payload.accounts,
                    inventory_assets: wallet.inventory_assets,
                    auctions: wallet.auctions,
                    isWallet: payload.isWallet,
                    currentNFT: payload.currentNFT,
                    currentAuction: payload.currentAuction,
                    exploreAuctions: payload.exploreAuctions,
                    disconnecting: false
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

        //const wallet = localStorage.getItem("wallet")
       // if(wallet !== null){
            walletReducer({
                type: WalletActionType.RECONNECT_WALLET,
                payload: {
                    wallet: con.accounts[0]
                }
            })
      //  }

        // else{
        //     const response = await api.removeWallet()

        //     if(response.status === 200){
        //         if(response.data.success){
                    
        //         }
        //     }
        // }

        
    }

    wallet.walletConnectInit = async function() {

        //if(!wallet.isWallet){
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
                                accounts: accounts[0]
                            }
                        })

                        localStorage.setItem("wallet", accounts)
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
                        accounts: accounts[0]
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
        //}
        
    }

    wallet.getInventory = async function() {

        console.log('heulgs')
        const response = await api.getInventory();

        if(response.status === 200){
            if(response.data.success){
                console.log(response.data)

                walletReducer({
                    type: WalletActionType.GET_INVENTORY,
                    payload: {
                        assets: response.data.assets,
                        auctions: response.data.auctions
                    }
                })

                navigate('../inventory')
            }
        }
    }

    wallet.createNft = async function(nftFile, nftName, nftDesc, bidder) {
        const response = await createNFT(nftFile, nftName, nftDesc, bidder)
        return response
    }
    
    wallet.disconnectWallet = function(){
        const con = new WalletConnect({
            bridge: "https://bridge.walletconnect.org",
            qrcodeModal: QRCodeModal
        });
 
       // if (con.connected) {
            con.killSession()
            con.accounts = []
            localStorage.removeItem('wallet')
            walletReducer({
                type: WalletActionType.DISCONNECT_WALLET,
                payload: {
                    
                }
            })
      //  }
    }

    wallet.doneLoggingOut = function() {
        walletReducer({
            type: WalletActionType.DONE_DISCONNECTING,
            payload: {

            }
        })
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

    wallet.readdWallet = async function(wallet){
        walletReducer({
            type: WalletActionType.CONNECTION_ESTABLISHED,
            payload: {
                accounts: wallet
            }
        })
    }

    wallet.auctionNFT = async function(startPrice, reserve, duration){
        const con = new WalletConnect({
            bridge: "https://bridge.walletconnect.org",
            qrcodeModal: QRCodeModal
        });

        if(con.connected){
            const auctionCreationResponse = await createAuction(con, wallet.accounts, wallet.accounts, wallet.currentNFT.id, reserve, .1, duration)

            console.log(auctionCreationResponse)

            if(auctionCreationResponse && auctionCreationResponse.success){
                const auctionStorageResponse = await api.storeCreatedAuction(auctionCreationResponse.appID)

                if(auctionStorageResponse.status === 200){
                    if(auctionStorageResponse.data.success){
                        wallet.setCurrentAuction(auctionCreationResponse.appID, wallet.accounts)
                    }
                }
            }
        }
    }


    // this is usually called before entering the auction page, general info like NFT being sold, seller, highest current bid etc etc
    wallet.setCurrentAuction = async function(auctionID){
        const auction = await getAuctionDetails(auctionID)

        walletReducer({
            type: WalletActionType.SET_CURRENT_AUCTION,
            payload: {
                currentAuction: auction
            }
        })

        //const auctionDetails = getAuctionDetails(appID, creatorWallet)
    }

    wallet.setCurrentAuctionNoID = async function(auction){
        walletReducer({
            type: WalletActionType.SET_CURRENT_AUCTION,
            payload: {
                currentAuction: auction
            }
        })
    }

    wallet.endAuction = async function() {
        const response = await endAuction(parseInt(wallet.currentAuction.id), wallet.accounts, wallet.currentAuction.state.bid_account, wallet.currentAuction.state.nft_id)
        if(response.success){
            const backendResponse = await api.endAuction(parseInt(wallet.currentAuction.id), wallet.currentAuction.state.nft_id)
        }

    }

    wallet.sellNFT = async function(price, duration){
        const response = await api.testPython()

        console.log(response.data)

        //const response = await api.listNFTSale(wallet.currentNFT.id, price, duration)
    }

    wallet.getExploreAuctions = async function() {
        const response = await api.getExploreAuctions()

        if(response.status === 200){
            if(response.data.success){

                let exploreAuctions = response.data.auctions

                console.log(exploreAuctions)
                walletReducer({
                    type: WalletActionType.SET_EXPLORE_AUCTIONS,
                    payload: {
                        exploreAuctions: exploreAuctions
                    }
                })

                localStorage.setItem('exploreAuctions', exploreAuctions)
        
            }
        }
    }

    wallet.readdExplore = async function(auctions) {
        walletReducer({
            type: WalletActionType.SET_EXPLORE_AUCTIONS,
            payload: {
                exploreAuctions: auctions
            }
        })
    }

    wallet.goToAuction = function(auction){
        walletReducer({
            type: WalletActionType.SET_CURRENT_AUCTION,
            payload: {
                currentAuction: auction
            }
        })
        localStorage.setItem('currentAuctionID', auction.id)
        navigate('../auction')
    }

    wallet.refreshPage  = async function(nftUrl, walletID, auctionID) {
        const response = await api.getExploreAuctions()

        if(response.status === 200){
            if(response.data.success){

                let exploreAuctions = response.data.auctions
                let currentNFT = (nftUrl !== null ? {url: nftUrl, 
                                    name: localStorage.getItem("currentNFTName"), 
                                    amount: localStorage.getItem("currentNFTAmount"), 
                                    id: localStorage.getItem("currentNFTId")} : null)

                
                let auction = null
                if(auctionID !== null){
                    auction = await getAuctionDetails(auctionID)
                }
                

                console.log(exploreAuctions)
                walletReducer({
                    type: WalletActionType.REFRESH_PAGE,
                    payload: {
                        exploreAuctions: exploreAuctions,
                        currentNFT: currentNFT,
                        accounts: walletID,
                        currentAuction: auction
                    }
                })


            }
        }
    }

    wallet.placeBid = async function(offer) {
        const response = await bidOnAuction(wallet.currentAuction, wallet.accounts, parseFloat(offer))

    }

    // consolidated refresh into one call

    useEffect(() => {
        const currentNFTUrl = localStorage.getItem("currentNFTUrl");
        const currentWallet = localStorage.getItem("wallet");
        const currentAuctionID = localStorage.getItem("currentAuctionID");
        //const exploreAuctions = localStorage.getItem("exploreAuctions")
        wallet.refreshPage((currentNFTUrl ? currentNFTUrl : null),
                             (currentWallet ? currentWallet : null),
                             (currentAuctionID ? currentAuctionID : null))
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
