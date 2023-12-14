// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiKN47BbuzY7qPJp274Gr80F7FOIa98sA",
  authDomain: "student-notify.firebaseapp.com",
  projectId: "student-notify",
  storageBucket: "student-notify.appspot.com",
  messagingSenderId: "732850509144",
  appId: "1:732850509144:web:649b8aa696355f5ce1c12d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };

// db
import { getFirestore } from "firebase/firestore";
const db = getFirestore();

export { db };