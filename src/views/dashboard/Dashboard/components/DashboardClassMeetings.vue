<template>
  <v-card
    elevation="2"
    outlined
  >
    <v-card-title class="blue--text">
      <div class="d-inline-flex align-center">
        <div class="ml-4 mt-10">
          Class Meeting/s
        </div>
        <div>
          <v-tabs
            v-model="activeTab"
            class="pt-10 pl-4"
          >
            <v-tab
              v-for="(tab, i) in tabs"
              :key="i"
            >
              <v-btn
                class="text-none white--text"
                rounded
                color="blue"
                max-width="90"
              >
                {{ tab }}
              </v-btn>
            </v-tab>
          </v-tabs>
        </div>
      </div>
    </v-card-title>
    <v-card-text>
      <v-tabs-items v-model="activeTab">
        <v-tab-item>
          <v-card
            max-width="600"
            flat
          >
            <class-meeting-item
              v-for="meeting in meetings"
              :key="meeting.classId"
              :class-id="meeting.classId"
              :teacher-name="meeting.teacherName"
              :class-name="meeting.className"
              :time-start="meeting.timeStart"
              :time-end="meeting.timeEnd"
            />
          </v-card>
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

<style lang="scss">
.short{
  width:100px;
  height: 25px;
}
</style>
