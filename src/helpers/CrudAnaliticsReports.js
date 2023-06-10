import axios from 'axios';


export const getAnalitics = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/reports');
        return res.data;
    } catch (error) {
      console.error(error);
    }
  }

/* export  const createAnalitics = async (newData) => {
    console.log( 'creo uno nuevo');
  };
 */
export  const updateAnaliticsById = async (id, newData) => {
    try {
      const res = await axios.put(`http://localhost:3000/api/reports/${id}`, newData);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  }
