import { classesCollection, notificationsCollection, usersCollection } from '@/fb'
import { NotificationType } from '@/model/UserNotification'
import firebase from 'firebase'
import Vue from 'vue'
import getFullName from './fullname'

export default Vue.extend({
  methods: {
    sendPostNotification (classId: string, postUserId: string): void {
      // get poster user name
      let userName = ''
      usersCollection.doc(postUserId).get().then(userDoc => {
        if (userDoc.exists) {
          userName = getFullName(userDoc.data()?.firstName, userDoc.data()?.middleName, userDoc.data()?.lastName)
        }
      }).then(() => {
        // get classCode
        let classCode = ''
        let classTitle = ''
        let classPeopleIds: string[] = []

        classesCollection.doc(classId).get().then(classDoc => {
          if (classDoc.exists) {
            classCode = classDoc.data()?.code
            classTitle = classDoc.data()?.title
            classPeopleIds = classDoc.data()?.userList
          }
        }).then(() => {
          // guards
          if (classPeopleIds || postUserId || userName || classCode || classTitle) {
            // get all ids from people inside the class, except the poster's id
            classPeopleIds.filter(id => id !== postUserId).forEach(userId => {
              notificationsCollection.doc(userId).collection('items').add({
                userId: postUserId,
                type: NotificationType.Regular,
                read: false,
                date: firebase.firestore.Timestamp.now(),
                content: `posted on <strong>${classCode}: ${classTitle}</strong>.`,
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
    sendCommentOnPostNotification (): void {
      console.log('sending comment notification!')
    },
  },
})
