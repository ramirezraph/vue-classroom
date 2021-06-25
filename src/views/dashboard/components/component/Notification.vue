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
      >
        Accept
      </v-btn>
      <v-btn
        class="ma-0 ml-3"
      >
        Decline
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { UserNotification, NotificationType } from '@/model/UserNotification'
  import { classesCollection, usersCollection } from '@/fb'
  import getFullName from '@/plugins/fullname'

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
  })
</script>

<style lang="scss" scoped>
  .profile {
    object-fit: cover;
  }
</style>
