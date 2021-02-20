import { User } from "@/model/User";
import {firebaseAuth} from "@/fb";
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
      'ramirez.raph@yahoo.com',
      'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
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

            // set current user

            resolve(userCredential)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
}
