<template>
  <v-dialog
    v-model="modelData"
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
          icon
          dark
          @click="cancel"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Create Class</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col
            class="ma-auto pa-auto"
            cols="6"
          >
            <class-header
              color="blue"
              title="Software Design"
              description="Lorem ipsum dolor sit amet."
              code="CPE 302"
              teacher="Raphael Ramirez"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="pa-auto ma-auto"
            cols="6"
          >
            <v-card>
              <v-card-title class="text-left">
                Please fill up the form completely.
              </v-card-title>
            <v-card-text class="pa-6">
                <validation-provider
                  ref="observer"
                  v-slot="{ invalid }"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Class Code"
                    rules="required"
                  >
                    <v-text-field
                      width="150"
                      single-line
                      :error-messages="errors"
                      label="Class Code"
                      color="blue"
                      outlined
                      style="width: 600px"
                    />
                  </validation-provider>
                  <v-btn
                    min-width="200px"
                    color="blue"
                    :disabled="invalid"
                    type="submit"
                  >
                    Create Class
                  </v-btn>
                  <v-btn
                    text
                  >
                    Cancel
                  </v-btn>
                </validation-provider>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import ClassHeader from '@/views/dashboard/Class/components/ClassHeader.vue'
  export default Vue.extend({
    name: 'CreateClassDialog',
    components: {
      ValidationProvider,
      ValidationObserver,
      ClassHeader,
    },
    props: {
      vModel: {
        type: Boolean,
        required: true,
      },
    },
    data () {
      return {

      }
    },
    computed: {
      modelData () {
        return this.vModel
      },
    },
    methods: {
      cancel (): void {
        this.$emit('cancel')
      },
    },
  })
</script>

<style scoped>

</style>
