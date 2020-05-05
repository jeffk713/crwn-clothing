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
  const collectionRef = firestore.collection('users');
  // to get query reference or collection reference object
  const snapShot = await userRef.get(); // async 
  //snapShot object is from perfoming .get() method. this snapShot is document snapShot since .get() is performed with documentRef.
  const collectionSnapshot = await collectionRef.get()
  //collection snapshot contains document snapshot 
  console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) });

  if (!snapShot.exists) { //meaning if it does not exist, we wanna store it in database
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ //create the data from userAuth, store data in firestore
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  //firebase gives a reference no matter what even tho the data deos not exist.
  console.log(objectsToAdd);

  const batch = firestore.batch(); // updating data as a group so if update gets interrupted, it does not happen only some of data is stored.
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc(); // create document with a unique random id 
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
  //it returns a promise, when commit succeeds it resolves a void value, null.
  //since it is async, we can chain off this function and call ".then" function for further action.
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => { //collecitons.docs is array-formed
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject)=> {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}

firebase.initializeApp(myOwnConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
// this gives access to 'GoogleAuthProvider' from 'auth' library
googleProvider.setCustomParameters({ prompt: 'select_account' });
//we wanna trigger google pop-up when we use the google provider
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider); 
// 'signInWithPopup' takes many types of pop-ups, this selects only google one. this function creates pop-up when google-logging in.
//after this, go to firebase console and enable google option under authentication/sign-in method

export default firebase; 

//lec.82 