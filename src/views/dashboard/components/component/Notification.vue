<template>
  <v-card
    flat
    class="ma-0 pa-0"
  >
    <div class="d-flex align-start px-3">
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
        <v-card-title class="text-h4 pt-4 d-flex">
          <span>{{ fullName }}</span>
        </v-card-title>
        <v-card-text class="subtitle-1">
          <div v-if="type === 'Regular'">
            {{ notification.content }}
          </div>
          <div v-else-if="type === 'Assignment'">
            Posted a new assignment in {{ classCode }}: {{ classTitle }}.
            <br>
            <span class="caption grey--text">Due: 5/19/2021, 12:00 AM</span>
          </div>
          <div v-else-if="type === 'ClassInvite'">
            Invited you to join the class:
            <strong>{{ classCode }}: {{ classTitle }}</strong>.
          </div>
          <div v-else-if="type === 'ClassInviteResult'">
            Accepted your request to join the class: <br>
            <strong>{{ classCode }}: {{ classTitle }}</strong>.
          </div>
        </v-card-text>
      </div>
    </div>
    <v-card-actions
      v-if="type === 'ClassInvite'"
      class="ml-16 py-0 pb-3"
    >
      <v-btn
        color="primary"
        width="150"
        class="ma-0 ml-1"
        @click="inviteAccept()"
      >
        Accept
      </v-btn>
      <v-btn
        class="ma-0 ml-3"
        @click="inviteDecline()"
      >
        Decline
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { UserNotification, NotificationType, ClassInviteNotification } from '@/model/UserNotification'
  import { classesCollection, notificationsCollection, usersCollection } from '@/fb'
  import getFullName from '@/plugins/fullname'
  import firebase from 'firebase'
  import { Class } from '@/model/Class'
  import { User } from '@/model/User'

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

      if (this.type.toString() === 'ClassInvite' || this.type.toString() === 'ClassInviteResult' || this.type.toString() === 'Assignment') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        classesCollection.doc(this.notification?.classId).get().then(doc => {
          if (doc.exists) {
            this.classTitle = doc.data()?.title
            this.classCode = doc.data()?.code
          }
        })
      }
    },
    methods: {
      inviteAccept (): void {
        console.log('accept')
      },
      inviteDecline (): void {
        // remove from pending invites list
        classesCollection.doc((this.notification as ClassInviteNotification).classId).update({
          pendingInvites: firebase.firestore.FieldValue.arrayRemove(this.currentUser.id),
        })
          .then(() => {
            // remove notification
            notificationsCollection.doc(this.currentUser.id).collection('items').where('classId', '==', (this.notification as ClassInviteNotification).classId).get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  if (doc.exists) {
                    notificationsCollection.doc(this.currentUser.id).collection('items').doc(doc.id).delete()
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
    },
  })
</script>

<style lang="scss" scoped>
  .profile {
    object-fit: cover;
  }
</style>
