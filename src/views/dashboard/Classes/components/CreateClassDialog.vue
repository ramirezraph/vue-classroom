<template>
  <v-dialog
    v-model="modelData"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    persistent
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
        <v-toolbar-title>{{ dialogTitle }}</v-toolbar-title>
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
                        v-if="dialogTitle === 'Create Class'"
                        min-width="200px"
                        color="info"
                        :disabled="invalid"
                        type="submit"
                      >
                        Create Class
                      </v-btn>
                      <v-btn
                        v-if="dialogTitle === 'Class Settings'"
                        min-width="200px"
                        color="primary"
                        :loading="submitChangesLoading"
                        @click="submitEditClass"
                      >
                        Submit Changes
                      </v-btn>
                      <v-btn
                        text
                        @click="cancel"
                      >
                        {{ dialogTitle === 'Class Settings' ? 'Back to Class' : 'Cancel' }}
                      </v-btn>
                    </div>
                  </v-form>
                </validation-observer>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-if="dialogTitle === 'Class Settings'">
          <v-col
            cols="6"
            class="ma-auto pa-auto"
          >
            <v-card>
              <v-card-title class="text-left grey--text">
                <span class="caption">Additional Class Settings</span>
              </v-card-title>
              <v-card-text class="pa-6 text-none">
                <v-row
                  no-gutters
                  align="center"
                >
                  <v-col
                    cols="6"
                  >
                    <v-subheader v-text="'Set who can post and comment'" />
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-select
                      v-model="selectDiscussionMode"
                      class="text-none"
                      :items="discussionModes"
                      item-text="mode"
                      item-value="mode"
                      label="select mode"
                      return-object
                      single-line
                    />
                  </v-col>
                </v-row>
                <v-row
                  no-gutters
                  align="center"
                >
                  <v-col
                    cols="6"
                  >
                    <v-subheader v-text="'Manage class invites'" />
                  </v-col>
                  <v-col
                    cols="6"
                  >
                    <v-select
                      v-model="selectClassInviteMode"
                      class="text-none"
                      :items="classInviteMode"
                      item-text="mode"
                      item-value="mode"
                      label="select mode"
                      return-object
                      single-line
                    />
                  </v-col>
                </v-row>

                <div class="mt-6">
                  <v-btn
                    min-width="200px"
                    color="error"
                    class="text-none"
                  >
                    Archive
                  </v-btn>
                  <v-btn
                    min-width="200px"
                    color="info"
                    class="text-none"
                  >
                    Pass Class Ownership
                  </v-btn>
                </div>
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
  import Vue, { PropType } from 'vue'
  import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
  import ClassHeader from '@/views/dashboard/Class/components/ClassHeader.vue'
  import { max, required } from 'vee-validate/dist/rules'
  import { classesCollection, storageRef } from '@/fb'
  import { User } from '@/model/User'
  import firebase from 'firebase'
  import { Class } from '@/model/Class'

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
      dialogTitle: {
        type: String,
        required: false,
        default: 'Create Class',
      },
      classEdit: {
        type: Object as PropType<Class>,
        required: false,
        default: function () {
          return new Class(
            '', '', '',
            '', '', '',
            'green', '')
        },
      },
      teacher: {
        type: Object as PropType<User>,
        required: false,
        default: function () {
          return this.$store.getters['user/getCurrentUser']
        },
      },
    },
    data () {
      return {
        title: '',
        description: '',
        code: '',
        imageFile: {} as File,
        imageSource: '',
        color: '',

        dialogConfirmAddClass: false,

        selectDiscussionMode: { mode: 'Students can post and comments' },
        discussionModes: [
          { mode: 'Students can post and comments' },
          { mode: 'Students can only comment' },
          { mode: 'Only teachers can post or comment' },
        ],

        selectClassInviteMode: { mode: 'Turn on' },
        classInviteMode: [
          { mode: 'Turn on' },
          { mode: 'Turn off' },
        ],

        submitChangesLoading: false,
      }
    },
    computed: {
      modelData (): boolean {
        return this.vModel
      },
      teacherName (): string {
        return this.fullName(this.teacher)
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
    mounted () {
      if (this.classEdit.id.length > 0) {
        this.title = this.classEdit.title
        this.description = this.classEdit.description
        this.code = this.classEdit.code
        this.color = this.classEdit.color
        this.imageSource = this.classEdit.imageSource
      }
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
              this.teacher.id,
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
              this.$notify({
                group: 'appWideNotification',
                title: 'Add Class Failed',
                text: error.message,
                type: 'error',
              })
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
      fullName (teacher: User): string {
        return `${teacher.firstName} ${this.middleInitial(teacher)} ${teacher.lastName}`
      },
      middleInitial (teacher: User): string {
        const midName: string[] = teacher.middleName.split(' ')
        let middleInitial = ''
        for (let i = 0; i < midName.length; i++) {
          middleInitial += midName[i].substring(0, 1) + '.'
        }

        return middleInitial
      },
      async submitEditClass () {
        this.submitChangesLoading = true
        await classesCollection.doc(this.classEdit.id).update({
          code: this.code,
          color: this.color,
          description: this.description,
          title: this.title,
        }).then(() => {
          if (this.imageSource && this.imageSource !== this.classEdit.imageSource) {
            storageRef.child('classes').child(this.classEdit.id)
              .child('classImage')
              .delete().then(() => {
                if (this.imageSource) {
                  // upload the class image on storage
                  const classImageRef = storageRef.child('classes').child(this.classEdit.id).child('classImage')
                  classImageRef.put(this.imageFile).then(() => {
                    // and update the imgSource url in firestore db
                    classImageRef.getDownloadURL().then(url => {
                      classesCollection.doc(this.classEdit.id).set({
                        imageSource: url,
                      }, { merge: true })
                    })
                  })
                }
              })
          }
          this.$notify({
            group: 'appWideNotification',
            title: 'Update Success',
            text: 'Class information has been updated successfully.',
            type: 'success',
          })
        }).catch(error => {
          this.$notify({
            group: 'appWideNotification',
            title: 'Update Failed',
            text: error.message,
            type: 'error',
          })
        }).finally(() => {
          this.submitChangesLoading = false
        })
      },
    },
  })
</script>

<style scoped>
  #createDialog {
    background-color: #eeeeee;
  }
</style>
