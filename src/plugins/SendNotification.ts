import { classesCollection, notificationsCollection, usersCollection } from '@/fb'
import { NotificationType } from '@/model/UserNotification'
import firebase from 'firebase'
import Vue from 'vue'
import getFullName from './fullname'

export default Vue.extend({
  methods: {
    sendPostNotification (classId: string, postUserId: string, postId: string): void {
      // get poster user name
      let userName = ''
      usersCollection.doc(postUserId).get().then(userDoc => {
        if (userDoc.exists) {
          userName = getFullName(userDoc.data()?.firstName, userDoc.data()?.middleName, userDoc.data()?.lastName)
        }
      }).then(() => {
        let classPeopleIds: string[] = []

        classesCollection.doc(classId).get().then(classDoc => {
          if (classDoc.exists) {
            classPeopleIds = classDoc.data()?.userList
          }
        }).then(() => {
          // guards
          if (classPeopleIds || postUserId || userName) {
            // get all ids from people inside the class, except the poster's id
            classPeopleIds.filter(id => id !== postUserId).forEach(userId => {
              notificationsCollection.doc(userId).collection('items').add({
                userId: postUserId,
                type: NotificationType.Post,
                read: false,
                date: firebase.firestore.Timestamp.now(),
                classId: classId,
                postId: postId,
              }).then(() => {
                console.log('notification sent for ' + userId)
              })
            })
            } else {
              console.log('notification sent failed.')
            }
        })
        })
    },
    sendCommentOnPostNotification (classId: string, commenterId: string, posterId: string, postId: string): void {
      if (!(classId || commenterId || posterId || postId)) return

      if (commenterId === posterId) return

      // check if class exists
      classesCollection.doc(classId).get().then(classDoc => {
        if (classDoc.exists) {
          // check if this kind of notification already exists
          notificationsCollection.doc(posterId).collection('items').where('type', '==', 'Comment').where('postId', '==', postId).get()
          .then(snapshot => {
            if (snapshot.size <= 0) {
              // new
              notificationsCollection.doc(posterId).collection('items').add({
                userId: commenterId,
                type: NotificationType.Comment,
                read: false,
                date: firebase.firestore.Timestamp.now(),
                classId: classId,
                postId: postId,
                numberOfOtherUser: 1,
                userList: [commenterId],
              }).then(() => {
                console.log('notification sent for ' + posterId)
              })
            } else {
              // already exists, just update
              snapshot.forEach(docRef => {
                // check if the user already commented before
                notificationsCollection.doc(posterId).collection('items').doc(docRef.id).get().then(result => {
                  // get array of user who commented
                  const arrayOfUser: string[] = result.data()?.userList
                  if (arrayOfUser.includes(commenterId)) {
                    // user already commented, number of user stay the same
                    notificationsCollection.doc(posterId).collection('items').doc(docRef.id).set({
                      userId: commenterId,
                      type: NotificationType.Comment,
                      read: false,
                      date: firebase.firestore.Timestamp.now(),
                      classId: classId,
                      postId: postId,
                    }, { merge: true }).then(() => {
                      console.log('follow up notification sent for ' + posterId)
                    })
                  } else {
                    // not, go increment number of unique user
                    notificationsCollection.doc(posterId).collection('items').doc(docRef.id).set({
                      userId: commenterId,
                      type: NotificationType.Comment,
                      read: false,
                      date: firebase.firestore.Timestamp.now(),
                      classId: classId,
                      postId: postId,
                      numberOfOtherUser: firebase.firestore.FieldValue.increment(1),
                      userList: firebase.firestore.FieldValue.arrayUnion(commenterId),
                    }, { merge: true }).then(() => {
                      console.log('follow up but new notification sent for ' + posterId)
                    })
                  }
                })
              })
            }
          })
          .catch(() => {
            console.log('hello?')
          })
        }
      })
    },
  },
})
