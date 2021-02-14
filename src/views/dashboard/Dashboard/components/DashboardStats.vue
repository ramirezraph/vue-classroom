<template>
  <v-row>
    <!-- Stats -->
    <v-col
      cols="12"
      sm="6"
    >
      <base-material-stats-card
        color="red lighten-1"
        icon="mdi-notebook"
        title="Subject"
        :value="numberOfSubjects"
      />
    </v-col>
    <v-col
      cols="12"
      sm="6"
    >
      <base-material-stats-card
        color="red lighten-1"
        icon="mdi-calendar-month"
        title="Assignment"
        :value="numberOfAssignment"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    data () {
      return {
        numberOfSubjects: 12,
        numberOfAssignment: 4,
      }
    },
  })
</script>

<style scoped>

</style>
