import { User } from "@/model/User";
import {firebaseAuth, usersCollection} from "@/fb";
import firebase from "firebase";
import UserCredential = firebase.auth.UserCredential;

export default {
  namespaced: true,
  state: {
    currentUser: new User(
      'u65UaYYgNGccqlsFUVGC',
      'Raphael',
      'Legaspi',
      'Ramirez',
      '1999-05-19',
      'ramirez.raph@yahoo.com',
      'https://firebasestorage.googleapis.com/v0/b/lorem-classroom.appspot.com/o/users%2Fdefault_profile.jpg?alt=media&token=47adcd7a-be7b-4067-9d57-a0b173a91bd5',
    ),
  },
  getters: {
    getCurrentUser (state): User {
      return state.currentUser
    }
  },
  mutations: {
    SET_CURRENT_USER (state, payload: User) {
      state.currentUser = payload
    }
  },
  actions: {
    userSignIn(context, payload: { email: string, password: string }) {
      return new Promise((resolve, reject) => {
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
          .then((userCredential: UserCredential) => {
            console.log(userCredential)
            // set current user

            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    userRegister (context, payload: { user: User, password: string }) {
      return new Promise((resolve, reject) => {
        firebaseAuth.createUserWithEmailAndPassword(payload.user.email, payload.password)
          .then((userCredential: UserCredential) => {
            usersCollection.doc(userCredential.user?.uid)
              .set({
                firstName: payload.user.firstName,
                middleName: payload.user.middleName,
                lastName: payload.user.lastName,
                imgProfile: 'https://firebasestorage.googleapis.com/v0/b/lorem-classroom.appspot.com/o/users%2Fdefault_profile.jpg?alt=media&token=47adcd7a-be7b-4067-9d57-a0b173a91bd5',
                email: payload.user.email,
                birthdate: payload.user.birthdate,
              }).then(() => {
              resolve()
            })
          }).catch(() => {
            reject()
        })
      })
    }
  },
}
