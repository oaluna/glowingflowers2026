import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Replace these placeholders with your actual Firebase config keys from your console
const firebaseConfig = {
  apiKey: "AIzaSyC8NmJMIkLNbVIn8pjWuEYkmgzpTb3vTHk",
  authDomain: "glowing-flower-dc00b.firebaseapp.com",
  databaseURL: "https://glowing-flower-dc00b-default-rtdb.firebaseio.com",
  projectId: "glowing-flower-dc00b",
  storageBucket: "glowing-flower-dc00b.firebasestorage.app",
  messagingSenderId: "549979508222",
  appId: "1:549979508222:web:2a9baf7fbaaa2538cb44af",
  measurementId: "G-6ZWY9975JX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Authentication and Realtime Database
export const auth = getAuth(app);
export const rtdb = getDatabase(app);
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
