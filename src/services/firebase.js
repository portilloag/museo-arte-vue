// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzzD3oBHQpj_JF9E1drfkh5AVoLpBRng4",
  authDomain: "museoarte.firebaseapp.com",
  projectId: "museoarte",
  storageBucket: "museoarte.firebasestorage.app",
  messagingSenderId: "673312242785",
  appId: "1:673312242785:web:25b27602ff0812bfa2be20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const gitProvider = new GithubAuthProvider()
