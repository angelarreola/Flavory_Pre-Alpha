// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence, signOut, onAuthStateChanged } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {ref as storageRef, getDownloadURL, uploadBytes, getStorage } from 'firebase/storage';
import { getFirestore, collection, addDoc, query, getDocs, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyC45pgaInDhPqyZYjlh_2StkMRI8ueiNYQ",
  authDomain: "chefsitoproject.firebaseapp.com",
  projectId: "chefsitoproject",
  storageBucket: "chefsitoproject.appspot.com",
  messagingSenderId: "998559580654",
  appId: "1:998559580654:web:688197767e3007da3bceff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export {
  app,
  auth,
  getApp,
  getAuth,
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
  deleteDoc
};

