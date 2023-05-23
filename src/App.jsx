// eslint-disable-next-line no-unused-vars
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from './components/NavBar'
import './App.css'
import Rooms from './views/Rooms'
import Report from "./views/Report";
import Footer from './components/Footer'
//import PruebaComponente from './components/PruebaComponente'

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element = {<Rooms />} />
          <Route path='/reports' element = {<Report /> } />
        </Routes>
        <Footer />
      </Router>
    </div>

    
  )
}

export default App
