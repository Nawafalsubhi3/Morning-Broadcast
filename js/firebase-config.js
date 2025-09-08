// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Firebase config (من مشروعك)
const firebaseConfig = {
  apiKey: "AIzaSyAXhbHOc7AdN-vUKPhu9s_jwKf_3lfgXTM",
  authDomain: "morning-broadcast-school.firebaseapp.com",
  projectId: "morning-broadcast-school",
  storageBucket: "morning-broadcast-school.firebasestorage.app",
  messagingSenderId: "146776297386",
  appId: "1:146776297386:web:93db14d6427d77b9c665d3",
  measurementId: "G-59YESXZEJY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Services
export const db = getFirestore(app);
export const auth = getAuth(app);
