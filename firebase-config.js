// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCjmvASQ84ma8FwpBWhLDEQ-dSJmDlLzpQ",
  authDomain: "farhad-vocabs.firebaseapp.com",
  projectId: "farhad-vocabs",
  storageBucket: "farhad-vocabs.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
