// eslint-disable-next-line no-unused-vars
import Report from '../models/Report.js';

export const createReport = (req, res) => {
  res.json('creating report')
}

export const getReport = (req, res) => {
  res.json('getting all reports')
}

export const getReportById = (req, res) => {
  res.json('getting a report')
}

export const updateReportById = (req, res) => {
  res.json('updating a report')
}

export const deleteReportById = (req, res) => {
  res.json('deleting a report')
}