import firebase from "firebase/app"
import {config} from "./config";

// Config holds the firebase apiKey and other project settings
// It is indeed safe to expose those values but I prefer to keep keys privately

firebase.initializeApp(config)


// Emulator settings
const firestore = firebase.firestore()
const auth = firebase.auth()
const functions = firebase.functions()
const storage = firebase.storage()

// auth.useEmulator('http://localhost:9099')
// functions.useEmulator('localhost', 5001)
// firestore.useEmulator('localhost', 8090)
// storage.useEmulator('localhost', 9199)


export default {
  firebase,
  auth,
  firestore,
  functions
}

