import express from 'express'
const router = express.Router();
import multer from "multer";
import handleAddMedicine from '../controllers/addmedicine.js';


// Configure multer
const upload = multer({ dest: "uploads/",limits: { fileSize: 5 * 1024 * 1024 } });


router.post('/medicine/add', upload.single("image"), handleAddMedicine);






export const adminMedicine= router;
