import dotenv from 'dotenv';
dotenv.config();

import { auth } from '../Database-Connection/FirebaseAuthentication.js';
import { signInWithEmailAndPassword,signOut,createUserWithEmailAndPassword } from 'firebase/auth';
import { adminAuth } from '../Database-Connection/Firebase.js';

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if(!email || !password){
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();

        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid email or password" });
    }
}

const handleSignup = async (req, res) => {
    const {email, username, password, confirmPassword, accessCode } = req.body;

    try {
        if (!email || !username || !password || !confirmPassword || !accessCode) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match." });
        }

        if(accessCode !== process.env.ACCESSCODE){
            return res.status(403).json({ success: false, message: "Invalid access code." });
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
        const user = userCredential.user;

        res.status(201).json({ success: true, user, message: "Signup Successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating user." });
    }
}

const handleLogout = async (req, res) => {
    try {
        await signOut(auth);
        res.status(200).json({ success: true, message: "Logged out successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error logging out." });
    }
}



const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.json({ success: false, message: "Invalid or expired token" });
  }
};

export { handleLogin, handleSignup, handleLogout, verifyToken };