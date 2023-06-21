// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { FacebookAuthProvider } from "firebase/auth";
import { getAuth, signInWithRedirect, getRedirectResult } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAugTk1Ryw6v2v3WWykQ-T3l3LilldyBXY",
  authDomain: "carefinder-22677.firebaseapp.com",
  projectId: "carefinder-22677",
  storageBucket: "carefinder-22677.appspot.com",
  messagingSenderId: "462298827465",
  appId: "1:462298827465:web:e419ac51ca1b5279e85b18",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const provider = new FacebookAuthProvider();
const auth = getAuth();
export { app, storage, auth, provider, getRedirectResult, signInWithRedirect };
