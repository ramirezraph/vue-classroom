<template>
  <v-card
    min-width="700"
    min-height="257"
    max-width="700"
    max-height="257"
    class="classes mr-4 mb-0"
    :color="color"
    hover
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
          <v-col cols="10">
            {{ title }}
          </v-col>
          <v-spacer />
          <v-col>
            <v-btn
              icon
              color="white"
              absolute
              large
              top
            >
              <v-icon>
                mdi-compass-outline
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text
        class="white--text caption"
      >
        <p>{{ description }}</p>
      </v-card-text>
      <v-card-text
        class="white--text caption mt-12 pa-6"
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
            {{ teacherName }}
          </v-chip>
        </v-row>
      </v-card-text>
    </v-img>
  </v-card>
</template>

<script lang="ts">
  export default {
    name: 'ClassItem',
    props: {
      id: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
        default: '',
      },
      code: {
        type: String,
        required: true,
      },
      teacherName: {
        type: String,
        required: true,
      },
      imageSource: {
        type: String,
        required: false,
        default: '',
      },
      color: {
        type: String,
        required: false,
        default: 'grey',
      },
    },
  }
</script>

<style scoped>

</style>
