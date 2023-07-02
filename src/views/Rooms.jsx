/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';

import Room from '../components/Room'
import { epochTimeToDate } from '../server/libs/epochTimeToDate';
import { CallsContext } from '../ContextProvider';

const Rooms = () => {
  const calls = useContext(CallsContext);
  const [data, setData] = useState([]);
  const [ rooms, setRooms ] = useState([]);

  const roomsNumber = 10;

  // Función para obtener todos los llamados
  
  useEffect(() => {
    addRooms();
  }, []);

  useEffect(() => {
      setData(newData);
      //console.log(data);
  }, [data]);

  const newData = calls.map((call) => {
    const newCall = {
      Id: calls.indexOf(call) + 1,
      Room: call.data.Room,
      epochTime: ((call.data.epochTime)*1000),
      codeAlarm: call.data.codeAlarm,
      activateTime: ((call.data.activateTime)*1000),
      unactivateTime: ((call.data.unactivateTime)*1000),
    };
    return newCall;
  });

  const addRooms = () => {
    const newRooms = [];
    for (let i = 1; i <= roomsNumber; i++) {
      newRooms.push('Hab' + String(i));
    }
    setRooms(newRooms);
  };

  const findCall = (room) => {
    let result = calls.findLast(({data})=> data.Room === room )
    result === undefined 
    ? result = { epochTime:0,Room:room, codeAlarm:"",   activateTime:null}
    : result = result.data
    return (result)
  }

  return (
    <div className='row page'>
      <h1> Estado de las habitaciones </h1>
      {rooms.map((room) => (
        <div className="card " key={room}>
          <Room
            call={findCall(room)}
          />

        </div> 
      ))}
    </div>
  )
}

export default Rooms
