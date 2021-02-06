<template>
  <router-view />
</template>

<script lang="ts">
  import { extend } from 'vee-validate'
  import { size } from 'vee-validate/dist/rules'
  import Vue from 'vue'

  extend('size', {
    ...size,
    message: 'The maximum size is 25 MB.',
  })

  export default Vue.extend({
    name: 'App',
    data () {
      return {}
    },
    created () {
      this.$store.dispatch('classes/fetchClasses', this.$store.getters['user/getCurrentUser'])
    },
  })
</script>
