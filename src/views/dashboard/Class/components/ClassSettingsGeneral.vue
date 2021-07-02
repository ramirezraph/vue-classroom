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
                <span>-------------------</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="6"
            class="ma-auto pa-auto d-flex"
          >
            <v-btn
              min-width="200"
              class="mr-3 error darken-1 text-none"
              @click="dialogConfirm = true"
            >
              <v-icon left>
                mdi-location-exit
              </v-icon>
              Leave Class
            </v-btn>
            <v-btn
              class="mr-3 grey darken-1 text-none"
            >
              <v-icon left>
                mdi-chat-processing-outline
              </v-icon>
              Give Feedback
            </v-btn>

            <v-btn
              text
              min-width="200"
              class="ml-auto"
              @click="cancel"
            >
              Back to Class
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <confirm-dialog
      :model="dialogConfirm"
      title="Confirm"
      text="Are you sure you want to leave the class?"
      @goto-response="leaveClass"
    />
  </v-dialog>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import ClassHeader from '@/views/dashboard/Class/components/ClassHeader.vue'
  import { Class } from '@/model/Class'
  import { classesCollection } from '@/fb'
  import firebase from 'firebase'
  import { User } from '@/model/User'

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
      return {
        dialogConfirm: false,
      }
    },
    computed: {
      modelData (): boolean {
        return this.vModel
      },
      currentUser (): User {
        return this.$store.getters['user/getCurrentUser']
      },
    },
    methods: {
      cancel (): void {
        this.$emit('cancel')
      },
      leaveClass (response: boolean): void {
        if (response) {
          const activeClass: Class = this.$store.getters['class/getActiveClass']
          classesCollection.doc(activeClass.id).collection('people')
            .doc(this.currentUser.id)
            .delete()
            .then(() => {
              classesCollection.doc(activeClass.id).update({
                userList: firebase.firestore.FieldValue.arrayRemove(this.currentUser.id),
              }).then(() => {
                this.$router.replace('/classes').then(() => {
                  this.$store.dispatch('classes/fetchAllMeetings', this.currentUser)
                  this.$notify({
                    group: 'appWideNotification',
                    title: 'Leave Success',
                    text: 'Leave the class successfully.',
                    type: 'success',
                  })
                })
              }).catch(errorOnArray => {
                this.$notify({
                  group: 'appWideNotification',
                  title: 'Leave Failed',
                  text: errorOnArray.message,
                  type: 'error',
                })
              })
            }).catch(error => {
              this.$notify({
                group: 'appWideNotification',
                title: 'Leave Failed',
                text: error.message,
                type: 'error',
              })
            }).finally(() => {
              this.dialogConfirm = false
            })
        }

        this.dialogConfirm = false
      },
    },
  })
</script>

<style scoped>
  #dialog {
    background-color: #eeeeee;
  }
</style>
