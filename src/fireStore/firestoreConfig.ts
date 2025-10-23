// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn6h1AOgreXtWJS4jSKmD-wAyCYUPFRJg",
  authDomain: "bitarena-8872b.firebaseapp.com",
  projectId: "bitarena-8872b",
  storageBucket: "bitarena-8872b.firebasestorage.app",
  messagingSenderId: "1082426512175",
  appId: "1:1082426512175:web:b4d65e6c94ef3bbe4847da",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
