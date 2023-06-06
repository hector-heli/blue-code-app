// eslint-disable-next-line no-unused-vars
import Report from '../models/Report.js';

export const createReport = async(req, res) => {
    try {
        // Obtener los datos del cuerpo de la solicitud POST
        const { room, alarmCode, activateTime, incidentCareTime, timeElapsed, report, terminated } = req.body;

        // Crear un nuevo objeto Report con los datos recibidos
        const newReport = new Report({
            room,
            alarmCode,
            activateTime,
            incidentCareTime,
            timeElapsed,
            report,
            terminated
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

export const getReportById = async(req, res) => {
    try {
        const analitics = await Report.findById();
        res.json(analitics);
    } catch (err) {
        console.error('err.message');
    }
}

export const updateReportById = async(req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedReport = await Report.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedReport) {
            return res.status(404).json({ error: 'Informe no encontrado' });
        }

        res.json(updatedReport);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error al actualizar el informe' });
    }
};

export const deleteReportById = (req, res) => {
    res.json('deleting a report')
}