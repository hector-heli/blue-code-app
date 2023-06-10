/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useCallback }  from "react";
import { DataTable, Box, Text, CheckBoxGroup } from "grommet";


import { epochTimeToDate } from "../epochTimeToDate";
import { CallsContext } from "../ContextProvider";
import { getAnalitics, updateAnaliticsById } from "../helpers/CrudAnaliticsReports";

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
  const calls = useContext(CallsContext);

  let dataTable = [];

  useEffect(() => {
    //const intervalId = setInterval(() => {
      if (data.length === 0) fetchData();
    //}, 4000);

    /* return () => {
      clearInterval(intervalId);
    }; */ 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = useCallback(async () => {
    const newData = await getAnalitics();
    setData(newData);
  }, []);

  
  const timeElapsedFunction = (initDate, finalDate) => {
      const date1 = new Date(finalDate);
      const date2 = new Date(initDate); 
  
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
  
      //console.log(`La diferencia entre las fechas es de ${differenceInMinutes} días.`);
      return differenceInMinutes;
    }

  const newData = 
    calls.map(call => {
      let newDataReport = {};
      const dataReport =  data.findLast(report => report.room === call.data.Room);
      console.log(dataReport);
      
      if (dataReport === undefined || dataReport.alarmCode[dataReport.alarmCode.length-1] === 'cancel') {
        console.log('Nuevo registro')
        newDataReport = {
          room: call.data.Room,
          alarmCode: [call.data.codeAlarm],
          activateTime: [epochTimeToDate(call.data.epochTime)],
          incidentCareTime: null,
          timeElapsed: null,
          report: '',
          terminated: false
        };

      } else {
        console.log('actualiza registro');
        newDataReport = {
          room: call.data.Room,
          alarmCode: [...dataReport.alarmCode, call.data.codeAlarm].toString(),
          activateTime: call.data.codeAlarm === 'cancel'
            ? [dataReport.activateTime]
            : epochTimeToDate(call.data.epochTime),
          incidentCareTime : call.data.codeAlarm === 'cancel'
            ? epochTimeToDate(call.data.epochTime)
            : null,
          timeElapsed : call.data.codeAlarm === 'cancel'
          ? timeElapsedFunction (epochTimeToDate(call.data.epochTime), dataReport.activateTime[0])
          : null,
          report: '',
          terminated: false
        }
      }
      // setData([...data, newDataReport]);
      //console.log(newDataReport);
      return newDataReport;
    });

    dataTable = newData;


  return (
    <Box align="center">
      <DataTable
        resizeable={true}
        sortable={true}
        columns={columns}
        data={dataTable}
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
