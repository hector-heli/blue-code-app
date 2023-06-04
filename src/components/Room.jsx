/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React,{ useState, useEffect } from 'react'
import { epochTimeToDate } from '../epochTimeToDate'

const Room = ( {call} ) => {

  const [backgroundColor, setBackgroundColor] = useState(true);
  const [bgColor, setBgColor] = useState(call.codeAlarm); 

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundColor(!backgroundColor);
      changeBgColor(backgroundColor);
    }, 1000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bgColor, backgroundColor]);

  const changeBgColor = (backgroundColor) => {
    switch (call.codeAlarm) {
      case 'blue':
        setBgColor('rgb(67, 122, 184)')
        break;
      case 'green':
        setBgColor('aquamarine')
        break;
      case 'bath':
        setBgColor('LightPink')
        break;  
      case 'cancel':
        setBgColor('transparent')
        break; 
    }
      backgroundColor ? setBgColor() : setBgColor('transparent')  
  }


  return (
    <div className={call.codeAlarm} style={{ background: bgColor }}>
      <h2>{ call.Room }</h2>
      <ul>
        <li> <strong>Hora de activación: </strong><br/>{ isNaN(epochTimeToDate(call.activateTime)) ? epochTimeToDate(call.activateTime) : "" }</li>
        <li> <strong>Cancelado: </strong> <br/>{ epochTimeToDate(call.unactivateTime) }</li>
      </ul>
    </div>
  )
}

export default Room
