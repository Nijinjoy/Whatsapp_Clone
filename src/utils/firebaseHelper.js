import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAZJj-w35T2kWu7IRtPOnE84lOn6RIWwF0",
    authDomain: "chat-application-41487.firebaseapp.com",
    projectId: "chat-application-41487",
    storageBucket: "chat-application-41487.appspot.com",
    messagingSenderId: "230295587212",
    appId: "1:230295587212:web:e33243132c2914d777eea9",
    measurementId: "G-E69B2D97P3",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);//Initializes Firebase Authentication.
const firestore = getFirestore(firebaseApp);//Initializes Firestore (Firebase's NoSQL database).You can use this firestore object to perform database operations (e.g., adding, updating, or querying documents).

export { auth, createUserWithEmailAndPassword, firestore, firebaseApp }; 
