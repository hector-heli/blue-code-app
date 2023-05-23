/* eslint-disable no-unused-vars */
import { Router } from 'express';

import * as callCtrl from '../controllers/callController.js';

const router = Router();

router.get('/', callCtrl.getCalls);
router.get('/:callId', callCtrl.getCallById)


export default router
