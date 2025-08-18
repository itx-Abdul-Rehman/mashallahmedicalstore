import dotenv from 'dotenv';
dotenv.config();

import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_KEY);

//Firebase setup
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const db = admin.firestore();

export const database = db;
export const adminAuth = admin.auth();