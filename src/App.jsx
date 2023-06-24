/* eslint-disable no-unused-vars */
import React, {useEffect, useState, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';

import './App.css';
import { history } from './helpers/history.js';
import getAllCalls from './helpers/getCalls';

import Rooms from './views/Rooms';
import Login from './views/Login'
import Report from './views/Reports';
import NavBar from './components/NavBar';
import Footer from './components/Footer'
import { CallsContext } from './ContextProvider';

//import PruebaComponente from './components/PruebaComponente'

const App = () => {
  const [ calls, setCalls ] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {

        if(calls.length==0) fetchData();

    }, 500);
    return () => {
      clearInterval(intervalId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calls]);

  const fetchData = useCallback(async () => {
    const data = await getAllCalls();
    setCalls(data)},[]);

  //(() => console.log(calls))();

  return (
    <CallsContext.Provider value={calls}>
      <Router history={history}>
        <NavBar />
        <Routes>
          <Route path='/' element= {<Rooms />} />
          <Route path='/reports' element= {<Report/> } />
          <Route path='/login' element= {<Login /> } />
        </Routes>
        <Footer />
      </Router>
    </CallsContext.Provider>
   
  )
}

export default App
