import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
    apiKey: "AIzaSyAZJj-w35T2kWu7IRtPOnE84lOn6RIWwF0",
    authDomain: "chat-application-41487.firebaseapp.com",
    databaseURL: "https://chat-application-41487-default-rtdb.firebaseio.com", 
    projectId: "chat-application-41487",
    storageBucket: "chat-application-41487.appspot.com",
    messagingSenderId: "230295587212",
    appId: "1:230295587212:web:e33243132c2914d777eea9",
    measurementId: "G-E69B2D97P3",
};

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const database = getDatabase(firebaseApp);

export {
    firebaseApp,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    firestore,
    storage,
    database
}
