<template>
  <router-view />
</template>

<script lang="ts">
  import Vue from 'vue'
  import { User } from '@/model/User'
  export default Vue.extend({
    name: 'App',
    data () {
      return {
        currentUser: new User(
          'u65UaYYgNGccqlsFUVGC',
          'Raphael',
          'Legaspi',
          'Ramirez',
          'ramirez.raph@yahoo.com',
        ),
      }
    },
    created () {
      this.$store.dispatch('classes/fetchClasses', this.currentUser)
    },
  })
</script>
