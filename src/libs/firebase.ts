// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtHN8Th7-vhADZmEMwc6m4pFq98K-j06I",
  authDomain: "kotlin-50ee5.firebaseapp.com",
  projectId: "kotlin-50ee5",
  storageBucket: "kotlin-50ee5.appspot.com",
  messagingSenderId: "799840654744",
  appId: "1:799840654744:web:605bed08d8c1d51d7d07ed",
  measurementId: "G-6BWPTR8RRM",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
