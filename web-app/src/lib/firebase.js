// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Note that it is safe to publicly expose this configuration.
// In fact, the Firebase docs specifically do this!
const firebaseConfig = {
  apiKey: "AIzaSyD409I5czUqiHvGeU9PN2O6eDHVLSPLVlM",
  authDomain: "healthy-home-cook-exp.firebaseapp.com",
  projectId: "healthy-home-cook-exp",
  storageBucket: "healthy-home-cook-exp.appspot.com",
  messagingSenderId: "986438203275",
  appId: "1:986438203275:web:7f0ee517eac47a48a3a18e",
  measurementId: "G-PJQJKN3Z92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export necessary functions
export {
  app,
  auth,
  collection,
  db,
  doc,
  getDocs,
  addDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
};
