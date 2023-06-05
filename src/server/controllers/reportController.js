// eslint-disable-next-line no-unused-vars
import Report from '../models/Report.js';

export const createReport = async(req, res) => {
  try {
// Obtener los datos del cuerpo de la solicitud POST
    const { room, alarmCode, activateTime, incidentCareTime, timeElapsed, report, terminated } = req.body;

    // Crear un nuevo objeto Report con los datos recibidos
    const newReport = new Report({
      room, alarmCode, activateTime, incidentCareTime, timeElapsed, report, terminated
    });

    // Guardar el nuevo informe en la base de datos
    const savedReport = await newReport.save();

    res.json(savedReport);
  } catch (err) {
    console.error(err.message);
  }
}

export const getReport = async(req, res) => {
  try {
    const analitics = await Report.find();
    res.json(analitics);
  } catch (err) {
    console.error('err.message');
  }
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