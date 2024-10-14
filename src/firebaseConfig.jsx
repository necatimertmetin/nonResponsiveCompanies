// firebaseConfig.jsx
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyDQj4kDTl3wnxEIRjO1YcMJQdLhSh9XXlY",
  authDomain: "nonresponsivecompanies.firebaseapp.com",
  projectId: "nonresponsivecompanies",
  storageBucket: "nonresponsivecompanies.appspot.com",
  messagingSenderId: "819790013064",
  appId: "1:819790013064:web:3090cec0cb3cb80f2ff53d",
  measurementId: "G-ZE1BQXYC8D",
  databaseURL: "https://nonresponsivecompanies-default-rtdb.europe-west1.firebasedatabase.app", // Doğru veritabanı URL'si
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
