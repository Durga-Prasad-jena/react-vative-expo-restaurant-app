// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTcqm0RDmf_Q4YZCdPS4iF07R49xFJ8gg",
  authDomain: "fine-dine-ecom.firebaseapp.com",
  projectId: "fine-dine-ecom",
  storageBucket: "fine-dine-ecom.firebasestorage.app",
  messagingSenderId: "50412667431",
  appId: "1:50412667431:web:92e3754785f58151b1c402",
  measurementId: "G-BFY70HFC2B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);