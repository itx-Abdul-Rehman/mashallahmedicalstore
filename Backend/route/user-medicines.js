import express from 'express'
const router = express.Router();
import handleGetUserMedicines from '../controllers/getmedicine.js';


router.get('/get/medicines', handleGetUserMedicines)


export const userMedicine= router;
