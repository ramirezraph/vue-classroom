<template>
  <v-tabs-items>
    <v-card
      flat
      class="ma-7 ml-4"
    >
      <div>
        <small>{{ teacherName }}</small>
      </div>
      <div class="display-1 red--text">
        {{ className }}
      </div>
      <div>
        <v-chip
          color="green lighten-2"
          class="mr-5 mb-3 short justify-center white--text"
          width="150"
          small
        >
          {{ timeStart }}
        </v-chip>
        <v-chip
          color="red"
          class="mr-10 mb-3 short justify-center white--text"
          width="150"
          small
        >
          {{ timeEnd }}
        </v-chip>
        <v-btn
          color="blue"
          small
          class="button ml-16 mb-5 text-none"
          width="110"
          depressed
          tile
        >
          Join Meeting
        </v-btn>
        <v-btn
          color="red"
          small
          class="button mr-10 ml-4 mb-5 text-none"
          depressed
          tile
          width="110"
        >
          I'll be absent
        </v-btn>
      </div>
      <v-divider
        dark
      />
    </v-card>
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
