// eslint-disable-next-line no-unused-vars
import Shift from '../models/Schedule.js';

export const createShift = (req, res) => {

  res.json('creating shift')
}

export const getSchedule = (req, res) => {
  res.json('getting all Schedule')
}

export const getShiftById = (req, res) => {
  res.json('getting a shift')
}

export const updateShiftById = (req, res) => {
  res.json('updating a shift')
}

export const deleteShiftById = (req, res) => {
  res.json('deleting a shift')
}