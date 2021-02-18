<template>
  <v-app>
    <pages-core-view />
    <pages-core-footer />
  </v-app>
</template>

<script lang='ts'>
  import Vue from 'vue'
  export default Vue.extend({
    name: 'PagesIndex',

    components: {
      // PagesCoreAppBar: () => import('./components/core/AppBar.vue'),
      PagesCoreFooter: () => import('./components/core/Footer.vue'),
      PagesCoreView: () => import('./components/core/View.vue'),
    },
  })
</script>
