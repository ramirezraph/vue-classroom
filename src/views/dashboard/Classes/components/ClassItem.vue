<template>
  <v-card
    :min-width="minMaxWidth"
    min-height="257"
    :max-width="minMaxWidth"
    max-height="257"
    class="class-item classes"
    :color="color"
    hover
    @click="classOnClicked"
  >
    <v-img
      :lazy-src="imageSource"
      :src="imageSource"
      max-height="257"
      position="center center"
      class="pa-6"
    >
      <v-card-title
        class="classes-title white--text headline py-0 px-2"
      >
        <v-row dense>
          <v-col
            cols="10"
            class="pr-6"
          >
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
        class="py-0 px-2 d-flex flex-column"
        style="height: 175px"
      >
        <div class="white--text caption">
          <p>{{ description }}</p>
        </div>
        <div class="white--text caption mt-auto">
          <div class="d-flex align-center">
            <h2 class="text-h2">
              {{ code }}
            </h2>
            <v-spacer />
            <v-chip>
              <v-avatar left>
                <v-icon>mdi-teach</v-icon>
              </v-avatar>
              {{ teacherName }}
            </v-chip>
          </div>
        </div>
      </v-card-text>
    </v-img>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
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
      ownerId: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: false,
        default: 'grey',
      },
      readonly: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data () {
      return {}
    },
    computed: {
      // eslint-disable-next-line vue/return-in-computed-property
      minMaxWidth (): number {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 460
          case 'sm': return 520
          case 'md': return 520
          case 'lg': return 520
          case 'xl': return 620
        }
      },
    },
    methods: {
      classOnClicked () {
        if (this.readonly) {
          return
        }

        this.$router.push(`classes/${this.id}`)
      },
    },
  })
</script>
