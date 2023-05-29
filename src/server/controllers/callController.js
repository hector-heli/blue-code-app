/* eslint-disable no-unused-vars */
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
    const call = await Call.findById(req.params.callId);
    res.status(201).Calljson(call);
  } catch (err) {
    console.error(err.message);
  }
};