<template>
  <v-card
    elevation="2"
    outlined
    class="py-6 ma-0"
  >
    <v-card-title class="primary--text">
      <div class="d-flex align-center">
        <div class="ml-4">
          <span class="display-2">Class Meeting/s</span>
        </div>
        <div>
          <v-tabs
            id="meetingTab"
            v-model="activeTab"
            class="pl-8"
            hide-slider
            height="33"
          >
            <v-tab
              v-for="(tab, i) in tabs"
              :key="i"
              class="text-none subtitle-1"
            >
              {{ tab }}
            </v-tab>
          </v-tabs>
        </div>
      </div>
    </v-card-title>
    <v-card-text>
      <v-tabs-items v-model="activeTab">
        <v-tab-item>
          <div v-if="classMeetingsToday.length > 0">
            <class-meeting-item
              v-for="meeting in classMeetingsToday"
              :key="meeting.id"
              :meeting="meeting"
            />
          </div>
          <div
            v-else
            class="px-4 py-6"
          >
            <span class="caption grey--text">No meeting today.</span>
          </div>
        </v-tab-item>
        <v-tab-item>
          <div v-if="classMeetingsThisWeek.length > 0">
            <class-meeting-item
              v-for="meeting in classMeetingsThisWeek"
              :key="meeting.id"
              :meeting="meeting"
            />
          </div>
          <div
            v-else
            class="px-4 py-6"
          >
            <span class="caption grey--text">No meeting this week.</span>
          </div>
        </v-tab-item>
        <v-tab-item>
          <div v-if="classMeetings.length > 0">
            <class-meeting-item
              v-for="meeting in classMeetings"
              :key="meeting.id"
              :meeting="meeting"
            />
          </div>
          <div
            v-else
            class="px-4 py-6"
          >
            <span class="caption grey--text">No meeting found.</span>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

 <script lang="ts">
  import Vue from 'vue'
  import ClassMeetingItem from './ClassMeetingItem.vue'
  import { Meeting } from '@/model/Meeting'
  import moment from 'moment'

  export default Vue.extend({
    name: 'ClassMeetings',
    components: {
      ClassMeetingItem,
    },
    data () {
      return {
        activeTab: 'All Meetings',
        tabs: [
          'Today',
          'This Week',
          'All Meetings',
        ],
      }
    },
    computed: {
      classMeetings (): Meeting[] {
        return this.$store.getters['classes/getAllMeetings']
      },
      classMeetingsToday (): Meeting[] {
        const filteredMeetings = this.classMeetings.filter(meeting => {
          const startOfToday = moment().startOf('day').toDate()
          const endOfToday = moment().add(1, 'days').endOf('day').toDate()
          const meetingDate = meeting.date.toDate()
          return (meetingDate >= startOfToday && meetingDate <= endOfToday)
        })

        return filteredMeetings
      },
      classMeetingsThisWeek (): Meeting[] {
        const filteredMeetings = this.classMeetings.filter(meeting => {
          const firstDayOfWeek = moment().day('Sunday').startOf('day').toDate()
          const lastDayOfWeek = moment().day('Saturday').endOf('day').toDate()
          const meetingDate = meeting.date.toDate()
          return (meetingDate >= firstDayOfWeek && meetingDate <= lastDayOfWeek)
        })

        return filteredMeetings
      },
    },
  })
 </script>

<style lang="scss" scoped>
  div.v-tab.v-tab--active {
    background-color: #2C5F2D;
    color: whitesmoke;
    border-radius: 25px;
  }
</style>
