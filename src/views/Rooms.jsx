/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Room from '../components/Room'

const Rooms = () => {
  const [ rooms, setRooms ] = useState([]);
  const [ calls, setCalls ] = useState([]);

  const roomsNumber = 12;

  // Función para obtener todos los llamados
  
  useEffect(() => {
    addRooms();

    const fetchData = async () => {
      const data = await getAllCalls();
      setCalls(data);
    };
    fetchData();
  }, []);

  
   useEffect(() => {
    const intervalId = setInterval(() => {
      const fetchData = async () => {
        const data = await getAllCalls();
        setCalls(data);

      };
      fetchData();
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addRooms = () => {
    const newRooms = [];
    for (let i = 1; i <= roomsNumber; i++) {
      newRooms.push('Hab' + String(i));
    }
    setRooms(newRooms);
  };

  const getAllCalls = async () => {
    try {
      const response = await axios.get('http://localhost:3000/calls');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  const findCall = (room) => {
    let result = calls.findLast(({data})=> data.Room === room )
    result === undefined 
    ? result = { epochTime:0,Room:room, codeAlarm:"",   activateTime:null}
    : result = result.data
    return (result)
  }

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

export default Rooms
