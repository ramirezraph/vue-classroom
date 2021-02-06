<template>
  <v-card
    outlined
    class="ma-4"
  >
    <v-card-title>
      <v-toolbar
        class="mt-4"
        dense
        flat
      >
        <v-toolbar-title>
          <span class="blue--text headline">{{ title }}</span>
          <p class="caption">
            {{ description }}
          </p>
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          icon
          class="mb-8"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card-title>
    <v-card-text>
      <div class="mx-7 mb-3">
        <v-icon>mdi-calendar</v-icon>
        <v-chip
          small
          class="ml-4 white--text justify-center"
          style="width: 15%;"
          color="grey darken-2"
        >
          {{ date }}
        </v-chip>
      </div>
      <div class="mx-7 my-3">
        <v-icon>mdi-clock-start</v-icon>
        <v-chip
          small
          class="ml-4 white--text justify-center"
          style="width: 15%;"
          color="green lighten-3"
        >
          {{ timeStart }}
        </v-chip>
      </div>
      <div class="mx-7 my-3">
        <v-icon>mdi-clock-end</v-icon>
        <v-chip
          small
          class="ml-4 white--text justify-center"
          style="width: 15%;"
          color="red lighten-3"
        >
          {{ timeEnd }}
        </v-chip>
      </div>
      <div class="px-7">
        <v-btn
          class="text-none"
          color="blue"
        >
          <v-icon
            left
            class="px-3"
            small
          >
            mdi-video-wireless-outline
          </v-icon>
          Join Meeting
        </v-btn>
        <v-btn
          class="ml-3 text-none"
          color="red lighten-1"
        >
          I'll be absent
        </v-btn>
      </div>
    </v-card-text>
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
