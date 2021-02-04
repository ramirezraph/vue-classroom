<template>
  <v-card
    elevation="2"
    outlined
    class="ma-0 py-6"
  >
    <v-card-title class="blue--text">
      <div class="d-block align-center">
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
          <class-meeting-item
            v-for="meeting in meetings"
            :key="meeting.classId"
            :class-id="meeting.classId"
            :teacher-name="meeting.teacherName"
            :class-name="meeting.className"
            :time-start="meeting.timeStart"
            :time-end="meeting.timeEnd"
          />
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

 <script lang="ts">
  import Vue from 'vue'
  import ClassMeetingItem from './ClassMeetingItem.vue'

  export default Vue.extend({
    name: 'ClassMeetings',
    components: {
      ClassMeetingItem,
    },
    data () {
      return {
        activeTab: 'Today',
        tabs: [
          'Today',
          'This Week',
        ],
        meetings: [
          { teacherName: 'John L. Doe', className: 'Logic Gates and Design', timeStart: '11:00AM', timeEnd: '12:30PM' },
          { teacherName: 'John L. Doe', className: 'Differential Calculus', timeStart: '11:00AM', timeEnd: '12:30PM' },
        ],
      }
    },
  })
 </script>

<style lang="scss" scoped>
  div.v-tab.v-tab--active {
    background-color: rgb(33, 150, 243);
    color: whitesmoke;
    border-radius: 25px;
  }
</style>
