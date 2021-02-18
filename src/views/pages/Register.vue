<template>
  <v-container
    id="register"
    class="fill-height justify-center"
    tag="section"
  >
    <p>
      Hello, Register
    </p>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'PagesRegister',

    data () {
      return {

      }
    },
  })
</script>

<style lang="sass">
  #register
    .v-list-item__subtitle
      -webkic-line-clamp: initial
      -webkit-box-orient: initial
</style>
