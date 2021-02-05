<template>
  <v-card>
    <div>
      <small>{{ description }}</small>
    </div>
    <div class="display-1 red--text">
      {{ title }}
    </div>
    <div class="d-flex mt-3 pb-6">
      <div>
        <v-chip
          color="green lighten-2"
          class="time-chips white--text px-6 mr-2"
        >
          <v-icon
            left
            small
          >
            mdi-clock-start
          </v-icon>
          {{ timeStart }}
        </v-chip>
        <v-chip
          color="red"
          class="time-chips white--text px-6 mr-2"
        >
          <v-icon
            left
            small
          >
            mdi-clock-end
          </v-icon>
          {{ timeEnd }}
        </v-chip>
      </div>
      <div class="ml-auto">
        <v-btn
          color="blue"
          small
          class="text-none mr-2"
          width="110"
          depressed
          tile
        >
          Join Meeting
        </v-btn>
        <v-btn
          color="red"
          small
          class="text-none mr-2"
          depressed
          tile
          width="110"
        >
          I'll be absent
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'LiveLectureItem',
    props: {
      classId: {
        type: String,
        required: true,
        default: '',
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      timeStart: {
        type: String,
        required: true,
      },
      timeEnd: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
        default: '',
      },
    },
    data () {
      return {

      }
    },
  })
</script>
