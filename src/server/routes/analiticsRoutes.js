import {Router} from "express";

import * as analiticsCtrl from '../controllers/analiticsController.js'

const router = Router()

router.get('/', analiticsCtrl.getAnalitics);
router.post('/', analiticsCtrl.createAnalitics);
router.get('/:reportId', analiticsCtrl.getAnaliticsById);
router.put('/:reportId', analiticsCtrl.updateAnaliticsById);
router.delete(':/reportId', analiticsCtrl.deleteAnaliticsById);

export default router;