// eslint-disable-next-line no-unused-vars
import React from 'react'

import './App.css'
import Rooms from './views/Rooms'
import Header from './components/header'
import Footer from './components/Footer'
//import PruebaComponente from './components/PruebaComponente'

function App() {
  return (
    <div className='root'>
      <Header />
      <h1>Estado de habitaciones</h1>
      {/*<PruebaComponente />*/}
      <Rooms /> <br />
      <Footer />
      
    </div>
  )
}

export default App
