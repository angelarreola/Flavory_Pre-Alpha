// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import {
//   FIREBASE_API_KEY,
//   FIREBASE_AUTH_DOMAIN,
//   FIREBASE_PROJECT_ID,
//   FIREBASE_STORAGE_BUCKET,
//   FIREBASE_MESSAGING_SENDER_ID,
//   FIREBASE_APP_ID
// } from '@env';

import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import {ref as storageRef, getDownloadURL, uploadBytes, getStorage } from 'firebase/storage';
import { getFirestore, collection, addDoc, query, getDocs, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export {
  app,
  auth,
  storageRef,
  getDownloadURL,
  uploadBytes,
  getStorage,
  getFirestore,
  collection,
  addDoc,
  signOut,
  getDocs,
  query,
  where,
  onAuthStateChanged,
  doc,
  updateDoc,
  deleteDoc,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
};

