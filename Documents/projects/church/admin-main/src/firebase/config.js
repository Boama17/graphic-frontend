// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAhlYsf32OOzKakUkpWkVoCp8CA7Vgp83U",
    authDomain: "admin-portal-64fdc.firebaseapp.com",
    projectId: "admin-portal-64fdc",
    storageBucket: "admin-portal-64fdc.firebasestorage.app",
    messagingSenderId: "1003277619755",
    appId: "1:1003277619755:web:761fef572cdc14e09bd06e",
    measurementId: "G-4GRL3JCNR9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and export
export const auth = getAuth(app);
export default app;