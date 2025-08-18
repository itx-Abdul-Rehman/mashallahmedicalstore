import dotenv from 'dotenv';
dotenv.config();

const PORT=process.env.PORT;

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { adminMedicine } from './route/admin-medicine.js';
import { userMedicine } from './route/user-medicines.js';
const app = express();


//cors configuration
app.use(cors({
    origin: process.env.CLIENT_URL ,
    credentials: true
}));

//body-parser
app.use(express.json({limit: '10mb'}));

app.use('/api',adminMedicine)
app.use('/api',userMedicine)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../Frontend/dist')));

app.get('/*name', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/dist', 'index.html'));
});

//server running on this
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:5000");
});
