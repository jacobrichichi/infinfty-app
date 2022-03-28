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
            </Routes>
          </WalletContextProvider>
        </AuthContextProvider>
        
    </BrowserRouter>
  )
}

export default App;
