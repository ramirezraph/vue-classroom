<template>
  <v-container
    id="lock"
    class="fill-height"
    tag="section"
  />
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'PagesLock',

    components: {
      PagesBtn: () => import('./components/Btn.vue'),
    },
  })
</script>
