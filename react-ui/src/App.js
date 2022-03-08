import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Desktop, Explore, Inventory } from "./Components"

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
      <Switch>
        <Route path = "/" exact component = {Desktop} />
        <Route path = "/inventory" exact component = {Inventory} />
        <Route path = "/explore" exact component = {Explore} />
        <Inventory />
      </Switch>
      
    </BrowserRouter>
  )
}

export default App;
