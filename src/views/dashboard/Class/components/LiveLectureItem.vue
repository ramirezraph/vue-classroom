<template>
  <v-card
    outlined
    class="ma-4"
  >
    <v-card-title>
      <v-toolbar
        class="mt-4"
        dense
        flat
      >
        <v-toolbar-title>
          <span class="info--text headline">{{ meeting.title }}</span>
        </v-toolbar-title>
        <v-spacer />
        <v-menu
          v-if="hasEditAccess"
          rounded
          offset-y
        >
          <template #activator="{ attrs, on }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                mdi-dots-vertical
              </v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              link
            >
              <v-icon left>
                mdi-pencil-outline
              </v-icon>
              <span>Edit</span>
            </v-list-item>
            <v-list-item
              link
              @click="deleteMeeting"
            >
              <v-icon left>
                mdi-delete-outline
              </v-icon>
              <span>Remove</span>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <div
        v-if="meeting.description"
        class="mx-5 mb-n6"
      >
        <v-textarea
          :value="meeting.description"
          rows="1"
          auto-grow
          flat
          style="white-space: pre"
          readonly
          solo
          dense
        />
      </div>
      <div class="mx-7 mb-3 mt-3">
        <v-icon>mdi-account</v-icon>
        <v-chip
          class="ml-4 white--text justify-center"
          color="grey darken-3"
        >
          {{ teacherName }}
        </v-chip>
      </div>
      <div class="mx-7 mb-3 mt-3">
        <v-icon>mdi-calendar</v-icon>
        <v-chip
          class="ml-4 white--text justify-center"
          color="warning"
        >
          {{ convertedDate }}
        </v-chip>
      </div>
      <div class="mx-7 my-3">
        <v-icon>mdi-clock-start</v-icon>
        <v-chip
          class="ml-4 white--text justify-center"
          color="primary"
        >
          {{ meeting.timeStart }}
        </v-chip>
      </div>
      <div class="mx-7 my-3">
        <v-icon>mdi-clock-end</v-icon>
        <v-chip
          class="ml-4 white--text justify-center"
          color="error"
        >
          {{ meeting.timeEnd }}
        </v-chip>
      </div>
      <div class="px-7 mt-6">
        <v-btn
          v-if="!meeting.isClosed"
          class="text-none"
          color="info"
          @click="joinMeeting"
        >
          <v-icon
            left
            small
          >
            mdi-video-wireless-outline
          </v-icon>
          Join Meeting
        </v-btn>
        <v-btn
          v-if="hasEditAccess && meeting.isClosed"
          class="ml-3 text-none"
          color="primary"
          @click="openMeeting"
        >
          <v-icon
            left
            small
          >
            mdi-video-wireless-outline
          </v-icon>
          Open Meeting
        </v-btn>
        <v-btn
          v-if="hasEditAccess && !meeting.isClosed"
          class="ml-3 text-none"
          color="error"
          @click="closeMeeting"
        >
          <v-icon
            left
            small
          >
            mdi-video-off-outline
          </v-icon>
          Close Meeting
        </v-btn>
      </div>
    </v-card-text>
    <confirm-dialog
      v-if="dialogConfirmClose"
      :model="dialogConfirmClose"
      title="Close Meeting"
      text="Are you sure you want to close the meeting?"
      @goto-response="confirmCloseMeeting"
    />
    <confirm-dialog
      v-if="dialogConfirmOpen"
      :model="dialogConfirmOpen"
      title="Open Meeting"
      text="Are you sure you want to open the meeting?"
      @goto-response="confirmOpenMeeting"
    />
    <confirm-dialog
      v-if="dialogConfirmDelete"
      :model="dialogConfirmDelete"
      title="Delete Meeting"
      text="Are you sure you want to delete the meeting?"
      @goto-response="confirmDeleteMeeting"
    />
  </v-card>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { lecturesCollection, usersCollection } from '@/fb'
  import { Meeting } from '@/model/Meeting'
  // eslint-disable-next-line no-undef
  export default Vue.extend({
    name: 'LiveLectureItem',
    props: {
      meeting: {
        type: Object as PropType<Meeting>,
        required: true,
        default: '',
      },
      hasEditAccess: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data () {
      return {
        teacherName: '',
        dialogConfirmClose: false,
        dialogConfirmOpen: false,
        dialogConfirmDelete: false,
      }
    },
    computed: {
      convertedDate (): string {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        const theDate = this.meeting.date.toDate()
        return theDate.toLocaleDateString(undefined, options)
      },
    },
    mounted () {
      usersCollection.doc(this.meeting.teacherId).get().then(doc => {
        if (doc.exists) {
          this.teacherName = this.getFullName(doc.data()?.firstName, doc.data()?.middleName, doc.data()?.lastName)
        }
      })
    },
    methods: {
      getFullName (firstName: string, middleName: string, lastName: string): string {
        return `${firstName} ${this.middleInitial(middleName)} ${lastName}`
      },
      middleInitial (middleName: string): string {
        const midName: string[] = middleName.split(' ')
        let middleInitial = ''
        for (let i = 0; i < midName.length; i++) {
          middleInitial += midName[i].substring(0, 1) + '.'
        }

        return middleInitial
      },
      closeMeeting (): void {
        this.dialogConfirmClose = true
      },
      confirmCloseMeeting (response: boolean): void {
        if (response) {
          lecturesCollection.doc(this.meeting.id).set({
            isClosed: true,
          }, { merge: true }).then(() => {
            this.$notify({
              group: 'appWideNotification',
              title: 'Success',
              text: 'The meeting is now closed.',
              type: 'success',
            })
          }).catch(error => {
            this.$notify({
              group: 'appWideNotification',
              title: 'Failed',
              text: error.message,
              type: 'error',
            })
          })
        }
        this.dialogConfirmClose = false
      },
      openMeeting (): void {
        this.dialogConfirmOpen = true
      },
      confirmOpenMeeting (response: boolean): void {
        if (response) {
          lecturesCollection.doc(this.meeting.id).set({
            isClosed: false,
          }, { merge: true }).then(() => {
            this.$notify({
              group: 'appWideNotification',
              title: 'Success',
              text: 'The meeting is now open.',
              type: 'success',
            })
          }).catch(error => {
            this.$notify({
              group: 'appWideNotification',
              title: 'Failed',
              text: error.message,
              type: 'error',
            })
          })
        }
        this.dialogConfirmOpen = false
      },
      joinMeeting (): void {
        try {
          window.open(this.meeting.link, '_blank')
        } catch (error) {
          this.$notify({
            group: 'appWideNotification',
            title: 'Failed',
            text: error.message,
            type: 'error',
          })
        }
      },
      deleteMeeting (): void {
        this.dialogConfirmDelete = true
      },
      confirmDeleteMeeting (response: boolean): void {
        if (response) {
          lecturesCollection.doc(this.meeting.id).delete().then(() => {
            this.$notify({
              group: 'appWideNotification',
              title: 'Success',
              text: 'The meeting has been deleted.',
              type: 'success',
            })
          }).catch(error => {
            this.$notify({
              group: 'appWideNotification',
              title: 'Failed',
              text: error.message,
              type: 'error',
            })
          })
        }

        this.dialogConfirmDelete = false
      },
    },
  })
</script>
