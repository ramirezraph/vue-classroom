<template>
  <v-main
    id="pages"
    class="ma-0 pa-0"
  >
    <v-responsive>
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
