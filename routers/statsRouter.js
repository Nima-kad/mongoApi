import express from 'express';
import {getAverageHpController, getTopTypesController } from '../controllers/statsController.js';

const router = express.Router();

router.get('/hp/average', getAverageHpController);
router.get('/types/top', getTopTypesController);

export default router;
