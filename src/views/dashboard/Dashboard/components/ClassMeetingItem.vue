<template>
  <v-tabs-items>
    <v-card
      flat
    >
      <div class="heading black--text">
        {{ teacherName }}
      </div>
      <div class="display-1 red--text">
        {{ className }}
      </div>
      <div>
        <v-chip
          color="green lighten-2"
          class="mr-5 short justify-center"
        >
          {{ timeStart }}
        </v-chip>
        <v-chip
          color="red"
          class="mr-5 short justify-center"
        >
          {{ timeEnd }}
        </v-chip>
        <v-btn
          color="blue"
          small
          class="button ml-11 mb-3 text-none"
          depressed
          tile
        >
          Join Meeting
        </v-btn>
        <v-btn
          color="red"
          small
          class="button mr-5 ml-4 mb-3 text-none"
          depressed
          tile
        >
          I'll be absent
        </v-btn>
      </div>
    </v-card>
    <v-divider />
  </v-tabs-items>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'ClassMeetingItem',
    props: {
      classId: {
        type: String,
        required: true,
        default: '',
      },
      teacherName: {
        type: String,
        required: true,
      },
      className: {
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
    },
    data () {
      return {

      }
    },
  })
</script>
