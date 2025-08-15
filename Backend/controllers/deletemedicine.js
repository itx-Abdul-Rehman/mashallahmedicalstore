import { database } from "../Database-Connection/Firebase.js";

const handleDeleteMedicines = async (req, res) => {
    try {
        const { id } = req.query;
        
        const isDelete = await database.collection("medicines").doc(id).delete();

        if (!isDelete) {
            return res.status(404).json({ success: false, message: "Medicine not found" });
        }

        res.status(200).json({ success: true, message: "Medicine deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete medicine" });
    }

}

export default handleDeleteMedicines;