import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCEL45mQm9or6o8dOv4RqwT3i48_DttFwI",
    authDomain: "digamu-assistant.firebaseapp.com",
    projectId: "digamu-assistant",
    storageBucket: "digamu-assistant.appspot.com",
    messagingSenderId: "1080574917041",
    appId: "1:1080574917041:web:8124ddf05b1e09640d6590",
    measurementId: "G-BHJZE2ZGCV"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);