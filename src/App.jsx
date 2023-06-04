/* eslint-disable no-unused-vars */
import React, {useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';

import './App.css';
import { history } from './helpers/history.js';

import Rooms from './views/Rooms';
import Login from './views/Login'
import Report from './views/Reports';
import NavBar from './components/NavBar';
import Footer from './components/Footer'
import { CallsContext } from './ContextProvider';
// import RouteGuard from "./components/RouteGuard"


//import PruebaComponente from './components/PruebaComponente'

const App = () => {
  const [ calls, setCalls ] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 4000);
    return () => {
      clearInterval(intervalId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    const data = await getAllCalls();
    setCalls(data);
  };

  const getAllCalls = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/calls');
      if (response.data !== []) return response.data;
      // return response.data;

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CallsContext.Provider value={calls}>
      <Router history={history}>
        <NavBar />
        <Routes>
          <Route path='/' element = {<Rooms />} />
          <Route path='/reports' element = {<Report/> } />
          <Route path='/login' element = {<Login /> } />
        </Routes>

        <Footer />
      </Router>
    </CallsContext.Provider>
   
  )
}

export default App
