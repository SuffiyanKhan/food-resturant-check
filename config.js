// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCITZ4JaopBdwHUmD_KcV5JPf1nk22qiKE",
  authDomain: "signup-and-login-18814.firebaseapp.com",
  databaseURL: "https://signup-and-login-18814-default-rtdb.firebaseio.com",
  projectId: "signup-and-login-18814",
  storageBucket: "signup-and-login-18814.appspot.com",
  messagingSenderId: "761955324033",
  appId: "1:761955324033:web:650f3ca9b0849ec453bd80",
  measurementId: "G-ZFLC2N7BXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

