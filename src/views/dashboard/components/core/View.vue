<template>
  <v-main style="background-color: #eee;">
    <router-view />

    <dashboard-core-footer />
  </v-main>
</template>

<script>
  import Vue from 'vue'
  export default Vue.extend({
    name: 'DashboardCoreView',

    components: {
      DashboardCoreFooter: () => import('./Footer'),
    },
  })
</script>
