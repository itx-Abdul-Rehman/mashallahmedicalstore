import express from 'express'
const router = express.Router();
import multer from "multer";
import handleAddMedicine from '../controllers/addmedicine.js';
import handleUpdateMedicines from '../controllers/updatemedicine.js';


// Configure multer
const upload = multer({ dest: "uploads/",limits: { fileSize: 5 * 1024 * 1024 } });


router.post('/medicine/add', upload.single("image"), handleAddMedicine);
router.put('/medicine/update', upload.single("image"), handleUpdateMedicines);


export const adminMedicine= router;
