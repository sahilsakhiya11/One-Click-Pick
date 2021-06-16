import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtJSDMp0hkJzRiVXRwsy7dL_Cpd8YEotc",
  authDomain: "ecommerce-9d367.firebaseapp.com",
  projectId: "ecommerce-9d367",
  storageBucket: "ecommerce-9d367.appspot.com",
  messagingSenderId: "324838480582",
  appId: "1:324838480582:web:f5b23b98b3d03670d495c7",
  measurementId: "G-5CG9G9LW5E",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// export
// export  default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
