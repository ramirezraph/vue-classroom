<template>
  <v-dialog
    v-model="modelValue"
    max-width="450"
    persistent
  >
    <v-card>
      <v-card-title>
        <p><strong>{{ title }}</strong></p>
        {{ text }}

        <v-spacer />

        <v-icon
          aria-label="Close"
          @click="nevermindClicked"
        >
          mdi-close
        </v-icon>
      </v-card-title>

      <v-card-text class="pb-6 pt-12 text-center">
        <v-btn
          color="primary"
          min-width="200"
          @click="yesClicked"
        >
          Yes
        </v-btn>
        <v-btn
          class="mr-3"
          text
          depressed
          @click="nevermindClicked"
        >
          Nevermind
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'ConfirmDialog',
    props: {
      model: {
        type: Boolean,
        required: true,
      },
      title: {
        type: String,
        required: false,
        default: '',
      },
      text: {
        type: String,
        required: true,
      },
    },
    data () {
      return {
        dialog: false,
      }
    },
    computed: {
      modelValue () {
        return this.model
      },
    },
    methods: {
      yesClicked (): void {
        this.$emit('goto-response', true)
      },
      nevermindClicked (): void {
        this.$emit('goto-response', false)
      },
    },
  })
</script>

<style scoped>

</style>
