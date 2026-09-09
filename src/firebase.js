import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmr2jNfh21fTJ9v9m9wDFk7RzlvFIfnWQ",
  authDomain: "mantenimiento-menshen.firebaseapp.com",
  projectId: "mantenimiento-menshen",
  storageBucket: "mantenimiento-menshen.firebasestorage.app",
  messagingSenderId: "345978967513",
  appId: "1:345978967513:web:c9dba1cf8b2bf89c1e35c8",
  measurementId: "G-JQD0FNNV6E"
};

const app = initializeApp(firebaseConfig);

getAnalytics(app);

const db = getFirestore(app);

export { db };