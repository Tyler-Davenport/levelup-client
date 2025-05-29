import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const clientCredentials = {
  ...firebaseCredentials,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
};

const firebaseApp = getApps().length ? getApps()[0] : initializeApp(clientCredentials);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDatabase = getDatabase(firebaseApp);

export { clientCredentials, firebaseApp, firebaseAuth, firebaseDatabase };
