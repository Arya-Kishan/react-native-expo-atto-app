// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, initializeAuth, getReactNativePersistence, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZq_IyZjyd8qlBfM-FRYMFrcXNHmmOs10",
  authDomain: "atto-ca5c6.firebaseapp.com",
  projectId: "atto-ca5c6",
  storageBucket: "atto-ca5c6.firebasestorage.app",
  messagingSenderId: "81766058241",
  appId: "1:81766058241:web:fe624d907868106290f300"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
const firestore = getFirestore(app);

export { auth, app, firestore, RecaptchaVerifier, signInWithPhoneNumber };