import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDVf3ZB-9GmlXXcVfDJmQlbh1yGWXkSl34',
  authDomain: 'lorem-classroom.firebaseapp.com',
  databaseURL: 'https://lorem-classroom-default-rtdb.firebaseio.com',
  projectId: 'lorem-classroom',
  storageBucket: 'lorem-classroom.appspot.com',
  messagingSenderId: '1042672255945',
  appId: '1:1042672255945:web:85d0abaa209ebc804bde18',
  measurementId: 'G-GHSSCNB7FX',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

// firestore class collection reference
const classesCollection = db.collection('classes')

// firestore class collection reference
const resourcesCollection = db.collection('resources')

// firestore class collection reference
const usersCollection = db.collection('users')

// firestore class collection reference
const lecturesCollection = db.collection('lectures')

const fileCommentsCollection = db.collection('file-comments')

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage()

// Create a storage reference from our storage service
const storageRef = storage.ref()

// Firebase Auth
const firebaseAuth = firebase.auth()

export {
  db,
  firebaseAuth,
  storageRef,
  classesCollection,
  resourcesCollection,
  usersCollection,
  lecturesCollection,
  fileCommentsCollection,
}
