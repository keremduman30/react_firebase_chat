// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_API_KEY}`,
  authDomain: `${import.meta.env.VITE_AuthDomain}`,
  projectId: `${import.meta.env.VITE_ProjectId}`,
  storageBucket: `${import.meta.env.VITE_StorageBucket}`,
  messagingSenderId: `${import.meta.env.VITE_MessagingSenderId}`,
  appId: `${import.meta.env.VITE_AppId}`,
  measurementId: `${import.meta.env.VITE_MeasurementId}`,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
