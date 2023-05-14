/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PruebaComponente = () => {
  const [ calls, setCalls ] = useState([])

  // Función para obtener todos los usuarios
  useEffect((calls) => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/calls');
        setCalls(response.data);
        console.log(calls);
      } catch (error) {
        console.error(error);
      }
    }
    // getAllUsers()
   }, [])


  // Función para crear un nuevo usuario
  const createUser = async (user) => {
    try {
      const response = await axios.post('http://localhost:3000/users', user);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  // Función para actualizar un usuario existente
  const updateUser = async (id, updatedUser) => {
    try {
      const response = await axios.put(`http://localhost:3000/users/${id}`, updatedUser);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  // Función para eliminar un usuario
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='card'>
      <table className='table'>
        <thead>
          <tr>
            <th> timeStamp </th>
            <th> Tipo </th>
            <th> Respuesta </th>
            <th> Atendió </th>
            <th> Responsable </th>
          </tr>
        </thead>
        <tbody>
          { calls.map( call => (
            <tr key={call._id}>
              <td> {call.data.epochTime} </td>
              <td> {call.data.Calltype} </td>
              <td> {call.data.ElapsedTime} </td>
              <td> {call.data.DesactivedBy} </td>
              <td> {call.data.Responsable} </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div> 
  )
}

export default PruebaComponente
