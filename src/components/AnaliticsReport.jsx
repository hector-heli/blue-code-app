/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext }  from "react";
import { DataTable, Box, Text, CheckBoxGroup } from "grommet";
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
    property: "room",
    header: <Text>Habitación</Text>,
  },

  {
    property: "alarmCode",
    header: "Código de Alarma"
  },
  {
    property: "activateTime",
    header: "Hora de Activación"
  },
  {
    property: "incidentCareTime",
    header: "Hora de Cancelación"
  },
  {
    property: "timeElapsed",
    header: "Tiempo de Respuesta"
  },
  {
    property: "report",
    header: "Reporte"
  },
  {
    property: "terminated",
    header: "Finalizado"
  }
];

const AnaliticsReport = () =>{
  const [data, setData] = useState([]);
  const [report, setReport] = useState([]);
  const [queryFlag, setQueryFlag] = useState(false);

  const calls = useContext(CallsContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 4000);

    return () => {
      clearInterval(intervalId);
    }; 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryFlag]);

  const fetchData = async () => {
    const newData = await getAnalitics();
    setData(newData);
  };

  const getAnalitics = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/reports');
        return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  const createAnalitics = async (newData) => {
    console.log( 'creo uno nuevo');
  };

  const updateAnaliticsById = async (id, newData) => {
    try {
      const res = await axios.put(`http://localhost:3000/api/reports/${id}`, newData);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  const newData = 
    data.length === 0
    ? null
    : calls.map(call => {
        //let dataReport = {}
        const newReport = data.findLast(room => room.room === call.data.Room); 
        console.log(newReport);
        //return newReport;
      });

  // console.log(data);


    

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
        data={data}
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
