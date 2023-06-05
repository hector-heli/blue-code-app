// eslint-disable-next-line no-unused-vars
import Report from '../models/Analitics.js';

export const createanAnaliticsReport = (req, res) => {
  res.json('creating report')
}

export const getAnalitics = (req, res) => {
  res.json('getting all reports')
}

export const getAnaliticsById = (req, res) => {
  res.json('getting a report')
}

export const updateAnaliticsById = (req, res) => {
  res.json('updating a report')
}

export const deleteAnaliticsById = (req, res) => {
  res.json('deleting a report')
}