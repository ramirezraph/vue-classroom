<template>
  <router-view />
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'App',
    data () {
      return {}
    },
    created () {
      this.$store.dispatch('classes/fetchClasses')
    },
  })
</script>
