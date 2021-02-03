<template>
  <v-card
    flat
    class="ma-0 pa-4"
    max-width="600"
  >
    <div>
      <small>{{ teacherName }}</small>
    </div>
    <div class="display-1 red--text">
      {{ className }}
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
    <v-divider />
    <v-divider />
  </v-card>
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
