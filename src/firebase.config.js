// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDM2Y02jfg9TvietHzCmhIXkq3sMkJQDkk",
  authDomain: "fotoki.firebaseapp.com",
  projectId: "fotoki",
  storageBucket: "fotoki.appspot.com",
  messagingSenderId: "618405155262",
  appId: "1:618405155262:web:fb45288682986b0c5f69ef",
  measurementId: "G-ZDJGCVJXG9"
};

// Initialize Firebase

//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
initializeApp(firebaseConfig)
export const db = getFirestore()