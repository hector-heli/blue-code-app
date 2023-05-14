/* eslint-disable no-unused-vars */
import express from 'express';

import Call from '../models/call-model.js';

const callRouter = express.Router();

callRouter.get('/', async (req, res) => {
  try {
    const calls = await Call.find();
    res.json(calls);
  } catch (err) {
    console.error('err.message');
  }
});

export default callRouter
