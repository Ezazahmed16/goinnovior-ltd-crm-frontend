import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCRkKBzDWTK0cG2-gQZA1OMgy05rSQZitg",
    authDomain: "goinnovior-ltd.firebaseapp.com",
    projectId: "goinnovior-ltd",
    storageBucket: "goinnovior-ltd.appspot.com",
    messagingSenderId: "859456203124",
    appId: "1:859456203124:web:93e7372c0e5bfb48d2a421"
};

const app = initializeApp(firebaseConfig);

export default app;