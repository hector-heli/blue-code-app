import axios from "axios";

const getAllCalls = async () => {
  try {
    const calls = await axios.get('http://localhost:3000/calls');
    return calls.data;
  } catch (error) {
    console.error(error);
  }
}

export default getAllCalls; 