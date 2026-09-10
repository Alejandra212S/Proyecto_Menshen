import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyOT9-KZaEH9BQ8YPK18RL7XlWTyJdBTo",
  authDomain: "mantenimiento-menshen-e94ce.firebaseapp.com",
  projectId: "mantenimiento-menshen-e94ce",
  storageBucket: "mantenimiento-menshen-e94ce.firebasestorage.app",
  messagingSenderId: "1041705456217",
  appId: "1:1041705456217:web:41274cd0309be0e3e69748"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };