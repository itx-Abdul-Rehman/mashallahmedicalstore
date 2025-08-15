import express from 'express'
const router = express.Router();
import {handleGetUserMedicines,handleSearchMedicines} from '../controllers/getmedicine.js';
import handleDeleteMedicines from '../controllers/deletemedicine.js';

router.get('/get/medicines', handleGetUserMedicines)
router.get('/search/medicines',handleSearchMedicines) 
router.delete('/delete/medicine/',handleDeleteMedicines)


export const userMedicine= router;
