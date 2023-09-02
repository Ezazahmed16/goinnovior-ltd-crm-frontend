// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRkKBzDWTK0cG2-gQZA1OMgy05rSQZitg",
    authDomain: "goinnovior-ltd.firebaseapp.com",
    projectId: "goinnovior-ltd",
    storageBucket: "goinnovior-ltd.appspot.com",
    messagingSenderId: "859456203124",
    appId: "1:859456203124:web:93e7372c0e5bfb48d2a421"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;