<template>
  <v-card
    min-width="100%"
    min-height="257"
    max-width="100%"
    max-height="257"
    :color="color"
  >
    <v-img
      :lazy-src="imageSource"
      :src="imageSource"
      max-height="257"
      position="center center"
    >
      <v-card-title
        class="white--text pa-8 text-left"
      >
        <v-row
          dense
          no-gutters
        >
          <v-col cols="12">
            <span class="headline">{{ title }}</span>
          </v-col>
          <v-col cols="12">
            <span class="caption">{{ description || '\0' }}</span>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="px-8 text-left">
        <v-card
          flat
          class="transparent white--text caption"
          :class="marginTop"
        >
          <v-row
            dense
            no-gutters
          >
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
        </v-card>
      </v-card-text>
    </v-img>
  </v-card>
</template>

<script lang="ts">
  import { usersCollection } from '@/fb'
  import getFullName from '@/plugins/fullname'
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
      ownerId: {
        type: String,
        required: true,
      },
    },
    data () {
      return {
        teacherName: '',
      }
    },
    computed: {
      imageSource (): string {
        return this.image || ''
      },
      marginTop (): string {
        if (this.title.length > 43 && this.description.length > 90) {
          return 'mt-0'
        } else if (this.title.length > 43 && this.description.length <= 90) {
          return 'mt-6'
        } else if (this.title.length <= 43 && this.description.length > 90) {
          return 'mt-8'
        } else {
          return 'mt-16'
        }
      },
    },
    mounted () {
      usersCollection.doc(this.ownerId).get().then(doc => {
        if (doc.exists) {
          this.teacherName = getFullName(doc.data()?.firstName, doc.data()?.middleName, doc.data()?.lastName)
        }
      })
    },
  })
</script>
