import admin from 'firebase-admin';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccount = JSON.parse(fs.readFileSync(
 path.join(__dirname, 'Firebase-Service-Key/mashallahmedicalstore-36181-firebase-adminsdk-fbsvc-ce40eef768.json')));

//Firebase setup
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

export const database = db;