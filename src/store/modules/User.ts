import { User } from "@/model/User";
import {firebaseAuth, usersCollection} from "@/fb";
import firebase from "firebase";
import UserCredential = firebase.auth.UserCredential;

export default {
  namespaced: true,
  state: {
    currentUser: null,
  },
  getters: {
    getCurrentUser (state): User {
      console.log(state.currentUser)
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
            // set current user
            usersCollection.doc(userCredential.user?.uid).get().then(doc => {
              if (doc.exists) {
                let user = new User(
                  doc.id,
                  doc.data()?.firstName,
                  doc.data()?.middleName,
                  doc.data()?.lastName,
                  doc.data()?.birthdate,
                  doc.data()?.email,
                  doc.data()?.imgProfile
                )
                console.log(user)
                context.commit('SET_CURRENT_USER', user)
                resolve()
              } else {
                reject()
              }
            })
          })
          .catch(() => {
            reject()
          })
      })
    },
    userRegister (context, payload: {
      user: {
        firstName: string,
        middleName: string,
        lastName: string,
        email: string,
        birthdate: string
      }, password: string }) {
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
