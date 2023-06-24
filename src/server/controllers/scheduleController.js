// eslint-disable-next-line no-unused-vars
import Shift from '../models/Shift.js';

export const createShift = async(req, res) => {
  try {
    console.log(req.param.obj);
  
  const { startDate, endDate, chief, doctor } = req.body;

  const newShift = new Shift({
    startDate,
    endDate,
    chief,
    doctor
  })
    const shiftSaved = await newShift.save();
    console.log(shiftSaved);

    return res.json(shiftSaved);
  } catch (error) {
    console.error(error);
  }
}

export const getSchedule = async (req, res) => {
  try {
    const foundShift = await Shift.find(req.params.id);
    return res.json(foundShift);
  } catch (error) {
    console.error(error);
  }
}

export const getShiftById = async(req, res) => {
  try {
    const userId = req.params.id;
    const shiftFound = await Shift.findById(userId);
    res.json(shiftFound)
  } catch (error) {
    console.error(error);
  }
}

export const updateShiftById = async(req, res) => {
  try {
  const shiftUpdated = await Shift.updateOne(
    {_id: req.params.Id},
    { $setOnInsert: req.body }, 
    { new: true, upsert: true } 
  );
  res.json(shiftUpdated);
} catch (error) {
    console.error(error);
  }
}

export const deleteShiftById = async(req, res) => {
  try {
    const deletedShift = await Shift.findByIdAndDelete(req.params.Id);
    if (!deletedShift)
      return res.status(404).json({ message: "Shift not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}