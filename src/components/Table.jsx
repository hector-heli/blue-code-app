/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect }  from "react";
import { DataTable, Box, Meter, Text } from "grommet";

import { epochTimeToDate } from "../epochTimeToDate";


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
  },


  /* {
    property: "Good",
    header: "Good for you",
    render: (datum) => (
      <Box pad={{ vertical: "small" }}>
        <Meter
          values={[{ value: datum.percent }]}
          thickness="small"
          size="small"
          round="true"
        />
      </Box>
    )
  } */
];


const Table = ({calls}) =>{
  const [data, setData] = useState([]);

  useEffect(() =>{
      setData(newData);    
  },[calls]);

  const newData = calls.map((call) => {
    const newCall = {
      Id:  calls.indexOf(call)+1,
      Room: call.data.Room,
      epochTime: epochTimeToDate(call.data.epochTime),
      codeAlarm: call.data.codeAlarm,
      activateTime: epochTimeToDate(call.data.activateTime),
      unactivateTime: epochTimeToDate(call.data.unactivateTime),
      ResponseTime: call.data.responseTime,
      Report: "",
    };
    return newCall;
  });

  return (
    <Box align="center">
      <DataTable
        resizeable={true}
        sortable={true}
        columns={columns}
        data={data}
      />
    </Box>
  );
}

export default Table
