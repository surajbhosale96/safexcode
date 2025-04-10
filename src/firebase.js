import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyB63nudftd6fCQGYLVEZ8I884g1Y5yn6gE",
    authDomain: "safecode-001.firebaseapp.com",
    projectId: "safecode-001",
    storageBucket: "safecode-001.appspot.com",
    messagingSenderId: "138607133828",
    appId: "1:138607133828:web:9e1c598a54b0867280eed1",
    measurementId: "G-XQWFFHDETM"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();
const db = getFirestore(app)

export { auth, RecaptchaVerifier, signInWithPhoneNumber, db };
