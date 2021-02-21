<template>
  <v-app>
    <dashboard-core-app-bar v-model="expandOnHover" />

    <dashboard-core-drawer :expand-on-hover.sync="expandOnHover" />

    <dashboard-core-view />
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'DashboardIndex',
    components: {
      DashboardCoreAppBar: () => import('./components/core/AppBar.vue'),
      DashboardCoreDrawer: () => import('./components/core/Drawer.vue'),
      DashboardCoreView: () => import('./components/core/View.vue'),
    },
    data: () => ({
      expandOnHover: false,
    }),
    mounted () {
      this.$store.dispatch('classes/fetchClasses', this.$store.getters['user/getCurrentUser'])
    },
  })
</script>
