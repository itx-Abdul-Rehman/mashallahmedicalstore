import { database } from '../Database-Connection/Firebase.js'


const handleGetUserMedicines = async (req, res) => {
    try {
        const { page, itemsPerPage, selectedCategory, lastDocId } = req.query;

        const limit = parseInt(itemsPerPage);

        let snapshot = null;
        let medicines = [];
        let query = null;

        if (selectedCategory === 'All') {
            query = database.collection("medicines")
                .orderBy("name");

            if (page && page > 1) {
                if (lastDocId) {
                    const lastDocRef = await database.collection("medicines").doc(lastDocId).get();
                    if (lastDocRef.exists) {
                        query = query.startAfter(lastDocRef).limit(limit);
                    } else {
                        query = query.limit(limit);
                    }
                } else {
                    query = query.limit(limit);
                }
            } else {
                query = query.limit(limit);
            }

            snapshot = await query.get();
            medicines = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));


        } else {
            query = database.collection("medicines")
                .where("category", "==", selectedCategory)
                .orderBy("name");

            if (page && page > 1) {
                if (lastDocId) {
                    const lastDocRef = await database.collection("medicines").doc(lastDocId).get();
                    if (lastDocRef.exists) {
                        query = query.startAfter(lastDocRef).limit(limit);
                    } else {
                        query = query.limit(limit);
                    }
                } else {
                    query = query.limit(limit);
                }
            } else {
                query = query.limit(limit);
            }

            snapshot = await query.get();
            medicines = snapshot.docs.
                map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

        }

        const total = snapshot.size;
        const lastVisibleId = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1].id : null;

        res.json({ success: true, medicines, total, lastVisibleId });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch medicines" });
    }
};


export default handleGetUserMedicines;