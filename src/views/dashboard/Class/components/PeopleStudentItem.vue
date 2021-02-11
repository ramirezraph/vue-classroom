
<template>
  <v-list>
    <v-list-item>
      <v-checkbox
        class="ml-3"
      />
      <v-list-item-avatar class="mr-3">
        <v-img :src="studentAvatar" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-html="studentName" />
      </v-list-item-content>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            text
            v-bind="attrs"
            class="ml-5"
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
      </v-tooltip><v-tooltip bottom>
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
    </v-list-item>
    <v-divider />
  </v-list>
</template>

    <script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'PeopleStudentItem',
    props: {

      studentId: {
        type: String,
        required: true,
        default: '',
      },
      studentAvatar: {
        type: String,
        required: true,
      },
      studentName: {
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
