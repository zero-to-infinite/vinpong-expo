import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBJ7x9feOKgibIiZVPLWzomdV_lwlWvI-o",
    authDomain: "vinpong-3a05c.firebaseapp.com",
    databaseURL: "https://vinpong-3a05c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vinpong-3a05c",
    storageBucket: "vinpong-3a05c.appspot.com",
    messagingSenderId: "1075237189481",
    appId: "1:1075237189481:web:b1af1acff19e3801cc6ff8",
    measurementId: "G-HPP99JEJPM"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
