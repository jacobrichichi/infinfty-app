import { getNativeSelectUtilityClasses } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import { Navigate, UNSAFE_NavigationContext, useNavigate } from 'react-router-dom'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import api from './wallet-request-api'
import { bidOnAuction, createAuction, createNFT, deleteAuctions, getAuctionDetails, endAuction, clearApps } from './algo-sdk-transactions/nftAuction'

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
    SET_SEARCH_RESULTS: "SET_SEARCH_RESULTS",
    DONE_DISCONNECTING: "DONE_DISCONNECTING",
    REFRESH_PAGE: "REFRESH_PAGE",
    ADD_ERROR_MESSAGE: "ADD_ERROR_MESSAGE",
    REMOVE_ERROR_MESSAGE: "REMOVE_ERROR_MESSAGE",
    ADD_SUCCESS_MESSAGE: "ADD_SUCCESS_MESSAGE",
    REMOVE_SUCCESS_MESSAGE: "REMOVE_SUCCESS_MESSAGE"
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
        searchResults: [],
        exploreAuctions: [],
        disconnecting: false,
        isError: false,
        errorMessage: "",
        isSuccess: false,
        successMessage: ""
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
                    searchResults: wallet.searchResults,
                    disconnecting: wallet.disconnecting,
                    isError: wallet.isError,
                    errorMessage: wallet.errorMessage,
                    isSuccess: wallet.isSuccess,
                    successMessage: wallet.successMessage
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
                    searchResults: wallet.searchResults,
                    disconnecting: wallet.disconnecting,
                    isError: wallet.isError,
                    errorMessage: wallet.errorMessage,
                    isSuccess: wallet.isSuccess,
                    successMessage: wallet.successMessage
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
                    searchResults: wallet.searchResults,
                    disconnecting: wallet.disconnecting,
                    isError: wallet.isError,
                    errorMessage: wallet.errorMessage,
                    isSuccess: wallet.isSuccess,
                    successMessage: wallet.successMessage

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
                    searchResults: wallet.searchResults,
                    disconnecting: true,
                    isError: wallet.isError,
                    errorMessage: wallet.errorMessage,
                    isSuccess: wallet.isSuccess,
                    successMessage: wallet.successMessage
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
                    searchResults: wallet.searchResults,
                    disconnecting: wallet.disconnecting,
                    isError: wallet.isError,
                    errorMessage: wallet.errorMessage,
                    isSuccess: wallet.isSuccess,
                    successMessage: wallet.successMessage
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
                    searchResults: wallet.searchResults,
                    disconnecting: wallet.disconnecting,
                    isError: wallet.isError,
                    errorMessage: wallet.errorMessage,
                    isSuccess: wallet.isSuccess,
                    successMessage: wallet.successMessage
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
                    searchResults: wallet.searchResults,
                    disconnecting: wallet.disconnecting,
                    isError: wallet.isError,
                    errorMessage: wallet.errorMessage,
                    isSuccess: wallet.isSuccess,
                    successMessage: wallet.successMessage
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
                    searchResults: wallet.searchResults,
                    disconnecting: wallet.disconnecting,
                    isError: wallet.isError,
                    errorMessage: wallet.errorMessage,
                    isSuccess: wallet.isSuccess,
                    successMessage: wallet.successMessage

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
                    searchResults: wallet.searchResults,
                    disconnecting: false,
                    isError: wallet.isError,
                    errorMessage: wallet.errorMessage,
                    isSuccess: wallet.isSuccess,
                    successMessage: wallet.successMessage

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
                    searchResults: payload.searchResults,
                    disconnecting: false,
                    isError: wallet.isError,
                    errorMessage: wallet.errorMessage,
                    isSuccess: wallet.isSuccess,
                    successMessage: wallet.successMessage
                })
            }

            case WalletActionType.SET_SEARCH_RESULTS: {
                return setWallet({
                    connector: wallet.connector,
                    accounts: wallet.accounts,
                    inventory_assets: wallet.inventory_assets,
                    auctions: wallet.auctions,
                    isWallet: wallet.isWallet,
                    currentNFT: wallet.currentNFT,
                    currentAuction: wallet.currentAuction,
                    exploreAuctions: wallet.exploreAuctions,
                    searchResults: payload.searchResults,
                    disconnecting: wallet.disconnecting,
                    isError: wallet.isError,
                    errorMessage: wallet.errorMessage,
                    isSuccess: wallet.isSuccess,
                    successMessage: wallet.successMessage

                })
            }
            case WalletActionType.ADD_ERROR_MESSAGE: {
                return setWallet({
                    connector: wallet.connector,
                    accounts: wallet.accounts,
                    inventory_assets: wallet.inventory_assets,
                    auctions: wallet.auctions,
                    isWallet: wallet.isWallet,
                    currentNFT: wallet.currentNFT,
                    currentAuction: wallet.currentAuction,
                    exploreAuctions: wallet.exploreAuctions,
                    searchResults: wallet.searchResults,
                    disconnecting: wallet.disconnecting,
                    isError: true,
                    errorMessage: payload.errorMessage,
                    isSuccess: wallet.isSuccess,
                    successMessage: wallet.successMessage

                })
            }

            case WalletActionType.REMOVE_ERROR_MESSAGE: {
                return setWallet({
                    connector: wallet.connector,
                    accounts: wallet.accounts,
                    inventory_assets: wallet.inventory_assets,
                    auctions: wallet.auctions,
                    isWallet: wallet.isWallet,
                    currentNFT: wallet.currentNFT,
                    currentAuction: wallet.currentAuction,
                    exploreAuctions: wallet.exploreAuctions,
                    searchResults: wallet.searchResults,
                    disconnecting: wallet.disconnecting,
                    isError: false,
                    errorMessage: "",
                    isSuccess: wallet.isSuccess,
                    successMessage: wallet.successMessage

                })
            }

            case WalletActionType.ADD_SUCCESS_MESSAGE: {
                return setWallet({
                    connector: wallet.connector,
                    accounts: wallet.accounts,
                    inventory_assets: wallet.inventory_assets,
                    auctions: wallet.auctions,
                    isWallet: wallet.isWallet,
                    currentNFT: wallet.currentNFT,
                    currentAuction: wallet.currentAuction,
                    exploreAuctions: wallet.exploreAuctions,
                    searchResults: wallet.searchResults,
                    disconnecting: wallet.disconnecting,
                    isError: wallet.isError,
                    errorMessage: wallet.errorMessage,
                    isSuccess: true,
                    successMessage: payload.successMessage

                })
            }

            case WalletActionType.REMOVE_SUCCESS_MESSAGE: {
                return setWallet({
                    connector: wallet.connector,
                    accounts: wallet.accounts,
                    inventory_assets: wallet.inventory_assets,
                    auctions: wallet.auctions,
                    isWallet: wallet.isWallet,
                    currentNFT: wallet.currentNFT,
                    currentAuction: wallet.currentAuction,
                    exploreAuctions: wallet.exploreAuctions,
                    searchResults: wallet.searchResults,
                    disconnecting: wallet.disconnecting,
                    isError: wallet.isError,
                    errorMessage: wallet.errorMessage,
                    isSuccess: false,
                    successMessage: ""

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
        if(response.success){
            navigate('/inventory')
        }
        else{
            console.log('something went wrong')
        }
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

    wallet.auctionNFT = async function(startPrice, reserve, duration, description){
        const con = new WalletConnect({
            bridge: "https://bridge.walletconnect.org",
            qrcodeModal: QRCodeModal
        });

        if(con.connected){
            const auctionCreationResponse = await createAuction(con, wallet.accounts, wallet.accounts, wallet.currentNFT.id, reserve, .1, duration)

            console.log(auctionCreationResponse)

            if(auctionCreationResponse && auctionCreationResponse.success){
                const auctionStorageResponse = await api.storeCreatedAuction(auctionCreationResponse.appID, description)

                if(auctionStorageResponse.status === 200){
                    if(auctionStorageResponse.data.success){
                        //wallet.setCurrentAuction(auctionCreationResponse.appID, wallet.accounts)
                        walletReducer({
                            type: WalletActionType.ADD_SUCCESS_MESSAGE,
                            payload: {
                                successMessage: "Auction successfully created!"
                            }
                        })
                    }
                    else{
                        walletReducer({
                            type: WalletActionType.ADD_ERROR_MESSAGE,
                            payload: {
                                errorMessage: auctionStorageResponse.error.message
                            }
                        }) 
                    }
                }
            }

            else if(auctionCreationResponse){
                walletReducer({
                    type: WalletActionType.ADD_ERROR_MESSAGE,
                    payload: {
                        errorMessage: auctionCreationResponse.error.message
                    }
                })
            }
        }
    }


    // this is usually called before entering the auction page, general info like NFT being sold, seller, highest current bid etc etc
    wallet.setCurrentAuction = async function(auctionID){
        // check whether auction is own auction
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
            if(backendResponse.data.success){
                walletReducer({
                    type: WalletActionType.ADD_SUCCESS_MESSAGE,
                    payload: {
                        successMessage: "Auction successfully ended! NFT's and Algo's have been sent to their rightful owners"
                    }
                })
            }
            else{
                walletReducer({
                    type: WalletActionType.ADD_ERROR_MESSAGE,
                    payload: {
                        errorMessage: backendResponse.data.error.message
                    }
                })
            }
        }
        else{
            walletReducer({
                type: WalletActionType.ADD_ERROR_MESSAGE,
                payload: {
                    errorMessage: response.error.message
                }
            })
        }

    }

    wallet.sellNFT = async function(price, duration){
        const response = await api.testPython()

        console.log(response.data)

        //const response = await api.listNFTSale(wallet.currentNFT.id, price, duration)
    }

    wallet.getExploreAuctions = async function() {
        const response = await api.getExploreAuctions("")

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

    wallet.searchAuctions = async function(searchTerm) {
        const response = await api.getExploreAuctions(searchTerm)

        if(response.status === 200){
            if(response.data.success){

                let searchResults = response.data.auctions

                walletReducer({
                    type: WalletActionType.SET_SEARCH_RESULTS,
                    payload: {
                        searchResults: searchResults
                    }
                })
                localStorage.setItem('searchTerm', searchTerm)
                navigate('/search')
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

    wallet.clearApps = async function() {
        const response = await clearApps(wallet.accounts);
    }

    wallet.refreshPage  = async function(nftUrl, walletID, auctionID, searchTerm) {
        const response = await api.getExploreAuctions("")

        if(response.status === 200){
            if(response.data.success){
                let searchResults = []

                if(searchTerm !== null){
                    const searchResponse = await api.getExploreAuctions(searchTerm)
                    searchResults = searchResponse.data.auctions
                }

                let exploreAuctions = response.data.auctions
                let currentNFT = (nftUrl !== null ? {url: nftUrl, 
                                    name: localStorage.getItem("currentNFTName"), 
                                    amount: localStorage.getItem("currentNFTAmount"), 
                                    id: localStorage.getItem("currentNFTId")} : null)

                
                let auction = null
                if(auctionID !== null){
                    auction = await getAuctionDetails(auctionID)
                }
                
                walletReducer({
                    type: WalletActionType.REFRESH_PAGE,
                    payload: {
                        exploreAuctions: exploreAuctions,
                        currentNFT: currentNFT,
                        accounts: walletID,
                        currentAuction: auction,
                        searchResults: searchResults

                    }
                })


            }
        }
    }

    wallet.placeBid = async function(offer) {
        const response = await bidOnAuction(wallet.currentAuction, wallet.accounts, parseFloat(offer))
        if(response.success){
            walletReducer({
                type: WalletActionType.ADD_SUCCESS_MESSAGE,
                payload: {
                    successMessage: "Bid placed successfully!"
                }
            })
        }
        else{
            walletReducer({
                type: WalletActionType.ADD_ERROR_MESSAGE,
                payload: {
                    errorMessage: response.error.message
                }
            })
        }

    }

    wallet.removeErrorMessage = function() {
        walletReducer({
            type: WalletActionType.REMOVE_ERROR_MESSAGE,
            payload: {

            }
        })
    }

    wallet.removeSuccessMessage = function() {
        walletReducer({
            type: WalletActionType.REMOVE_SUCCESS_MESSAGE,
            payload: {

            }
        })
        navigate('/')
    }

    // consolidated refresh into one call

    useEffect(() => {
        const currentNFTUrl = localStorage.getItem("currentNFTUrl");
        const currentWallet = localStorage.getItem("wallet");
        const currentAuctionID = localStorage.getItem("currentAuctionID");
        const currentSearchTerm = localStorage.getItem("searchTerm")
        //const exploreAuctions = localStorage.getItem("exploreAuctions")
        wallet.refreshPage((currentNFTUrl ? currentNFTUrl : null),
                             (currentWallet ? currentWallet : null),
                             (currentAuctionID ? currentAuctionID : null),
                             (currentSearchTerm ? currentSearchTerm : null))
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
