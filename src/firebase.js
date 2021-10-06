import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBCtqO_X_DfZBubN8WI8D3PTd_E0soQgR8",
    authDomain: "ecommerce-b1218.firebaseapp.com",
    projectId: "ecommerce-b1218",
    storageBucket: "ecommerce-b1218.appspot.com",
    messagingSenderId: "1007155100887",
    appId: "1:1007155100887:web:f2dfa16272e7502fe30492"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };