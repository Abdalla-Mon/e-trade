import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDlxWr8LumdR2gcA9NYBjWPRsrxHvFaQXo",
  authDomain: "auth-tutorial-e5ae4.firebaseapp.com",
  databaseURL: "https://auth-tutorial-e5ae4-default-rtdb.firebaseio.com",
  projectId: "auth-tutorial-e5ae4",
  storageBucket: "auth-tutorial-e5ae4.appspot.com",
  messagingSenderId: "4208272209",
  appId: "1:4208272209:web:2573e6c165a6d561c3e970",
  measurementId: "G-HGXF530SKY",
};
// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
