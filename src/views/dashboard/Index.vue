<template>
  <v-app>
    <dashboard-core-app-bar v-model="expandOnHover" />

    <dashboard-core-drawer :expand-on-hover.sync="expandOnHover" />

    <dashboard-core-view />

    <dashboard-core-settings v-model="expandOnHover" />
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'DashboardIndex',
    components: {
      DashboardCoreAppBar: () => import('./components/core/AppBar.vue'),
      DashboardCoreDrawer: () => import('./components/core/Drawer.vue'),
      DashboardCoreSettings: () => import('./components/core/Settings.vue'),
      DashboardCoreView: () => import('./components/core/View.vue'),
    },
    data: () => ({
      expandOnHover: false,
    }),
  })
</script>
