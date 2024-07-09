// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLs2i6fKSb027mTv6BUHTw8_o-vOi5YGA",
  authDomain: "home-f7315.firebaseapp.com",
  projectId: "home-f7315",
  storageBucket: "home-f7315.appspot.com",
  messagingSenderId:  "432732767758",
  appId: "1:432732767758:web:1be4379be1636113f51e5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth()
export const provider=new GoogleAuthProvider()
export default app;
