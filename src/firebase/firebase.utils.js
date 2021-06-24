import firebase from "firebase"

const config = {
   
}

firebase.initializeApp(config)

export const auth = firebase.auth();

var provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"})

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export const db = firebase.firestore();
