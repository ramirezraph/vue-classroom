<template>
  <v-dialog
    v-model="modelData"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card id="createDialog">
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
              :color="displayColor"
              :title="displayTitle"
              :description="displayDescription"
              :code="displayCode"
              :teacher="teacherName"
              :image="displayImage"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="pa-auto ma-auto"
            cols="6"
          >
            <v-card>
              <v-card-title class="text-left grey--text">
                <span class="caption">Please fill out the required fields.</span>
              </v-card-title>
              <v-card-text class="pa-6">
                <validation-observer
                  ref="observer"
                  v-slot="{ invalid }"
                >
                  <v-form @submit.prevent="">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Class Code"
                      rules="createClass_required"
                    >
                      <v-text-field
                        v-model="code"
                        :error-messages="errors"
                        label="Class Code"
                        color="blue"
                        outlined
                      />
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Class Title"
                      rules="createClass_required"
                    >
                      <v-text-field
                        v-model="title"
                        :error-messages="errors"
                        label="Class Title"
                        color="blue"
                        outlined
                      />
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Class Description"
                    >
                      <v-text-field
                        v-model="description"
                        :error-messages="errors"
                        label="Class Description"
                        color="blue"
                        outlined
                        hint="Optional"
                      />
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Class Teacher"
                      rules="createClass_required"
                    >
                      <v-text-field
                        v-model="teacherName"
                        :error-messages="errors"
                        label="Class Teacher"
                        color="blue"
                        outlined
                        disabled
                      />
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Class Background Image"
                    >
                      <v-file-input
                        v-model="imageSource"
                        :error-messages="errors"
                        accept="image/*"
                        label="Class Background Image"
                        type="file"
                        color="blue"
                        hint="Optional"
                        prepend-icon=""
                        prepend-inner-icon="mdi-image"
                        persistent-hint
                        outlined
                      />
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Class Color"
                      rules="required"
                    >
                      <v-text-field
                        v-model="color"
                        :error-messages="errors"
                        label="Class Color"
                        color="blue"
                        outlined
                      />
                    </validation-provider>
                    <div class="mt-6">
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
                        @click="cancel"
                      >
                        Cancel
                      </v-btn>
                    </div>
                  </v-form>
                </validation-observer>
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
  import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
  import ClassHeader from '@/views/dashboard/Class/components/ClassHeader.vue'
  import { required } from 'vee-validate/dist/rules'

  extend('createClass_required', {
    ...required,
    message: '{_field_} is required.',
  })

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
        title: '',
        description: '',
        code: '',
        teacherName: 'Raphael Ramirez',
        imageSource: null,
        color: '',
      }
    },
    computed: {
      modelData (): boolean {
        return this.vModel
      },
      displayTitle (): string {
        return this.title || 'Class Title'
      },
      displayDescription (): string {
        return this.description || 'Class Description'
      },
      displayCode (): string {
        return this.code || 'Class Code'
      },
      displayColor (): string {
        return this.color || 'blue'
      },
      displayImage (): string {
        return ''
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
  #createDialog {
    background-color: #eeeeee;
  }
</style>
