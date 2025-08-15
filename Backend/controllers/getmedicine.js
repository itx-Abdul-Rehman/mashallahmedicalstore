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

const handleSearchMedicines = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.json({success:false, message: "Query is required" });
        }

        const snapshot = await database.collection("medicines")
            .orderBy("name")
            .startAt(query)
            .endAt(query + '\uf8ff')
            .get();

        if (snapshot.empty) {
            return res.json({ success: false, message: "No medicines found" });
        }   

        const medicines = snapshot.docs.map((doc) => (
            {
                id: doc.id,
                ...doc.data()
            }
        ))

        res.json({ success: true, medicines });
    } catch (error) {
        res.json({ success: false, message: "Failed to search medicines" });
    }
}

export { handleGetUserMedicines, handleSearchMedicines };