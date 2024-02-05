// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjAxEBTVb3dpH9JjtKxQ7vXADrydUMaCA",
  authDomain: "ecommerce-66b9e.firebaseapp.com",
  projectId: "ecommerce-66b9e",
  storageBucket: "ecommerce-66b9e.appspot.com",
  messagingSenderId: "268697585386",
  appId: "1:268697585386:web:fbaf027705e00f61d7f993",
  measurementId: "G-7ZVD2Y5GVH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
console.log(fireDB)
const auth = getAuth(app);

export {fireDB, auth}