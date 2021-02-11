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
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            text
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>
              mdi-email-outline
            </v-icon>
          </v-btn>
        </template>
        <span>Send an Email</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            text
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>
              mdi-account-details-outline
            </v-icon>
          </v-btn>
        </template>
        <span>View Info</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            text
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>
              mdi-account-remove-outline
            </v-icon>
          </v-btn>
        </template>
        <span>Remove</span>
      </v-tooltip>
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
