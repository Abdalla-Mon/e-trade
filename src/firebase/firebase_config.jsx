import { initializeApp, firebase } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlxWr8LumdR2gcA9NYBjWPRsrxHvFaQXo",
  authDomain: "auth-tutorial-e5ae4.firebaseapp.com",
  projectId: "auth-tutorial-e5ae4",
  storageBucket: "auth-tutorial-e5ae4.appspot.com",
  messagingSenderId: "4208272209",
  appId: "1:4208272209:web:2573e6c165a6d561c3e970",
  measurementId: "G-HGXF530SKY",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const fireBaseData = firebase.firestore();
