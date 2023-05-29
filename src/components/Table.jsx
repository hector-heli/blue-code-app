/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

/*Diseño basado en:  https://blueprintjs.com/docs/#table */

import React from 'react';
import { HotkeysProvider } from "@blueprintjs/core";
import { Column, Table2 } from "@blueprintjs/table";

const Tables = ( {calls} ) => {
  (() => console.log(Object.keys(calls).length))();

  return (
    <div>
      <HotkeysProvider>
        <Table2 numRows= {5}>
        <Column name="Habitación" />
        <Column name="Código Alarma"/>
        <Column name="Hora Activación"/>
        <Column name="Hora Cancelación"/>
        <Column name="Tiempo de respuesta"/>

      </Table2>
      </HotkeysProvider>
      
      {/* <Table striped bordered hover variant="dark" className='table'>
      <thead>
        <tr>
          <th>#</th>
          <th>Habitación</th>
          <th>Código de Alarma</th>
          <th>Hora de activación</th>
          <th>Hora de cancelación</th>
          <th>Tiempo de respuesta</th>
          <th>Reporte</th>

        </tr>
      </thead>
      <tbody>
        { calls.map( call => (
          <tr key={call.epochTime}>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        ))}
      </tbody>
    </Table> */}
    </div>
    
  );
}

export default Tables;