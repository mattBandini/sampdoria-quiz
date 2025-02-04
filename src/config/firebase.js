import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC1Am-FyplaRvgOPglnVl8QQFxV4nF83TU",
    authDomain: "nfootball-f9aa9.firebaseapp.com",
    projectId: "nfootball-f9aa9",
    storageBucket: "nfootball-f9aa9.firebasestorage.app",
    messagingSenderId: "184681880001",
    appId: "1:184681880001:web:c1bc9b626a47766cca3740"
  };

// Inizializza Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
