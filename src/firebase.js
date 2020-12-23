import firebase from "firebase/app";
import "firebase/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCwNjhN9g5LOiic1RpFBO1dJffZxEqS1qE",
    authDomain: "kwiz-b9f61.firebaseapp.com",
    databaseURL: "https://kwiz-b9f61.firebaseio.com",
    projectId: "kwiz-b9f61",
    storageBucket: "kwiz-b9f61.appspot.com",
    messagingSenderId: "728113109456",
    appId: "1:728113109456:web:4e02abec38d8b4bf6781d5",
    measurementId: "G-5ZM3GCL5MB"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;