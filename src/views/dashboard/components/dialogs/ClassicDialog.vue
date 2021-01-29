<template>
  <v-dialog
    v-model="modelValue"
    max-width="500"
  >
    <v-card class="text-center">
      <v-card-title>
        {{ title }}

        <v-spacer />

        <v-icon
          aria-label="Close"
          @click="close"
        >
          mdi-close
        </v-icon>
      </v-card-title>

      <v-card-text>
        {{ text }}
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          color="blue"
          text
          @click="close"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'ClassicDialog',
    props: {
      vModel: {
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

      }
    },
    computed: {
      modelValue () {
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

<style scoped>

</style>
