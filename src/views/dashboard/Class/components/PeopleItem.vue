
<template>
  <v-list-item>
    <v-checkbox
      class="ml-3"
    />
    <v-list-item-avatar class="mr-3">
      <v-img :src="profile" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        {{ fullName }}
        {{ type }}
      </v-list-item-title>
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
          class="mr-2"
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
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'PeopleItem',
    props: {
      id: {
        type: String,
        required: true,
        default: '',
      },
      firstName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      profile: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
    },
    computed: {
      fullName () {
        return `${this.firstName} ${this.middleName} ${this.lastName}`
      },
    },
  })
</script>
