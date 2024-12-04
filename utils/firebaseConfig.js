// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Configuración obtenida de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDtBb_y9QcyWRkJPhJ67NTurS3Dyq9BO4A",
  authDomain: "vidolister-5c162.firebaseapp.com",
  projectId: "vidolister-5c162",
  storageBucket: "vidolister-5c162.firebasestorage.app",
  messagingSenderId: "297686284285",
  appId: "1:297686284285:web:e320618db0430ab22f4b94",
  measurementId: "G-SPD840MBKX"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };


