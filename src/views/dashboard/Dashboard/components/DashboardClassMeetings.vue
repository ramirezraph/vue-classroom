<template>
  <v-card
    elevation="2"
    outlined
    class="ma-0 py-6"
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
          <class-meeting-item
            v-for="meeting in classMeetings"
            :key="meeting.id"
            :meeting="meeting"
          />
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

 <script lang="ts">
  import Vue from 'vue'
  import ClassMeetingItem from './ClassMeetingItem.vue'
  import { Meeting } from '@/model/Meeting'

  export default Vue.extend({
    name: 'ClassMeetings',
    components: {
      ClassMeetingItem,
    },
    data () {
      return {
        activeTab: 'All Meetings',
        tabs: [
          'All Meetings',
          'Today',
          'This Week',
        ],
      }
    },
    computed: {
      classMeetings (): Meeting[] {
        return this.$store.getters['classes/meetings']
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
