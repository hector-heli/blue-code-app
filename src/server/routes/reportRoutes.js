import {Router} from "express";

import * as reportCtrl from '../controllers/reportController.js'

const router = Router()

router.get('/', reportCtrl.getReport);
router.post('/', reportCtrl.createReport);
router.get('/:reportId', reportCtrl.getReportById);
router.put('/:reportId', reportCtrl.updateReportById);
router.delete(':/reportId', reportCtrl.deleteReportById);

export default router;