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
        color="primary"
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
                  <v-form @submit.prevent="dialogConfirmAddClass = true">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Class Code"
                      rules="createClass_required|max:10"
                    >
                      <v-text-field
                        v-model="code"
                        :error-messages="errors"
                        label="Class Code"
                        color="info"
                        outlined
                      />
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Class Title"
                      rules="createClass_required|max:88"
                    >
                      <v-text-field
                        v-model="title"
                        :error-messages="errors"
                        label="Class Title"
                        color="info"
                        outlined
                      />
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Class Description"
                      rules="max:186"
                    >
                      <v-text-field
                        v-model="description"
                        :error-messages="errors"
                        label="Class Description"
                        color="info"
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
                        color="info"
                        outlined
                        disabled
                      />
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Class Background Image"
                      rules="size:25000"
                    >
                      <v-file-input
                        v-model="imageFile"
                        :error-messages="errors"
                        accept="image/*"
                        label="Class Background Image"
                        type="file"
                        color="info"
                        hint="Optional"
                        prepend-icon=""
                        prepend-inner-icon="mdi-image"
                        persistent-hint
                        outlined
                        @change="onImageSelect"
                      />
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Class Color"
                      rules="required"
                    >
                      <v-select
                        v-model="color"
                        :error-messages="errors"
                        :items="classColors"
                        label="Class Color"
                        color="info"
                        outlined
                      />
                    </validation-provider>
                    <div class="mt-6">
                      <v-btn
                        min-width="200px"
                        color="info"
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
    <confirm-dialog
      :model="dialogConfirmAddClass"
      :title="`${code} - ${title}`"
      text="Are you sure you want to add this class?"
      @goto-response="submit"
    />
  </v-dialog>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
  import ClassHeader from '@/views/dashboard/Class/components/ClassHeader.vue'
  import { max, required } from 'vee-validate/dist/rules'
  import { classesCollection, storageRef } from '@/fb'
  import { User } from '@/model/User'
  import firebase from 'firebase'

  export enum ClassColor {
    Red = 'red',
    Pink = 'pink',
    Purple = 'purple',
    DeepPurple = 'deep-purple',
    Indigo = 'indigo',
    Blue = 'blue',
    Teal = 'teal',
    Green = 'green',
    Orange = 'orange',
    BlueGrey = 'blue-grey',
    Yellow = 'yellow',
  }

  extend('createClass_required', {
    ...required,
    message: '{_field_} is required.',
  })

  extend('max', {
    ...max,
    message: '{_field_} too long.',
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
        currentUser: this.$store.getters['user/getCurrentUser'],

        title: '',
        description: '',
        code: '',
        imageFile: {} as File,
        imageSource: '',
        color: ClassColor.Green,

        dialogConfirmAddClass: false,
      }
    },
    computed: {
      modelData (): boolean {
        return this.vModel
      },
      teacherName (): string {
        return `${this.currentUser.firstName} ${this.currentUser.middleName.substr(0, 1)}. ${this.currentUser.lastName}`
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
        return this.imageSource || ''
      },
      classColors (): string[] {
        const colors: string[] = []
        for (const key in ClassColor) {
          colors.push(ClassColor[key])
        }
        return colors
      },
    },
    methods: {
      onImageSelect () {
        if (this.imageFile) {
          this.imageSource = URL.createObjectURL(this.imageFile)
        } else {
          this.imageSource = ''
        }
      },
      submit (dialogResponse: boolean): void {
        if (dialogResponse) {
          const currentUser: User = this.$store.getters['user/getCurrentUser']
          let newClassId = ''

          const newClass = {
            code: this.code,
            color: this.color,
            description: this.description,
            imageSource: '',
            teacherName: this.teacherName,
            ownerId: currentUser.id,
            title: this.title,
            userList: [
              this.currentUser.id,
            ],
          }
          classesCollection.add(newClass)
            .then((doc) => {
              newClassId = doc.id
              // update people subcollection
              classesCollection.doc(newClassId).collection('people')
                .doc(currentUser.id)
                .set({
                  type: 'Teacher',
                }).then(() => {
                  // update userList Array
                  classesCollection.doc(doc.id).update({
                    userList: firebase.firestore.FieldValue.arrayUnion(currentUser.id),
                  }).then(() => {
                    if (this.imageSource) {
                      // upload the class image on storage
                      const classImageRef = storageRef.child('classes').child(doc.id).child('classImage')
                      classImageRef.put(this.imageFile).then(() => {
                        // and update the imgSource url in firestore db
                        classImageRef.getDownloadURL().then(url => {
                          classesCollection.doc(doc.id).set({
                            imageSource: url,
                          }, { merge: true })
                        })
                      })
                    }

                    this.$router.push(`/classes/${newClassId}`)
                  })
                })
            })
            .catch(error => {
              console.log('adding class failed', error)
            })
        }
        this.dialogConfirmAddClass = false
      },
      cancel (): void {
        this.title = ''
        this.description = ''
        this.code = ''
        this.imageFile = {} as File
        this.imageSource = ''
        this.color = ClassColor.Green
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
