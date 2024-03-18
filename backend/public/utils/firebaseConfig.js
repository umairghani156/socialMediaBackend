// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getStorage, ref, uploadBytes,uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDnjNRjq583w2mqTLEPEgItZkUrHVN7SBA",
//   authDomain: "first-frontend-project-da025.firebaseapp.com",
//   projectId: "first-frontend-project-da025",
//   storageBucket: "first-frontend-project-da025.appspot.com",
//   messagingSenderId: "796702314001",
//   appId: "1:796702314001:web:573192cd76c55c62b36bb0",
//   measurementId: "G-9BVN24D0BP"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const storage = getStorage(app);

export {app, auth, storage, ref, uploadBytes,uploadBytesResumable, getDownloadURL }
