import axios from "axios";

const getAllCalls = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/calls');
      if (res.data !== []) return res.data;
      // return response.data;

    } catch (error) {
      console.error(error);
    }
  }


export default getAllCalls; 