import { Router } from "express";
import { createShift, getSchedule, getShiftById, deleteShiftById, updateShiftById } from "../controllers/scheduleController.js";

const router = Router();

router.post("/", createShift );
router.get('/', getSchedule)
router.get('/:id', getShiftById);
router.delete('/:Id', deleteShiftById);
router.put('/:Id', updateShiftById);

export default router;
