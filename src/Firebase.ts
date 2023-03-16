// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configurations
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyC_44otaG6aVlkwu06d-sAnmDLzhWylI94",
  authDomain: "app-nike-3d22d.firebaseapp.com",
  databaseURL: "https://app-nike-3d22d-default-rtdb.firebaseio.com",
  projectId: "app-nike-3d22d",
  storageBucket: "app-nike-3d22d.appspot.com",
  messagingSenderId: "43211281638",
  appId: "1:43211281638:web:c687c645f9c6edbeb0d727"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// Initialize Auth and get a reference to the service
export const auth = getAuth(app);
// Initialize Auth and get a reference to the GoogleAuthPrivider
export const google = new GoogleAuthProvider();