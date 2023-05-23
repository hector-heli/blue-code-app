/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';

function Table( {calls} ) {
  return (
    <Table striped bordered hover variant="dark" className='table'>
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
    </Table>
  );
}

export default Table;