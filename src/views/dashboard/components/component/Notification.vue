<template>
  <v-card
    flat
    class="ma-0 pa-0"
  >
    <div class="px-3 d-flex align-start">
      <div class="pt-5">
        <v-avatar size="48">
          <img
            alt="user"
            width="100%"
            :src="imgProfileLink"
            class="profile"
          >
        </v-avatar>
      </div>
      <div>
        <v-card-title class="pt-4 text-h4 d-flex">
          <span class="mr-3">{{ fullName }}</span>
        </v-card-title>
        <v-card-text class="subtitle-1">
          <div
            v-if="type === 'Regular'"
          >
            <p
              class="ma-0 pa-0"
            >
              <span v-html="notification.content" />
            </p>
          </div>
          <div
            v-else-if="type === 'Post'"
          >
            <p
              class="d-block ma-0 pa-0"
            >
              posted in <strong>{{ classCode }}: {{ classTitle }}</strong>.
            </p>
            <v-btn
              text
              class="justify-start primary--text pa-0"
              small
              @click="postNotificationClicked(notification.postId, notification.classId)"
            >
              View Class
            </v-btn>
          </div>
          <div
            v-else-if="type === 'Comment'"
          >
            <p
              class="d-block ma-0 pa-0"
            >
              {{ andNumberOthersText }}commented on your post in <strong>{{ classCode }}: {{ classTitle }}</strong>.
            </p>
            <v-btn
              text
              class="justify-start primary--text pa-0"
              small
              @click="postNotificationClicked(notification.postId, notification.classId)"
            >
              View Class
            </v-btn>
          </div>
          <div
            v-else-if="type === 'Assignment'"
          >
            Posted a new assignment in {{ classCode }}: {{ classTitle }}.
            <br>
            <span
              class="caption grey--text"
            >Due: 5/19/2021, 12:00 AM</span>
          </div>
          <div
            v-else-if="type === 'ClassInvite'"
          >
            Invited you to join the class:
            <strong>{{ classCode }}: {{ classTitle }}</strong>.
          </div>
          <div
            v-else-if="type === 'ClassInviteResult'"
          >
            Accepted your request to join the class: <br>
            <strong>{{ classCode }}: {{ classTitle }}</strong>.
          </div>
          <span class="caption grey--text ma-0 pa-0">
            {{ displayDate }}
          </span>
        </v-card-text>
      </div>
    </div>
    <v-card-actions
      v-if="type === 'ClassInvite' && !notification.result"
      class="py-0 pb-3 ml-16"
    >
      <v-btn
        color="primary"
        width="150"
        class="ml-1 ma-0"
        @click="inviteAccept()"
      >
        Accept
      </v-btn>
      <v-btn
        class="ml-3 ma-0"
        @click="inviteDecline()"
      >
        Decline
      </v-btn>
    </v-card-actions>
    <v-card-actions
      v-else-if="notification.result"
      class="py-0 pb-3 ml-16"
    >
      <span class="ml-1 caption grey--text">{{ notification.result }}.</span>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { UserNotification, NotificationType, ClassInviteNotification, CommentNotification } from '@/model/UserNotification'
  import { classesCollection, notificationsCollection, usersCollection } from '@/fb'
  import getFullName from '@/plugins/fullname'
  import firebase from 'firebase'
  import { Class } from '@/model/Class'
  import { User } from '@/model/User'
  import moment from 'moment'

  export default Vue.extend({
    props: {
      notification: {
        type: Object as PropType<UserNotification>,
        required: true,
      },
    },
    data () {
      return {
        imgProfileLink: null,
        fullName: '',
        classTitle: '',
        classCode: '',

        requiresClassInfo: false,

        displayDate: null,
      }
    },
    computed: {
      type (): NotificationType {
        return this.notification.type
      },
      activeClass (): Class {
        return this.$store.getters['class/getActiveClass']
      },
      currentUser (): User {
        return this.$store.getters['user/getCurrentUser']
      },
      andNumberOthersText (): string {
        if (this.type === 'Comment') {
          const number = (this.notification as CommentNotification).numberOfOtherUser - 1
          if (number === 0) return ''
          if (number === 1) {
            return `and ${number} other `
          }

          return `and ${number} others `
        }

        return ''
      },
    },
    mounted () {
      usersCollection.doc(this.notification.userId).get().then(
        doc => {
          if (doc.exists) {
            this.imgProfileLink = doc.data()?.imgProfile
            this.fullName = getFullName(doc.data()?.firstName, doc.data()?.middleName, doc.data()?.lastName)
          }
        },
      )

      if (
        this.type.toString() === 'ClassInvite' ||
        this.type.toString() === 'ClassInviteResult' ||
        this.type.toString() === 'Assignment' ||
        this.type.toString() === 'Post' ||
        this.type.toString() === 'Comment') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        classesCollection.doc(this.notification?.classId).get().then(doc => {
          if (doc.exists) {
            this.classTitle = doc.data()?.title
            this.classCode = doc.data()?.code
          }
        })
      }

      // date now
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.displayDate = moment(this.notification.date.toDate()).fromNow()
    },
    methods: {
      inviteAccept (): void {
        if (!this.currentUser) return

        if (!this.notification) return

        // check if already enrolled
        const foundClass = this.$store.getters['classes/getClass']((this.notification as ClassInviteNotification).classId)
        if (foundClass) {
          this.$notify({
            group: 'appWideNotification',
            title: 'Enrolled Failed',
            text: 'You are already enrolled in this class.',
            type: 'error',
          })
          return
        }

        const data = classesCollection.doc((this.notification as ClassInviteNotification).classId).get()
        data.then(classDoc => {
          // check if class exists
          if (classDoc.exists) {
            // class found

            // add to people collection
            classesCollection.doc(classDoc.id).collection('people')
              .doc(this.currentUser.id)
              .set({
                type: 'Student',
              }).then(() => {
                // add to userList array
                classesCollection.doc(classDoc.id).update({
                  userList: firebase.firestore.FieldValue.arrayUnion(this.currentUser.id),
                }).then(() => {
                  // remove from class pending list
                  classesCollection.doc((this.notification as ClassInviteNotification).classId).update({
                    pendingInvites: firebase.firestore.FieldValue.arrayRemove(this.currentUser.id),
                  }).then(() => {
                    // update notification
                    this.updateClassInviteNotificationResult('Accepted')
                    this.$notify({
                      group: 'appWideNotification',
                      title: 'Enrolled Success',
                      text: 'You have joined the class successfully.',
                      type: 'success',
                    })
                    setTimeout(() => {
                      this.$store.dispatch('classes/fetchAllMeetings', { currentUser: this.currentUser })
                    }, 1000)
                  }).catch(error => {
                    // error adding on people collection
                    this.$notify({
                      group: 'appWideNotification',
                      title: 'Join Class Failed.',
                      text: error.message,
                      type: 'error',
                    })
                  })
                }).catch(error => {
                  // error adding on people collection
                  this.$notify({
                    group: 'appWideNotification',
                    title: 'Join Class Failed.',
                    text: error.message,
                    type: 'error',
                  })
                })
              }).catch(error => {
                // error adding on people collection
                this.$notify({
                  group: 'appWideNotification',
                  title: 'Join Class Failed.',
                  text: error.message,
                  type: 'error',
                })
              })
          } else {
            // error getting the class document
            this.$notify({
              group: 'appWideNotification',
              title: 'Join Class Failed.',
              text: 'The class invite is no longer valid. You can refer to the teacher if this is a mistake.',
              type: 'error',
            })
          }
        }).catch(error => {
          this.$notify({
            group: 'appWideNotification',
            title: 'Join Class Failed.',
            text: error.message,
            type: 'error',
          })
        })
      },
      inviteDecline (): void {
        // remove from pending invites list
        classesCollection.doc((this.notification as ClassInviteNotification).classId).update({
          pendingInvites: firebase.firestore.FieldValue.arrayRemove(this.currentUser.id),
        })
          .then(() => {
            // update notification
            this.updateClassInviteNotificationResult('Declined')
          })
          .catch(error => {
            this.$notify({
              group: 'appWideNotification',
              title: 'Failed',
              text: error.message,
              type: 'error',
            })
          })
      },
      updateClassInviteNotificationResult (result: string): void {
        if (!result) return
        if (!this.currentUser) return
        if (!this.notification) return

        // update notification
        notificationsCollection.doc(this.currentUser.id).collection('items').where('classId', '==', (this.notification as ClassInviteNotification).classId).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              if (doc.exists) {
                notificationsCollection.doc(this.currentUser.id).collection('items').doc(doc.id).set({
                  result: result,
                }, { merge: true })
              }
            })
          }).catch(error => {
            this.$notify({
              group: 'appWideNotification',
              title: 'Failed',
              text: error.message,
              type: 'error',
            })
          })
      },

      // events
      postNotificationClicked (postId: string, classId: string): void {
        const pathToGo = '/classes/' + classId
        const currentPath = this.$router.currentRoute.path

        if (!(postId || classId)) return
        if (pathToGo === currentPath) return

        this.$router.replace(pathToGo)
      },
    },
  })
</script>

<style lang="scss" scoped>
  .profile {
    object-fit: cover;
  }
</style>
