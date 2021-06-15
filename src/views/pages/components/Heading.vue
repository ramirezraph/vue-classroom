<template>
  <h1 class="display-4 font-weight-light">
    <slot />
  </h1>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'PagesHeading',
  })
</script>
