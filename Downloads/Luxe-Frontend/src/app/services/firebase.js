// lib/firebase.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  initializeAuth,
  browserLocalPersistence,
  browserPopupRedirectResolver
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5tWviqlBFD23iGsAiV44hGsuqojEQtmA",
  authDomain: "luxe-auth-296ff.firebaseapp.com",
  projectId: "luxe-auth-296ff",
  storageBucket: "luxe-auth-296ff.appspot.com",
  messagingSenderId: "832238698807",
  appId: "1:832238698807:web:a26bf4367a5de7fa549ab2",
  measurementId: "G-YPH1JK9S7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence and redirect resolver
let auth;
if (typeof window !== 'undefined') {
  auth = initializeAuth(app, {
    persistence: browserLocalPersistence,
    popupRedirectResolver: browserPopupRedirectResolver
  });
} else {
  auth = getAuth(app);
}

export { auth };