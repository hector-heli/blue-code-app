/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { get } from 'mongoose'

import { epochTimeToDate } from '../server/libs/epochTimeToDate'

const PruebaComponente = () => {
  const [ calls, setCalls ] = useState([])
  const [ date, setDate ] = useState('')

  // Función para obtener todos los usuarios
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCalls();
      setCalls(data);
    };
    fetchData();
  }, [date]);

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
        <div className={call.data.CallType === 'blue'? 'card blue' : 'card' } key={call._id}>
          <p> {call.data.Room} </p>
          <p> {epochTimeToDate(call.data.epochTime)} </p>
          <p> {call.data.codeAlarm} </p>
          <p> {epochTimeToDate(call.data.activateTime)} </p>
          <p> {call.data.Responsable} </p>
        </div>
      ))};
    </div> 
  )
}

export default PruebaComponente
