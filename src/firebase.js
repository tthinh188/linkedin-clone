import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCbPVBoZ_OKv3vr7XhLDBNAMCGOb7YrI_o",
    authDomain: "linkedin-clone-tp.firebaseapp.com",
    projectId: "linkedin-clone-tp",
    storageBucket: "linkedin-clone-tp.appspot.com",
    messagingSenderId: "745502895594",
    appId: "1:745502895594:web:2a11e99f929103fe2f9693",
    measurementId: "G-Z53W4EG89H"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth };