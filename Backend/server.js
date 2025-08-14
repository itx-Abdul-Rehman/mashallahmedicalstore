import dotenv from 'dotenv';
dotenv.config();

const PORT=process.env.PORT;

import express from 'express';
import cors from 'cors';
const app = express();


//cors configuration
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

//body-parser
app.use(express.json());



//server running on this
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:5000");
});
