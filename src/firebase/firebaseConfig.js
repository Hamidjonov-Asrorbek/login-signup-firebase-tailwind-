// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhH4zoxhVKRrBFjv1mVDIGOJnYvp-PuJY",
  authDomain: "korzinka-redux.firebaseapp.com",
  projectId: "korzinka-redux",
  storageBucket: "korzinka-redux.appspot.com",
  messagingSenderId: "297132044644",
  appId: "1:297132044644:web:a463cdbb24dfd89ef1ca71",
  measurementId: "G-C4WSDBNQM1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
