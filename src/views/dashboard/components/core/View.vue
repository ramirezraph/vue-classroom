<template>
  <v-main style="background-color: #eee;">
    <router-view />

    <dashboard-core-footer />
  </v-main>
</template>

<script>
  export default {
    name: 'DashboardCoreView',

    components: {
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      DashboardCoreFooter: () => import('./Footer'),
    },
  }
</script>
