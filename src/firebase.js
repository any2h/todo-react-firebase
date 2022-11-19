// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApmSUvXjIL66seb_Ose4v4ngqv-0npIkA",
    authDomain: "todo-app-3b968.firebaseapp.com",
    projectId: "todo-app-3b968",
    storageBucket: "todo-app-3b968.appspot.com",
    messagingSenderId: "6911840069",
    appId: "1:6911840069:web:2221de50d54f8a260bb82c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage()
