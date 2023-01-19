// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyBqMk9VfMqnWfPhT4kvVEM3rKegfzN-pRY',
  authDomain: 'react-notesapp-github.firebaseapp.com',
  projectId: 'react-notesapp-github',
  storageBucket: 'react-notesapp-github.appspot.com',
  messagingSenderId: '396105662281',
  appId: '1:396105662281:web:7d3011dbab098b88102498',
  measurementId: 'G-EZ00910H4V',
};

// Initialize Firebase
export const FirebaseAppConfig = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseAppConfig);
export const firebaseDB = getFirestore(FirebaseAppConfig)

export const analytics = getAnalytics(FirebaseAppConfig);

