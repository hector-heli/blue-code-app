/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext }  from "react";
import { DataTable, Box, Text, CheckBox } from "grommet";
import axios from "axios";

import { epochTimeToDate } from "../epochTimeToDate";
import { CallsContext } from "../ContextProvider";


const columns = [
  {
    property: "Id",
    header: <Text>Id</Text>,
    primary: true
  },
  {
    property: "Room",
    header: <Text>Habitación</Text>,
  },

  {
    property: "codeAlarm",
    header: "Código de Alarma"
  },
  {
    property: "epochTime",
    header: "Hora de Activación"
  },
  {
    property: "unactivateTime",
    header: "Hora de Cancelación"
  },
  {
    property: "ResponseTime",
    header: "Tiempo de Respuesta"
  },
  {
    property: "Report",
    header: "Reporte"
  }
];

const AnaliticsReport = () =>{
  const [data, setData] = useState([]);
  //const [analiticsData, setAnaliticsData] = useState([]);
  const calls = useContext(CallsContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 4000);
    return () => {
      clearInterval(intervalId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setInterval]);

  const fetchData = async () => {
    const newData = await getAnalitics();
    setData(newData);
  };

  const getAnalitics = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/reports');
        return res.data;
      // return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  const createAnalitics = async (newData) => {
    console.log( 'creo uno nuevo');
  };

  const updateAnaliticsById = async (id, data) => {
    console.log( 'actualizo existente ' + id);
  }

  const newData = () => {
      calls.map((call) => {
      let newReport = {};
      console.log( data.find({"room":call.data.Room}) );

      if (data.findLast({"room":call.data.Room}).alarmCode === 'cancel' || !data.findLast({"room":call.data.Room})) {
        newReport = {
          Room:   call.data.Room,
          epochTime: epochTimeToDate(call.data.epochTime),
          codeAlarm: call.data.codeAlarm,
          activateTime: epochTimeToDate(call.data.activateTime),
          unactivateTime: epochTimeToDate(call.data.unactivateTime),
          ResponseTime: call.data.responseTime,
          Report: "",
        };
        createAnalitics(data.findLast({"room":call.data.Room})._id, newReport);
        return newReport;
      } else {
        newReport = {
          Room:   call.data.Room,
          epochTime: epochTimeToDate(call.data.epochTime),
          codeAlarm: [
            ...data.findLast({"room":call.data.Room}).codeAlarm, 
            call.data.codeAlarm
          ],
          activateTime: [
            ...data.findLast({"room":call.data.Room}).codeAlarm, 
            epochTimeToDate(call.data.activateTime)
          ],
          unactivateTime: epochTimeToDate(call.data.unactivateTime),
          ResponseTime: timeElapsed(epochTimeToDate(call.data.unactivateTime),epochTimeToDate(call.data.activateTime))
        };
        updateAnaliticsById(newReport);
        return newReport;
      }
    })
  };

  



  

  

  const timeElapsed = (date1, date2) => {
  /*   const date1 = new Date('2023-06-01');
    const date2 = new Date('2023-06-04'); */

    // Restar las fechas para obtener la diferencia en milisegundos
    const differenceInMilliseconds = date2 - date1;

    // Calcular la diferencia en segundos
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

        // Calcular la diferencia en minutos
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);

    // Calcular la diferencia en horas
    const differenceInHours = Math.floor(differenceInMinutes / 60);

    // Calcular la diferencia en días
    const differenceInDays = Math.floor(differenceInHours / 24);

    console.log(`La diferencia entre las fechas es de ${differenceInMinutes} días.`);
  }

  return (
    <Box align="center">
      <DataTable
        resizeable={true}
        sortable={true}
        columns={columns}
        data={newData}
        background={{ 
          header: "dark-2",
          body: ["white", "light-2"],
          footer: { 
              dark: "light-2", 
              light: "dark-3" 
          }
        }}
      />
    </Box>
  );
}

export default AnaliticsReport
