import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // … autres clés si nécessaire
} as const;

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
setPersistence(auth, browserLocalPersistence);
export const db = getFirestore(firebaseApp);
