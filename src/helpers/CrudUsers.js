import axios from 'axios';

export const getUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/users');
    return response.data;

  } catch (error) {
    console.error('Ocurrió un error en la solicitud:', error);
  }
};

export const createNewUser = (newUser) => {
  try {
    axios.post('http://localhost:3000/api/users/signup', newUser, { timeout: 5000 })
    .then ((response) => console.log(response.data)) ;

  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('La solicitud fue cancelada.');
    } else if (error.code === 'ECONNABORTED') {
      console.log('La solicitud fue abortada debido a un tiempo de espera excedido.');
    } else {
      console.error('Ocurrió un error en la solicitud:', error);
    }
  }
};

export const updateUser = (user) => {
  try {
    axios.put(`http://localhost:3000/api/users/${user.userId}`, user, { timeout: 5000 })
    .then ((response) => console.log(response.data))
    .catch (error => console.error('Ocurrión un error em la solicitud:', error))

  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('La solicitud fue cancelada.');
    } else if (error.code === 'ECONNABORTED') {
      console.log('La solicitud fue abortada debido a un tiempo de espera excedido.');
    } else {
      console.error('Ocurrió un error en la solicitud:', error);
    }
  }
};
