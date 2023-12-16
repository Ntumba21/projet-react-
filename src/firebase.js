import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAp2n6MpxyOTnw_Nd1ISz84di2XgxWhbYk",
  authDomain: "meteo-sama.firebaseapp.com",
  projectId: "meteo-sama",
  storageBucket: "meteo-sama.appspot.com",
  messagingSenderId: "362618970797",
  appId: "1:362618970797:web:0d038c546ed9e1669a9c24"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const firebaseInstance = { app, auth, database, createUserWithEmailAndPassword };

export default firebaseInstance;