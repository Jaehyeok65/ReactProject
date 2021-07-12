import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDN75pYBlCz4ParoW8i2ng5bu7Tdx9mxEQ",
    authDomain: "novel-1a9b3.firebaseapp.com",
    databaseURL: "https://novel-1a9b3-default-rtdb.firebaseio.com",
    projectId: "novel-1a9b3",
    storageBucket: "novel-1a9b3.appspot.com",
    messagingSenderId: "461891214856",
    appId: "1:461891214856:web:a735e2948e08c00c5f3bbd",
    measurementId: "G-P91ZB2ETY1"
}

firebase.initializeApp(firebaseConfig);

const database = firebase.database;

export { database };
