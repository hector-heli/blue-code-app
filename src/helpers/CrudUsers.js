import axios from 'axios';

import { Next } from "react-bootstrap/esm/PageItem";


export const getUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/users');
    if (response.data !== []) return response.data; else Next;
    // return response.data;

  } catch (error) {
    console.error(error);
  }
}

export const createNewUser = async (newUser) => {
  console.log(newUser);

  try {
    const res = await axios.post('http://localhost:3000/api/auth/signup', newUser, {timeout: 5000});
    return res.data;

  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('La solicitud fue cancelada.');
    } else if (error.code === 'ECONNABORTED') {
      console.log('La solicitud fue abortada debido a un tiempo de espera excedido.');
    } else {
      console.error('Ocurrió un error en la solicitud:', error);
    }
  }
}
