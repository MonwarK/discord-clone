import firebase from "firebase"

const config = {
    apiKey: "AIzaSyCBeKMia6xvVm95UHu5jM52mHFKzbMHMpg",
    authDomain: "discord-clone-6b057.firebaseapp.com",
    projectId: "discord-clone-6b057",
    storageBucket: "discord-clone-6b057.appspot.com",
    messagingSenderId: "377849015150",
    appId: "1:377849015150:web:fbc32726be597b0fc56f7f"
}

firebase.initializeApp(config)

export const auth = firebase.auth();

var provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"})

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export const db = firebase.firestore();