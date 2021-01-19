<template>
  <v-card
    min-width="100%"
    min-height="257"
    max-width="100%"
    max-height="257"
    class="classes mr-4 mb-n4"
    :color="classDate.color"
  >
    <v-img
      :lazy-src="value.imageSource"
      :src="classDate.imageSource"
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
            {{ classDate.title }}
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text
        class="white--text caption"
      >
        <p>{{ classDate.description }}</p>
      </v-card-text>
      <v-card-text
        class="white--text caption pa-6"
        :class="classDate.title.length > 29 ? 'mt-4' : 'mt-12'"
      >
        <v-row>
          <h2 class="text-h2">
            {{ classDate.code }}
          </h2>
          <v-spacer />
          <v-chip
            class="ma-2 px-6"
          >
            <v-avatar left>
              <v-icon>mdi-teach</v-icon>
            </v-avatar>
            {{ classDate.teacherName }}
          </v-chip>
        </v-row>
      </v-card-text>
    </v-img>
  </v-card>
</template>

<script lang="ts">
  import { Class } from '@/model/Class'
  import Vue, { PropType } from 'vue'

  export default Vue.extend({
    name: 'ClassHeader',
    props: {
      value: {
        type: Object as PropType<Class>,
        required: true,
      },
    },
    data () {
      return {

      }
    },
    computed: {
      classDate (): Class {
        return this.value
      },
    },
  })
</script>
