// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';

import NavBar from './components/NavBar'
import './App.css'
import Rooms from './views/Rooms'
import Report from "./views/Report";
import Footer from './components/Footer'

//import PruebaComponente from './components/PruebaComponente'

const App = () => {
  const [ calls, setCalls ] = useState([]);

 /*  useEffect(() => {
    fetchData();
  }, []); */

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
      const response = await axios.get('http://localhost:3000/calls');
      if (response.data !== []) return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element = {<Rooms calls={calls} />} />
          <Route path='/reports' element = {<Report calls={calls} /> } />
        </Routes>
        <Footer />
      </Router>
    </div>

    
  )
}

export default App
