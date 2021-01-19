import firebase from 'firebase/app'
import 'firebase/firestore'

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

// collection references
const classesCollection = db.collection('classes')

export {
  db,
  classesCollection,
}
