/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Room from '../components/Room'

const Report = () => {
  
  return (
    <div className='row'>
      {rooms.map((room) => (
        <div className="card " key={room}>
        
          <Room
            call={findCall(room)}
            room={room}
          />

        </div> 
      ))}
    </div>
  )
}

export default Report
