import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDrncv9PUiNn1j54pX7CJ0lBRvWaq8ihiY",
  authDomain: "glcw-d7b1f.firebaseapp.com",
  projectId: "glcw-d7b1f",
  storageBucket: "glcw-d7b1f.firebasestorage.app",
  messagingSenderId: "580396643489",
  appId: "1:580396643489:web:07f6ff309c7d4ea9252ce0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
