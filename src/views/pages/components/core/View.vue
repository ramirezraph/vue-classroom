<template>
  <v-main
    id="pages"
  >
    <v-responsive
      min-height="100vh"
      class="d-flex align-center"
    >
      <router-view />
    </v-responsive>
  </v-main>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'PagesCoreView',
    data () {
      return {

      }
    },
  })
</script>
