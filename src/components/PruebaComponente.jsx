/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { get } from 'mongoose'

const PruebaComponente = () => {
  const [ calls, setCalls ] = useState([])

  // Función para obtener todos los usuarios
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
    <div className='row'>
      { calls.map( call => (
            <div className='card' key={call._id}>
              <p> {call.data.epochTime} </p>
              <p> {call.data.CallType} </p>
              <p> {call.data.ElapsedTime} </p>
              <p> {call.data.DesactivedBy} </p>
              <p> {call.data.Responsable} </p>
            </div>
          )) }
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
          
        </tbody>
      </table>
    </div> 
  )
}

export default PruebaComponente
