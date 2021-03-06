import React, { useCallback, useEffect, useState } from 'react';
import './App.css'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { WalletContextProvider } from './wallet-connect'

import Desktop from './Components/SplashPageComponents/Desktop'
import Inventory from './Components/Inventory'
import ExploreCategories from './Components/ExploreComponents/ExploreCategories'
import Account from './Components/Account'
import Navbar from './Components/Navbar'
import CreateSell from './Components/CreateSellComponents/CreateSell';
import ViewNFT from './Components/ViewComponents/ViewNFT';
import SellAuctionNFT from './Components/CreateSellComponents/SellAuctionNFT';
import EditNFT from './Components/EditComponents/EditNFT';
import TwoFactorSetup from './Components/TwoFactor/TwoFactorSetup';
import TwoFactorVerify from './Components/TwoFactor/TwoFactorVerify';
import AuctionInfo from './Components/AuctionInfo';
import SearchResults from './Components/SearchResultComponents/SearchResults';
import SearchPage from './Components/SearchPage';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <WalletContextProvider>
          <Navbar/>
            <Routes>
              <Route path = "/" element = {<Desktop/>} />
              <Route path = "/inventory" element = {<Inventory/>} />
              <Route path = "/explore" element = {<ExploreCategories/>} />
              <Route path = "/account" element = {<Account/>} />
              <Route path = "/create" element = {<CreateSell/>} />
              <Route path = "/view" element = {<ViewNFT/>} />
              <Route path = "/sell" element = {<SellAuctionNFT/>} />
              <Route path = "/edit" element = {<EditNFT/>} />
              <Route path = "/twofactorsetup" element = {<TwoFactorSetup/>} />
              <Route path = "/twofactorverify" element = {<TwoFactorVerify/>}/>
              <Route path = "/auction" element = {<AuctionInfo/>}/>
              <Route path = "/search" element = {<SearchResults/>}/>
            </Routes>
          </WalletContextProvider>
        </AuthContextProvider>
        
    </BrowserRouter>
  )
}

export default App;