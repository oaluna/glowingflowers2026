// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8NmJMIkLNbVIn8pjWuEYkmgzpTb3vTHk",
  authDomain: "glowing-flower-dc00b.firebaseapp.com",
  projectId: "glowing-flower-dc00b",
  storageBucket: "glowing-flower-dc00b.firebasestorage.app",
  messagingSenderId: "549979508222",
  appId: "1:549979508222:web:2a9baf7fbaaa2538cb44af",
  measurementId: "G-6ZWY9975JX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
