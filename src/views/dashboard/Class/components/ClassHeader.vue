<template>
  <v-card
    min-width="100%"
    min-height="257"
    max-width="100%"
    max-height="257"
    class="classes mr-4 mb-n4"
    :color="value._color"
  >
    <v-img
      :lazy-src="value._imageSource"
      :src="value._imageSource"
      max-height="257"
      position="center center"
      class="pa-6"
    >
      <v-card-title
        class="classes-title white--text headline"
      >
        <v-row dense>
          <v-col
            cols="10"
            class="pr-6"
          >
            {{ value._title }}
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text
        class="white--text caption"
      >
        <p>{{ value._description }}</p>
      </v-card-text>
      <v-card-text
        class="white--text caption pa-6"
        :class="value._title.length > 29 ? 'mt-4' : 'mt-12'"
      >
        <v-row>
          <h2 class="text-h2">
            {{ value._code }}
          </h2>
          <v-spacer />
          <v-chip
            class="ma-2 px-6"
          >
            <v-avatar left>
              <v-icon>mdi-teach</v-icon>
            </v-avatar>
            {{ value._teacherName }}
          </v-chip>
        </v-row>
      </v-card-text>
    </v-img>
  </v-card>
</template>

<script lang="ts">
  import { Class } from '@/model/Class'
  import Vue from 'vue'

  export default Vue.extend({
    name: 'ClassHeader',
    props: {
      value: {
        type: Class,
        required: true,
      },
    },
    data () {
      return {

      }
    },
  })
</script>
