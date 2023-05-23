/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Table from '../components/Table'

const Reports = () => {
  const [ calls, setCalls ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCalls();
      setCalls(data);
    };
    fetchData();
  }, []);

  const getAllCalls = async () => {
    try {
      const response = await axios.get('http://localhost:3000/calls');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }


  
  return (
    <div className="root page" >
      <h1> Reporte de llamados </h1>
      {/*<Table 
        data={ getAllCalls }
      />*/}
      <table className='table' >
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
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
          <td>3</td>
          <td>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
    </div>
  )
}

export default Reports
