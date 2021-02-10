<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar
        dark
        color="blue"
      >
        <v-btn
          text
          color="white"
          @click="close()"
        >
          <v-icon>mdi-arrow-left</v-icon>
          Back to Class
        </v-btn>
        <v-spacer />
      </v-toolbar>
      <v-card>
        <v-card-title>
          Hello, World!
        </v-card-title>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    props: {
      vModel: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data () {
      return {

      }
    },
    computed: {
      dialog (): boolean {
        return this.vModel
      },
    },
    methods: {
      close (): void {
        this.$emit('close')
      },
    },
  })
</script>

<style lang="scss" scoped>

</style>
