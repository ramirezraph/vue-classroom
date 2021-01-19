<template>
  <v-card
    min-width="100%"
    min-height="257"
    max-width="100%"
    max-height="257"
    :color="color"
    class="classes mr-4 mb-n4"
  >
    <v-img
      :lazy-src="imageSource"
      :src="imageSource"
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
            {{ title }}
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text
        class="white--text caption"
      >
        <p>{{ description }}</p>
      </v-card-text>
      <v-card-text
        class="white--text caption pa-6"
        :class="title.length > 29 ? 'mt-4' : 'mt-12'"
      >
        <v-row>
          <h2 class="text-h2">
            {{ code }}
          </h2>
          <v-spacer />
          <v-chip
            class="ma-2 px-6"
          >
            <v-avatar left>
              <v-icon>mdi-teach</v-icon>
            </v-avatar>
            {{ teacher }}
          </v-chip>
        </v-row>
      </v-card-text>
    </v-img>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'ClassHeader',
    props: {
      color: {
        type: String,
        required: false,
        default: 'blue',
      },
      image: {
        type: String,
        required: false,
        default: null,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
      teacher: {
        type: String,
        required: true,
      },
    },
    data () {
      return {}
    },
    computed: {
      imageSource (): string {
        return this.image || ''
      },
    },
  })
</script>
