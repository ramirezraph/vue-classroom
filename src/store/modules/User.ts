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
      return state.currentUser
    }
  },
  mutations: {
    SET_CURRENT_USER (state, payload: User) {
      state.currentUser = payload
    }
  },
  actions: {
     setCurrentUser (context, payload: { uid: string }) {
       // set current user
       usersCollection.doc(payload.uid).onSnapshot(doc => {
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

             user.phoneNumber = doc.data()?.phoneNumber
             user.school = doc.data()?.school
             user.homeAddress = doc.data()?.homeAddress
             user.studentNumber = doc.data()?.studentNumber
             user.course = doc.data()?.course
             user.section = doc.data()?.section
             context.commit('SET_CURRENT_USER', user)
           }
     })
     },
     userSignIn(context, payload: { email: string, password: string }) {
      return new Promise((resolve, reject) => {
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
          .then(() => {
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    userSignOut (context) {
      context.commit('SET_CURRENT_USER', null)
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
          }).catch((error) => {
            reject(error)
        })
      })
    }
  },
}
