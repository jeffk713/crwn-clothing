import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const myOwnConfig = {
  apiKey: "AIzaSyAbSzgYDOrjxPJB9trgsw7RajF416Bg1pQ",
  authDomain: "crwn-db-7ddd8.firebaseapp.com",
  databaseURL: "https://crwn-db-7ddd8.firebaseio.com",
  projectId: "crwn-db-7ddd8",
  storageBucket: "crwn-db-7ddd8.appspot.com",
  messagingSenderId: "1040735018291",
  appId: "1:1040735018291:web:1612cd447239162bd2b246",
  measurementId: "G-CVD8K33CMZ"
};

firebase.initializeApp(myOwnConfig);

export const auth = firebase.auth();


export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// this gives access to 'GoogleAuthProvider' from 'auth' library
provider.setCustomParameters({ prompt: 'select_account' });
//we wanna trigger google pop-up when we use the google provider
export const signInWithGoogle = () => auth.signInWithPopup(provider);
// 'signInWithPopup' takes many types of pop-ups, this selects only google one

export default firebase; 

//lec.82 