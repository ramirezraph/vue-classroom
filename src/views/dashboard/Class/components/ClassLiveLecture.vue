<template>
  <v-card
    flat
    outlined
    class="mt-0"
  >
    <v-card-title>
      <v-btn
        color="blue"
        rounded
        class="mt-4 ml-5"
      >
        <v-icon left>
          mdi-video-outline
        </v-icon>
        <span class="text-none">New Meeting</span>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <live-lecture-item
        v-for="item in lectures"
        :key="item.classId"
        :class-id="item.classId"
        :title="item.title"
        :description="item.description"
        :date="item.date"
        :time-start="item.timeStart"
        :time-end="item.timeEnd"
        :link="item.link"
      />
    </v-card-text>
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
          { classId: '', title: 'Lecture 1: Introduction & Orientation', description: 'Lorem ipsum dolor antem', date: '2/27/2021', timeStart: '11:00AM', timeEnd: '12:30PM', link: '' },
        ],
      }
    },
  })
</script>

<style scoped>

</style>
