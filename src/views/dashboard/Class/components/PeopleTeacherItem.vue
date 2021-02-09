<template>
  <v-row>
    <v-col cols="9">
      <v-avatar
        size="36px"
        class="ml-2 mr-4"
      >
        <img
          :src="teacherAvatar"
          alt="john"
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
        <v-icon>
          mdi-account-remove-outline
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
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
      teacherAvatar: {
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
