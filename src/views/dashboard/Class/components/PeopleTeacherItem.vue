<template>
  <v-card class="mt-0">
    <v-card-title>
      <span class="blue--text ml-2 mt-2">Teacher</span>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="9">
          <v-avatar class="ml-2 mr-4">
            <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
              size="36"
            >
          </v-avatar>
          <span>{{ teacherName }}</span>
        </v-col>
        <v-col>
          <v-btn
            icon
            text
          >
            <v-icon>
              mdi-email-outline
            </v-icon>
          </v-btn>
          <v-btn
            icon
            text
          >
            <v-icon>
              mdi-account-details-outline
            </v-icon>
          </v-btn>
          <v-btn
            icon
            text
          >
            <v-icon class="ml-auto my-auto">
              mdi-account-remove-outline
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'PeopleTeacherItem',
    props: {
      teacherId: {
        type: String,
        required: true,
        default: '',
      },
      avatar: {
        type: String,
        required: true,
      },
      teacherName: {
        type: String,
        required: true,
      },
      actions: {
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
