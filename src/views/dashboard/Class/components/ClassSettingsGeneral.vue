<template>
  <v-dialog
    v-model="modelData"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    persistent
  >
    <v-card id="dialog">
      <v-toolbar
        dark
        color="primary"
      >
        <v-btn
          icon
          dark
          @click="cancel"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Class Settings</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col
            class="ma-auto pa-auto"
            cols="6"
          >
            <class-header
              :color="classOnActive.color"
              :title="classOnActive.title"
              :description="classOnActive.description"
              :code="classOnActive.code"
              :owner-id="classOnActive.ownerId"
              :image="classOnActive.imageSource"
              :teacher-name="classOnActive.teacherName"
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
                <span class="caption">Class Information</span>
              </v-card-title>
              <v-card-text class="pa-6">
                <v-text-field
                  label="Class Code"
                  :value="classOnActive.code"
                  color="info"
                  outlined
                />
                <v-text-field
                  label="Class Title"
                  :value="classOnActive.title"
                  color="info"
                  outlined
                />
                <v-text-field
                  label="Class Description"
                  :value="classOnActive.description"
                  color="info"
                  outlined
                />
                <v-text-field
                  label="Class Owner"
                  :value="classOnActive.teacherName"
                  color="info"
                  outlined
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="6"
            class="ma-auto pa-auto"
          >
            <v-card>
              <v-card-title class="text-left grey--text">
                <span class="caption">General</span>
              </v-card-title>
              <v-card-text class="pa-6 text-none">
                <span>General Settings</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="6"
            class="ma-auto pa-auto"
          >
            <span>Hello, World!</span>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import ClassHeader from '@/views/dashboard/Class/components/ClassHeader.vue'
  import { Class } from '@/model/Class'

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
      classOnActive: {
        type: Object as PropType<Class>,
        required: true,
      },
    },
    data () {
      return {}
    },
    computed: {
      modelData (): boolean {
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
  #dialog {
    background-color: #eeeeee;
  }
</style>
