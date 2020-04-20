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

//lec 89 taking userAuth from 'auth' library, including 'uid' etc, put it in firestore database
export const createUserProfileDocument = async (userAuth, additionalData) => { // we are making API request, so it is async
  // userAuth is the object from 'auth' library
  if (!userAuth) return; // we wanna perform this function only if user sign in.
  
  const userRef = firestore.doc(`users/${userAuth.uid}`); //uid is dynamically gnerated ID string by google when user is authenticated
  //userRef is queryReference Document version from ".doc(`users/${userAuth.uid}`)"
  //'only document reference' object is used with "CRUD" method (creat= .set(), retrieve= .get(), update= .update(), delete= .delete())
  //queryReference does not have actual data, but have details like 'path' 'id' etc

  const snapShot = await userRef.get(); // async 
  //snapShot object is from perfoming .get() method. this snapShot is document snapShot since .get() is performed with documentRef.

  if (!snapShot.exists) { //meaning if it does not exist, we wanna store it in database
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ //create the data from userAuth
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message );
    }
  }

  return userRef; // in case we need it later.
}

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