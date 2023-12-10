import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyNyVCm4gKm4GeMIFXo8Pj2OA2JUP3drk",
  authDomain: "statech-login.firebaseapp.com",
  projectId: "statech-login",
  storageBucket: "statech-login.appspot.com",
  messagingSenderId: "503313243097",
  appId: "1:503313243097:web:fa6b0ac9b1e4fad99457c8",
  measurementId: "G-GBXWNNM8TK",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);