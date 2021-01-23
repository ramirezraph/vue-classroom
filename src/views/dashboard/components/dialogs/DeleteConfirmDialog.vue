<template>
  <v-dialog
    v-model="modelValue"
    max-width="600"
    persistent
    class="text-left"
  >
    <v-card>
      <v-card-title class="text-left">
        <p><strong>Are you absolutely sure?</strong></p>
        <v-icon
          aria-label="Close"
          @click="cancelClicked"
        >
          mdi-close
        </v-icon>
      </v-card-title>
      <v-divider />
      <v-card-text class="text-left">
        <p>
          This action <strong>cannot</strong> be undone.
          This will permanently delete the <br> <strong>{{ title }}</strong>,
          along with other data associated with this.
        </p>
        <p>Please type <strong>{{ title }}</strong> to confirm.</p>
        <v-text-field
          v-model="txtConfirm"
          class="pa-0 ma-0"
          outlined
        />
        <v-spacer />
        <v-btn
          class="mr-3 text-none"
          @click="cancelClicked"
        >
          Cancel
        </v-btn>

        <v-btn
          color="error"
          :disabled="!isMatched"
          class="text-none"
          @click="confirmClicked"
        >
          I understand the consequences, delete this data
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'DeleteUnitConfirmDialog',
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
    },
    data () {
      return {
        dialog: false,
        txtConfirm: '',
      }
    },
    computed: {
      modelValue (): boolean {
        return this.model
      },
      isMatched (): boolean {
        return this.txtConfirm.toLowerCase() === this.title.toLowerCase()
      },
    },
    methods: {
      confirmClicked: function (): void {
        this.txtConfirm = ''
        this.$emit('goto-response', true)
      },
      cancelClicked (): void {
        this.txtConfirm = ''
        this.$emit('goto-response', false)
      },
    },
  })
</script>

<style scoped>

</style>
