import express from 'express'
const router = express.Router();
import multer from "multer";
import handleAddMedicine from '../controllers/addmedicine.js';
import handleUpdateMedicines from '../controllers/updatemedicine.js';
import { handleLogin,handleSignup, handleLogout } from '../controllers/authentication.js';



// Configure multer
const upload = multer({ dest: "uploads/",limits: { fileSize: 5 * 1024 * 1024 } });


router.post('/medicine/add', upload.single("image"), handleAddMedicine);
router.put('/medicine/update', upload.single("image"), handleUpdateMedicines);
router.post('/admin/login',handleLogin)
router.post('/admin/signup',handleSignup)
router.get('/admin/logout',handleLogout)


export const adminMedicine= router;
