import { User } from "@/model/User";
import {firebaseAuth, notificationsCollection, storageRef, usersCollection} from "@/fb";
import firebase from "firebase";
import UserCredential = firebase.auth.UserCredential;
import { AssignmentNotification, ClassInviteNotification, ClassInviteResultNotification, RegularNotification, UserNotification } from "@/model/UserNotification";

export default {
  namespaced: true,
  state: {
    currentUser: null,
    notifications: null,
    notificationsSnapshotUnsubscribe: null
  },
  getters: {
    getCurrentUser (state): User {
      return state.currentUser
    },
    getNotifications (state): Array<UserNotification> {
      return state.notifications
    },
    getNotificationsSnapshotUnsubscribe(state) {
      return state.notificationsSnapshotUnsubscribe
    }
  },
  mutations: {
    SET_CURRENT_USER (state, payload: User) {
      state.currentUser = payload
    },
    SET_NOTIFICATIONS (state, payload: Array<UserNotification>) {
      state.notifications = payload
    },
    SET_NOTIFICATIONS_SNAPSHOT (state, payload) {
      state.notificationsSnapshotUnsubscribe = payload
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
               dispatch('classes/fetchAllMeetings', { currentUser: user }, { root: true })
             }, 1000)
             dispatch('clearNotification')
             dispatch('fetchNotifications')
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
    userSignOut ({ commit, dispatch }) {
      dispatch('classes/clearClasses', null, { root:true })
      commit('SET_CURRENT_USER', null)
    },
    userSignUpEmailAndPassword ({ commit }, payload: { email: string, password: string }) {
      return new Promise<void>((resolve, reject) => {
        firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
          .then((userCredential: UserCredential) => {
            usersCollection.doc(userCredential.user?.uid)
              .set({
                email: payload.email,
                accountStatus: 'registering'
              }).then(() => {
                firebaseAuth.signOut()
                resolve()
              }).catch(fireStoreError => {
                console.log('this', fireStoreError);
              })
          }).catch((error) => {
            reject(error)
        })
      })
    },
    userAddInformation ({ commit }, payload: {
      email: string,
      firstName: string,
      middleName: string,
      lastName: string,
      birthdate: string,
      phoneNumber: string,
      homeAddress?: string,
      school?: string,
      course?: string,
      section?: string,
      studentNumber?: string,
    }) {
      return new Promise<void>((resolve, reject) => {
        usersCollection.where('email', '==', payload.email).get().then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.exists) {
              doc.ref.set({
                firstName: payload.firstName,
                middleName: payload.middleName,
                lastName: payload.lastName,
                birthdate: payload.birthdate,
                phoneNumber: payload.phoneNumber,
                homeAddress: payload.homeAddress,
                school: payload.school,
                course: payload.course,
                section: payload.section,
                studentNumber: payload.studentNumber
              }, { merge: true }).then(() => {
                resolve()
              }).catch(setError => {
                reject(setError)
              })
            }
          })
        }).catch(error => {
          reject(error)
        })
      })
    },
    userFinishRegister ({ commit }, payload: {
      email: string,
      image: any,
      avatar?: string,
    }) {
      return new Promise<void>((resolve, reject) => {

        usersCollection.where('email', '==', payload.email).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            if (doc.exists) {
              if (payload.image) {
                const profileStorageRef = storageRef.child('users').child(doc.id).child('profile')
                profileStorageRef.put(payload.image).then(() => {
                  profileStorageRef.getDownloadURL().then(url => {
                    usersCollection.doc(doc.id).set({
                      imgProfile: url,
                    }, { merge: true }).then(() => {
                      usersCollection.doc(doc.id).update({
                        accountStatus: firebase.firestore.FieldValue.delete()
                      }).then(() => {
                        resolve()
                      })
                    })
                  })
                }).catch(profileStorageRefError => {
                  reject(profileStorageRefError)
                })
              }

              if (payload.avatar) {
                console.log('user selected an avatar');

                storageRef.storage.refFromURL(`gs://lorem-classroom.appspot.com/users/avatars/${payload.avatar}`).getDownloadURL()
                .then(url => {
                  usersCollection.doc(doc.id).set({
                    imgProfile: url,
                  }, { merge: true }).then(() => {
                    usersCollection.doc(doc.id).update({
                      accountStatus: firebase.firestore.FieldValue.delete()
                    }).then(() => {
                      resolve()
                    })
                  }).catch((usersCollectionError) => {
                    reject(usersCollectionError)
                  })
                })
                .catch(storageRefError => {
                  reject(storageRefError)
                })
              }
            }
          })
        }).catch(usersCollectionError => {
          reject(usersCollectionError)
        })
      })
    },
    fetchNotifications ({ commit, getters, rootGetters, dispatch }) {

      let notifications: Array<UserNotification> = []

      const currentUser = getters['getCurrentUser']

      if (currentUser) {

        const snapshot = rootGetters['snapshots/getPushNotificationSnapshot']

        if (snapshot) {
          console.log('detaching notif');
          snapshot() // detach a listener
        }

        const unsubscribe = notificationsCollection.doc(currentUser.id)
        .collection('items')
        .orderBy('date', 'desc')
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
                  n.data()?.result,
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
        dispatch('snapshots/setPushNotificationSnapshot', unsubscribe, { root: true })
      }
    },
    clearNotification ({ commit }) {
      commit('SET_NOTIFICATIONS', [])
    },
  },
}
