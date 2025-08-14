import admin from 'firebase-admin';
import serviceAccount from './Firebase-Service-Key/mashallahmedicalstore-36181-firebase-adminsdk-fbsvc-ce40eef768.json'; 

//Firebase setup
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

export const database = db;