<template>
  <v-card
    flat
    outlined
    color="white"
    class="mt-0"
  >
    <v-card-title class="mt-5">
      <v-btn
        color="blue"
        rounded
      >
        <v-icon>
          mdi-video-outline
        </v-icon>
        <span class="text-none">New Meeting</span>
      </v-btn>
    </v-card-title>
    <v-card class="ma-2">
      <v-card-text>
        {{ lectures.title }}
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  import LiveLectureItem from './LiveLectureItem.vue'
  export default Vue.extend({
    name: 'ClassLiveLecture',
    components: {
      LiveLectureItem,
    },
    data () {
      return {
        lectures: [
          { classId: '', title: 'John L. Doe', description: 'Logic Gates and Design', date: '2/27/2021', timeStart: '11:00AM', timeEnd: '12:30PM', link: '' },
        ],
      }
    },
  })
</script>

<style scoped>

</style>
