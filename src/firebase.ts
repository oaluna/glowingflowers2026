import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// 1. Import Firestore
import { getFirestore } from "firebase/firestore";
// You can keep the Realtime Database import if you still want to use it for the cart!
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8NmJMIkLNbVIn8pjWuEYkmgzpTb3vTHk",
  authDomain: "glowing-flower-dc00b.firebaseapp.com",
  databaseURL: "https://glowing-flower-dc00b-default-rtdb.firebaseio.com",
  projectId: "glowing-flower-dc00b",
  storageBucket: "glowing-flower-dc00b.firebasestorage.app",
  messagingSenderId: "549979508222",
  appId: "1:549979508222:web:2a9baf7fbaaa2538cb44af",
  measurementId: "G-6ZWY9975JX",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const rtdb = getDatabase(app);
// 2. Export Firestore as 'db'
export const db = getFirestore(app);
