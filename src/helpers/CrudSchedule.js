import axios from 'axios';

export const getSchedule = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/schedule');
    //console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Ocurrió un error en la solicitud:', error);
  }
};

export const createNewShift = async(newShift) => {
  //console.log(newShift);

  try {
    // eslint-disable-next-line no-unused-vars
    const shiftCreated = await axios.post('http://localhost:3000/api/schedule', newShift, { timeout: 5000 });

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

export const updateShift = async(user) => {
  //console.log(user.id);
  try {
    await axios.put(`http://localhost:3000/api/schedule/${user.userId}`, user, { timeout: 5000 })
    .then ((res) => {
      console.log(res.data)})
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

export const deleteShift = async(userId) => {
  try {
    await axios.delete(`http://localhost:3000/api/schedule/${userId}`);
    console.log('Borrado exitoso');
    // Puedes realizar alguna acción adicional después de borrar los datos
  } catch (error) {
    console.error('Error al borrar los datos', error);
    // Manejar el error de acuerdo a tus necesidades
  }

};
