import Call from '../models/Call.js';

export const getCalls = async (req, res) => {
  try {
    const calls = await Call.find();
    res.json(calls);
  } catch (err) {
    console.error('err.message');
  }
};

export const getCallById = async (req, res) => {
  try {
    const calls = await Call.find(callId);
    res.json(call);
  } catch (err) {
    console.error(err.message);
  }
};