// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {  
    apiKey: "AIzaSyAAe9tCTTghlF8C5Te6WwOf_VtIQvOjHVE",
    authDomain: "campus-mind-2a276.firebaseapp.com",  
    projectId: "campus-mind-2a276",  
    storageBucket: "campus-mind-2a276.firebasestorage.app",  
    messagingSenderId: "84816694580",  
    appId: "1:84816694580:web:0fb54483b7f4422299a961",  
    measurementId: "G-WN6EM19DX3"
};
    // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);