import dotenv from "dotenv";
dotenv.config();

import { database } from '../Database-Connection/Firebase.js'
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const handleUpdateMedicines = async (req, res) => {
    const { id, name, description, category, price, pricePerStrip, samename } = req.body;
    const image = req.file;
    
    try {
        let upload = null;

        if (!id || !name || !description || !category || !price || !pricePerStrip) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (samename === "false") {
            const snapshot = await database.collection('medicines')
                .where('name', '==', name).get();

            if (!(snapshot.empty)) {
                return res.json({ success: false, message: "Medicine with this name already exist" });
            }
        }


        if (image != null) {
            upload = await cloudinary.uploader.upload(image.path, {
                folder: "medicines-images",
            })

            fs.unlinkSync(image.path);

            const medicineRef = database.collection("medicines").doc(id);
            await medicineRef.update({
                name,
                description,
                category,
                price,
                pricePerStrip,
                image: upload.secure_url
            });
        } else {
            const medicineRef = database.collection("medicines").doc(id);
            await medicineRef.update({
                name,
                description,
                category,
                price,
                pricePerStrip,
            });
        }

        res.status(200).json({ success: true, message: "Medicine updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update medicine" });
    }
};

export default handleUpdateMedicines;