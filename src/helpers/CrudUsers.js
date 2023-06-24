import axios from 'axios';

export const getUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/users');
    return response.data;

  } catch (error) {
    console.error('Ocurrió un error en la solicitud:', error);
  }
};

export const createNewUser = async(newUser) => {
  try {
    await axios.post('http://localhost:3000/api/auth/signup', newUser, { timeout: 5000 })
    .then ((response) => console.log(response.data)) ;

  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('La solicitud fue cancelada.');
    } else if  (error.code === 'ECONNABORTED') {
      console.log('La solicitud fue abortada debido a un tiempo de espera excedido.');
    } else {
      console.error('Ocurrió un error en la solicitud:', error);
    }
  }
};

export const updateUser = async (user) => {
  //console.log(user.id);
  try {
    await axios.put(`http://localhost:3000/api/users/${user.userId}`, user, { timeout: 5000 })
    .then ((response) => {
      console.log(response.data)})
    .catch (error => console.error('Ocurrió un error em la solicitud:', error))

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

export const deleteUser = async(userId) => {
  try {
    await axios.delete(`http://localhost:3000/api/users/${userId}`);
    console.log('Borrado exitoso');
    // Puedes realizar alguna acción adicional después de borrar los datos
  } catch (error) {
    console.error('Error al borrar los datos', error);
    // Manejar el error de acuerdo a tus necesidades
  }

};
