import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Desktop from './Components/Desktop'
import Inventory from './Components/Inventory'
import Explore from './Components/Explore'
import ExploreCategories from './Components/ExploreComponents/ExploreCategories'
import Account from './Components/Account'
import Navbar from './Components/Navbar'

function App() {
  /*
  const [message, setMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState('/api');

  const fetchData = useCallback(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        setMessage(json.message);
        setIsFetching(false);
      }).catch(e => {
        setMessage(`API call failed: ${e}`);
        setIsFetching(false);
      })
  }, [url]);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);
  */

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path = "/" element = {<Desktop/>} />
        <Route path = "/inventory" element = {<Inventory/>} />
        <Route path = "/explore" element = {<ExploreCategories/>} />
        <Route path = "/account" element = {<Account/>} />
      </Routes>
      
    </BrowserRouter>
  )
}

export default App;
