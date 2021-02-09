<template>
  <v-list>
    <v-list-item>
      <v-checkbox
        :input-value="active"
        class="ml-3"
      />
      <v-list-item-avatar class="mr-3">
        <v-img :src="studentAvatar" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-html="studentName" />
      </v-list-item-content>
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
