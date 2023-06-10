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