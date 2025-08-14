import dotenv from "dotenv";
dotenv.config();

import {database} from '../Database-Connection/Firebase.js'
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const handleAddMedicine = async (req, res) => {
    const { name, description, category } = req.body;
    const image = req.file;
    console.log(name, description, category);
  

    try {

        if (!name || !description || !category || !image) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(image.path, {
            folder: "medicines-images",
        });
        
        const imageUrl=result.secure_url;
        // Delete local file after upload
        fs.unlinkSync(image.path);

        // Add medicine to the database
        const medicineRef=database.collection('medicines').doc();
        await medicineRef.set({
            name,
            description,
            category,
            image: imageUrl,
        });

       return res.status(201).json({ success: true,
             message: "Medicine added successfully"});
    } catch (error) {
       return res.status(500).json({ error: "Failed to add medicine" });
    }
};

export default handleAddMedicine;
