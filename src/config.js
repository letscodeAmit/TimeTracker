import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAjtzwu5pCovZa622S5PTIn5pYhW4sA_eI",
  authDomain: "examtracker-37d6e.firebaseapp.com",
  projectId: "examtracker-37d6e",
  storageBucket: "examtracker-37d6e.appspot.com",
  messagingSenderId: "1081768961686",
  appId: "1:1081768961686:web:e59c26a3975fa941be04b7",
  measurementId: "G-C4X2HLP878",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
