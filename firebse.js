// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPPhFPaK9_rspoKmXUkPceFypZR5eBIcM",
  authDomain: "school-management-3661d.firebaseapp.com",
  projectId: "school-management-3661d",
  storageBucket: "school-management-3661d.appspot.com",
  messagingSenderId: "526130224815",
  appId: "1:526130224815:web:5b1be9e5eddee7fbc8be5a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
