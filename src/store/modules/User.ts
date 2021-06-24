import { User } from "@/model/User";
import {firebaseAuth, notificationsCollection, usersCollection} from "@/fb";
import firebase from "firebase";
import UserCredential = firebase.auth.UserCredential;
import { AssignmentNotification, ClassInviteNotification, ClassInviteResultNotification, RegularNotification, UserNotification } from "@/model/UserNotification";

export default {
  namespaced: true,
  state: {
    currentUser: null,
    notifications: null,
  },
  getters: {
    getCurrentUser (state): User {
      return state.currentUser
    },
    getNotifications (state): Array<UserNotification> {
      return state.notifications
    }
  },
  mutations: {
    SET_CURRENT_USER (state, payload: User) {
      state.currentUser = payload
    },
    SET_NOTIFICATIONS (state, payload: Array<UserNotification>) {
      state.notifications = payload
    }
  },
  actions: {
    setCurrentUser ({ commit, dispatch }, payload: { uid: string }) {
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
             commit('SET_CURRENT_USER', user)
             dispatch('classes/fetchClasses', user, { root: true })
             setTimeout(() => {
               dispatch('classes/fetchMeetings', { currentUser: user }, { root: true })
             }, 1000)
           }
     })
     },
     userSignIn({ commit }, payload: { email: string, password: string }) {
      return new Promise<void>((resolve, reject) => {
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
          .then(() => {
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    userSignOut ({ commit }) {
      commit('SET_CURRENT_USER', null)
    },
    userRegister ({ commit }, payload: {
      user: {
        firstName: string,
        middleName: string,
        lastName: string,
        email: string,
        birthdate: string
      }, password: string }) {
      return new Promise<void>((resolve, reject) => {
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
    },
    fetchNotifications ({ commit, getters }) {

      let notifications: Array<UserNotification> = []

      const currentUser = getters['getCurrentUser']
      console.log(currentUser.id);

      if (currentUser) {
        notificationsCollection.doc(currentUser.id)
        .collection('items')
        .orderBy('date')
        .onSnapshot(notifSnapshot => {
          notifications = []
          notifSnapshot.forEach(n => {
            switch(n.data().type) {
              case 'ClassInvite':
                notifications.push(new ClassInviteNotification(
                  n.id,
                  n.data()?.userId,
                  n.data()?.type,
                  n.data()?.date,
                  n.data()?.read,
                  n.data()?.classId,
                  n.data()?.classTitle,
                  n.data()?.classCode,
                ))
                break
              case 'ClassInviteResult':
                notifications.push(new ClassInviteResultNotification(
                  n.id,
                  n.data()?.userId,
                  n.data()?.type,
                  n.data()?.date,
                  n.data()?.read,
                  n.data()?.classId,
                  n.data()?.classTitle,
                  n.data()?.classCode,
                ))
                break
              case 'Assignment':
                notifications.push(new AssignmentNotification(
                  n.id,
                  n.data()?.userId,
                  n.data()?.type,
                  n.data()?.date,
                  n.data()?.read,
                  n.data()?.classId,
                  n.data()?.classTitle,
                  n.data()?.classCode,
                  n.data()?.due
                ))
                break
              case 'Regular':
                notifications.push(new RegularNotification(
                  n.id,
                  n.data()?.userId,
                  n.data()?.type,
                  n.data()?.date,
                  n.data()?.read,
                  n.data()?.content,
                ))
                break
              default:
                console.log('Unknown type');
                return
            }
          })
          commit('SET_NOTIFICATIONS', notifications)
        })
      }
    }
  },
}
