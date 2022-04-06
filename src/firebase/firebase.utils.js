import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyCFdiUJb3GrpSsUx5fTMeOv18xePp2j4KQ",
  authDomain: "crwn-db-1a60e.firebaseapp.com",
  projectId: "crwn-db-1a60e",
  storageBucket: "crwn-db-1a60e.appspot.com",
  messagingSenderId: "177528953734",
  appId: "1:177528953734:web:c4ce7ffa0de5dbd45aea07",
  measurementId: "G-X7ZGJQXF7X",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
