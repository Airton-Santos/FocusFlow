// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3V2ytsA5ud91kbk-xc3pfex4KrgmfXss",
  authDomain: "focusflow-43e1a.firebaseapp.com",
  projectId: "focusflow-43e1a",
  storageBucket: "focusflow-43e1a.firebasestorage.app",
  messagingSenderId: "690461926461",
  appId: "1:690461926461:web:ae6d51f602873dc9df3654",
  measurementId: "G-D5BHYFMPJQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;
