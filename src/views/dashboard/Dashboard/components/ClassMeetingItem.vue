<template>
  <v-card
    flat
    class="ma-0 pa-4"
    max-width="600"
  >
    <div>
      <small class="grey--text">{{ convertedDate }}</small>
    </div>
    <div class="display-2 info--text">
      {{ meeting.title }}
    </div>
    <span class="caption grey--text">
      {{ gcName }}
    </span>
    <div class="d-flex mt-3 pb-6">
      <div>
        <v-chip
          color="primary"
          class="time-chips white--text px-6 mr-2"
        >
          <v-icon
            left
            small
          >
            mdi-clock-start
          </v-icon>
          {{ meeting.timeStart }}
        </v-chip>
        <v-chip
          color="error"
          class="time-chips white--text px-6 mr-2"
        >
          <v-icon
            left
            small
          >
            mdi-clock-end
          </v-icon>
          {{ meeting.timeEnd }}
        </v-chip>
      </div>
      <div class="ml-auto">
        <v-btn
          color="info"
          small
          class="text-none mr-2"
          width="110"
          depressed
          tile
          @click="joinMeeting"
        >
          Join Meeting
        </v-btn>
        <v-btn
          color="grey darken-3"
          small
          class="text-none mr-2"
          depressed
          tile
          width="110"
          @click="goToClass"
        >
          Go to Class
        </v-btn>
      </div>
    </div>
    <v-divider />
    <v-divider />
  </v-card>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { Meeting } from '@/model/Meeting'
  import { classesCollection } from '@/fb'
  export default Vue.extend({
    name: 'ClassMeetingItem',
    props: {
      meeting: {
        type: Object as PropType<Meeting>,
        required: true,
      },
    },
    data () {
      return {
        className: '',
      }
    },
    computed: {
      convertedDate (): string {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        const theDate = this.meeting.date.toDate()
        return theDate.toLocaleDateString(undefined, options)
      },
      gcName (): string {
        return this.className
      },
    },
    mounted () {
      this.getNameOfClass()
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
      getNameOfClass (): void {
        classesCollection.doc(this.meeting.classId).get()
          .then(doc => {
            if (doc.exists) {
              this.className = doc.data()?.title
            }
          })
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
      goToClass (): void {
        this.$router.push(`classes/${this.meeting.classId}`)
      },
    },
  })
</script>
