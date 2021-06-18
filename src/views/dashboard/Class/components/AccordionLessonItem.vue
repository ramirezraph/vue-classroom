<template>
  <v-expansion-panel
    :key="componentKey"
    @click.once="lessonOpened"
  >
    <v-expansion-panel-header color="#686868">
      <v-card
        flat
        tile
        class="ma-0 white--text"
        color="transparent"
      >
        <p class="text-h4 ma-0">
          <v-icon
            v-if="hasEditAccess"
            :color="liveDraftColor"
          >
            mdi-circle-medium
          </v-icon>
          Lesson {{ lessonItem.lessonNumber }}: {{ lessonItem.title }}
        </p>
      </v-card>
      <template #actions>
        <v-icon color="white">
          $expand
        </v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-card
        flat
        min-width="100%"
        class="mt-3"
      >
        <div
          v-if="hasContent"
          class="lesson-content"
        >
          <div
            v-if="lessonItem.shortDescription"
            id="description"
            class="body-1"
          >
            <v-textarea
              v-model="lessonItem.shortDescription"
              rows="1"
              auto-grow
              flat
              style="white-space: pre"
              readonly
              solo
              dense
              class="ma-0 mb-n6"
            />
          </div>
          <div class="mt-6">
            <transition-group
              name="list"
              tag="p"
            >
              <file
                v-for="file in files"
                :key="file.id"
                :has-edit-access="hasEditAccess"
                :file-id="file.id"
                :name="file.name"
                :type="file.type"
                :link="file.link"
                class="mt-2 px-2"
                @on-remove="onRemoveFile"
              >
                <template
                  #title
                >
                  <span @click="fileClicked(file)">
                    {{ file.name }}
                  </span>
                </template>
              </file>
            </transition-group>
          </div>
        </div>
        <div v-else>
          <p class="caption grey--text mt-6">
            No content.
          </p>
        </div>
        <v-row
          v-if="hasEditAccess"
          no-gutters
          class="mt-12"
        >
          <div
            class="d-flex lesson-controls"
          >
            <v-tooltip top>
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  outlined
                  depressed
                  tile
                  class="mr-2"
                  color="black"
                  v-bind="attrs"
                  :disabled="toggleUploadFile"
                  v-on="on"
                  @click="toggleUploadFileCard('Image','image/*')"
                >
                  <v-icon>
                    mdi-file-image
                  </v-icon>
                </v-btn>
              </template>
              <span>
                Image
              </span>
            </v-tooltip>
            <v-tooltip top>
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  outlined
                  depressed
                  tile
                  class="mr-2"
                  color="black"
                  v-bind="attrs"
                  :disabled="toggleUploadFile"
                  v-on="on"
                  @click="toggleUploadFileCard('Video','video/*')"
                >
                  <v-icon>
                    mdi-file-video
                  </v-icon>
                </v-btn>
              </template>
              <span>
                Video
              </span>
            </v-tooltip>
            <v-tooltip top>
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  outlined
                  depressed
                  tile
                  class="mr-2"
                  color="black"
                  v-bind="attrs"
                  :disabled="toggleUploadFile"
                  v-on="on"
                  @click="toggleUploadFileCard('Other','.pdf,.doc,.docx,.ptx,.pptx,.xlsx')"
                >
                  <v-icon>
                    mdi-link
                  </v-icon>
                </v-btn>
              </template>
              <span>
                Other File
              </span>
            </v-tooltip>
          </div>
          <v-spacer />
          <div>
            <v-btn
              depressed
              small
              :color="liveDraftColor"
              rounded
              width="120"
            >
              <v-switch
                v-model="lessonItem.isLive"
                dense
                inset
                color="white"
                class="liveDraft"
                @change="toggleLiveDraft"
              >
                <template #label>
                  <span class="input__label ml-n4 white--text">{{ liveDraftLabel }}</span>
                </template>
              </v-switch>
            </v-btn>
            <v-tooltip top>
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  @click="toggleEditLesson"
                >
                  <v-icon size="25">
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </template>
              <span>
                Edit Lesson
              </span>
            </v-tooltip>
            <v-tooltip top>
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  color="error"
                  v-bind="attrs"
                  v-on="on"
                  @click="removeLesson"
                >
                  <v-icon size="25">
                    mdi-delete
                  </v-icon>
                </v-btn>
              </template>
              <span>
                Remove Lesson
              </span>
            </v-tooltip>
          </div>
        </v-row>
        <v-expand-transition>
          <v-card
            v-if="toggleUploadFile"
            class="py-3 px-1"
            min-width="100%"
            elevation="6"
          >
            <v-card-title class="subtitle-2">
              Upload a file
            </v-card-title>
            <v-card-text>
              <validation-observer
                ref="observer"
                v-slot="{ invalid }"
              >
                <v-form @submit.prevent="submitUploadFile">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Title"
                    rules="required"
                  >
                    <v-text-field
                      v-model="uploadFileTitle"
                      prepend-icon="mdi-format-text"
                      label="Title"
                      :error-messages="errors"
                    />
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="File"
                    rules="required|size:25000"
                  >
                    <v-file-input
                      id="fileInput"
                      ref="fileInput"
                      v-model="uploadFileFile"
                      label="File Input"
                      show-size
                      :accept="activeAcceptFileType"
                      :error-messages="errors"
                      :hint="activeAcceptFileType"
                      persistent-hint
                    >
                      <template #selection="{ text }">
                        <v-chip
                          small
                          label
                          color="blue"
                          class="white--text"
                        >
                          {{ text }}
                        </v-chip>
                      </template>
                    </v-file-input>
                  </validation-provider>
                  <div class="mt-3 ml-8">
                    <v-btn
                      type="submit"
                      min-width="150"
                      class="green mr-2"
                      depressed
                      :disabled="invalid"
                      :loading="uploadingInProgress"
                    >
                      Submit
                    </v-btn>
                    <v-btn
                      min-width="100"
                      depressed
                      text
                      outlined
                      :disabled="uploadingInProgress"
                      @click="cancelUploadFile"
                    >
                      Cancel
                    </v-btn>
                  </div>
                </v-form>
              </validation-observer>
            </v-card-text>
          </v-card>
        </v-expand-transition>
        <v-expand-transition>
          <v-card
            v-if="showHideEditLesson"
            elevation="6"
            class="pa-2 mt-6"
            outlined
          >
            <v-card-title class="text-h4">
              Edit Lesson
            </v-card-title>
            <v-card-text>
              <validation-observer
                ref="observer"
                v-slot="{ invalid }"
              >
                <v-form
                  class="mt-4"
                  @submit.prevent="submitEditLesson"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Lesson Number"
                    :rules="`required|min_value:0|${lessonNumberAlreadyExistsRuleEdit}`"
                  >
                    <v-text-field
                      v-model="edit_lessonNumber"
                      label="Lesson Number"
                      color="info"
                      outlined
                      rounded
                      type="number"
                      :error-messages="errors"
                      dense
                      prepend-inner-icon="mdi-pencil-outline"
                    />
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Lesson Title"
                    rules="required"
                  >
                    <v-text-field
                      v-model="edit_lessonTitle"
                      label="Lesson Title"
                      color="info"
                      outlined
                      rounded
                      :error-messages="errors"
                      dense
                      prepend-inner-icon="mdi-pencil-outline"
                    />
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Short Description"
                  >
                    <v-textarea
                      v-model="edit_lessonDescription"
                      label="Short Description"
                      color="info"
                      outlined
                      rounded
                      auto-grow
                      optional
                      style="white-space: pre"
                      :error-messages="errors"
                      hint="Optional"
                      rows="3"
                      prepend-inner-icon="mdi-card-text-outline"
                    />
                  </validation-provider>
                  <v-btn
                    type="submit"
                    :disabled="invalid"
                    class="info mr-2"
                    :loading="editLessonLoading"
                  >
                    Save Changes
                  </v-btn>
                  <v-btn
                    text
                    outlined
                    @click="toggleEditLesson"
                  >
                    Cancel
                  </v-btn>
                </v-form>
              </validation-observer>
            </v-card-text>
          </v-card>
        </v-expand-transition>
      </v-card>
    </v-expansion-panel-content>

    <delete-confirm-dialog
      :model="dialogConfirmDeleteLesson"
      :title="`Lesson ${lessonItem.lessonNumber}: ${lessonItem.title}`"
      @goto-response="confirmRemoveUnit"
    />
    <confirm-dialog
      :model="dialogConfirmDeleteFile"
      :title="`File: ${remove_fileName}`"
      text="Are you sure you want to remove this file?"
      @goto-response="confirmRemoveFile"
    />
  </v-expansion-panel>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { ClassFile, Lesson } from '@/model/Lesson'
  import firebase from 'firebase'
  import { resourcesCollection, storageRef } from '@/fb'
  import File from '@/views/dashboard/components/component/File.vue'
  // eslint-disable-next-line no-undef
  import DocumentReference = firebase.firestore.DocumentReference

  export default Vue.extend({
    components: {
      File,
    },
    props: {
      hasEditAccess: {
        type: Boolean,
        required: true,
      },
      lesson: {
        type: Object as PropType<Lesson>,
        required: true,
      },
      lessons: {
        type: Array as PropType<Lesson[]>,
        required: true,
      },
      unitDbRef: {
        type: Object as PropType<DocumentReference>,
        required: true,
      },
    },
    data () {
      return {
        componentKey: 0,

        files: [] as ClassFile[],

        dialogConfirmDeleteLesson: false,

        toggleUploadFile: false,
        uploadFileTitle: '',
        uploadFileFile: {} as File,
        activeFileType: '',
        activeAcceptFileType: '',
        uploadingInProgress: false,

        remove_fileId: '',
        remove_fileName: '',
        dialogConfirmDeleteFile: false,

        showHideEditLesson: false,
        edit_lessonNumber: -1,
        edit_lessonTitle: '',
        edit_lessonDescription: '',
        edit_lessonNumberTemp: -1,
        editLessonLoading: false,

      }
    },
    computed: {
      lessonItem (): Lesson {
        return this.lesson
      },
      liveDraftLabel (): string {
        return this.lesson.isLive ? 'Live' : 'Draft'
      },
      liveDraftColor (): string {
        return this.lesson.isLive ? 'green' : 'orange'
      },
      lessonDbRef (): DocumentReference {
        return this.unitDbRef.collection('lessons').doc(this.lesson.id)
      },
      lessonNumberAlreadyExistsRuleEdit (): string {
        let lessonNumbers = ''
        this.lessons.forEach(lesson => {
          if (this.edit_lessonNumberTemp !== lesson.lessonNumber) {
            lessonNumbers += lesson.lessonNumber + ','
          }
        })
        lessonNumbers = lessonNumbers.substring(0, lessonNumbers.length - 1)
        return `excluded:${lessonNumbers}`
      },
      hasContent (): boolean {
        if (this.lessonItem.shortDescription) {
          return true
        }

        if (this.files.length > 0) {
          return true
        }

        return false
      },
    },
    watch: {
      '$route' () {
        // force rerender the component to reset the @click.once event.
        // everytime the router change.
        this.componentKey += 1
      },
    },
    methods: {
      toggleLiveDraft (): void {
        const updatedLesson = {
          isLive: this.lesson.isLive,
        }
        this.lessonDbRef.update(updatedLesson)
          .then(() => {
            console.log('toggle success')
          })
          .catch(error => {
            this.$notify({
              group: 'appWideNotification',
              title: 'Toggle Failed',
              text: error.message,
              type: 'error',
            })
          })
        this.lessonOpened()
      },
      removeLesson (): void {
        this.dialogConfirmDeleteLesson = true
      },
      confirmRemoveUnit (response: boolean): void {
        if (response) {
          this.lessonDbRef.delete()
            .then(() => {
              this.$notify({
                group: 'appWideNotification',
                title: 'Success',
                text: 'Lesson deleted successfully.',
                type: 'success',
              })
            })
            .catch(error => {
              this.$notify({
                group: 'appWideNotification',
                title: 'Lesson delete failed',
                text: error.message,
                type: 'error',
              })
            })
        }
        this.dialogConfirmDeleteLesson = false
      },
      toggleUploadFileCard (fileType?: string, accept?: string): void {
        if (accept && fileType) {
          this.activeAcceptFileType = accept
          this.activeFileType = fileType
        }
        this.toggleUploadFile = !this.toggleUploadFile
      },
      cancelUploadFile (): void {
        this.uploadFileTitle = ''
        this.uploadFileFile = {} as File
        this.activeFileType = ''

        this.toggleUploadFileCard()
      },
      submitUploadFile (): void {
        let fileExtension = ''
        switch (this.uploadFileFile.type) {
          case 'image/png':
            fileExtension = '.png'
            break
          case 'image/jpeg':
            fileExtension = '.jpg'
            break
          case 'video/mp4':
            fileExtension = '.mp4'
            break
          case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            fileExtension = '.docx'
            break
          case 'application/msword':
            fileExtension = '.doc'
            break
          case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            fileExtension = '.pptx'
            break
          case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            fileExtension = '.xlsx'
            break
          case 'application/pdf':
            fileExtension = '.pdf'
            break
        }
        this.uploadingInProgress = true
        const path = this.lessonDbRef.path.split('/')
        const classId = path[1]
        const resourceRef = storageRef.child('classes')
          .child(classId)
          .child('lesson-files')
          .child(this.lessonItem.id)
          .child(`${this.uploadFileTitle}${fileExtension}`)
        // upload the file to storage
        resourceRef.put(this.uploadFileFile)
          .then(() => {
            resourceRef.getDownloadURL().then(url => {
              // save file location to firestore
              resourcesCollection.doc(this.lessonItem.id).collection('files')
                .add({
                  link: url,
                  name: `${this.uploadFileTitle}${fileExtension}`,
                  type: this.activeFileType,
                }).then(() => {
                  this.uploadFileTitle = ''
                  this.uploadFileFile = {} as File
                  this.activeFileType = ''
                  this.uploadingInProgress = false
                })
            })
            this.toggleUploadFileCard()
          })
      },
      lessonOpened (): void {
        resourcesCollection.doc(this.lessonItem.id).collection('files')
          .onSnapshot(snapshot => {
            const fetchFiles: ClassFile[] = []
            snapshot.forEach(doc => {
              const newFile = new ClassFile(
                doc.id,
                doc.data().type,
                doc.data().name,
                doc.data().link,
              )
              fetchFiles.push(newFile)
            })
            this.files = fetchFiles
            const path = this.lessonDbRef.path.split('/')
            const classId = path[1]
            const unitId = path[3]
            const lessonId = path[5]
            this.$store.dispatch('classes/fetchFiles', { classId: classId, unitId: unitId, lessonId: lessonId, files: this.files })
          })
      },
      onRemoveFile (fileId: string, fileName: string): void {
        this.remove_fileId = fileId
        this.remove_fileName = fileName
        this.dialogConfirmDeleteFile = true
      },
      confirmRemoveFile (response: boolean): void {
        if (response) {
          // delete on storage
          const classId = this.unitDbRef.parent.parent?.id
          const ref = `classes/${classId}/lesson-files/${this.lessonItem.id}/${this.remove_fileName}`
          storageRef.child(ref).delete()
            .then(() => {
              // delete on firestore db
              resourcesCollection.doc(this.lessonItem.id).collection('files')
                .doc(this.remove_fileId).delete()
                .then(() => {
                  // delete complete
                  console.log('File deleted completely.')
                }).catch((error) => {
                  this.$notify({
                    group: 'appWideNotification',
                    title: 'File Delete Failed',
                    text: error.message,
                    type: 'error',
                  })
                })
            }).catch((error) => {
              this.$notify({
                group: 'appWideNotification',
                title: 'File Delete Failed',
                text: error.message,
                type: 'error',
              })
            })
        }
        this.dialogConfirmDeleteFile = false
      },
      fileClicked (file: ClassFile): void {
        this.$emit('file-clicked', file)
      },
      toggleEditLesson (): void {
        this.edit_lessonNumber = this.lessonItem.lessonNumber
        this.edit_lessonTitle = this.lessonItem.title
        this.edit_lessonDescription = this.lessonItem.shortDescription

        this.edit_lessonNumberTemp = this.lessonItem.lessonNumber

        this.showHideEditLesson = !this.showHideEditLesson
      },
      async submitEditLesson () {
        this.editLessonLoading = true
        await this.lessonDbRef.update({
          lessonNumber: this.edit_lessonNumber,
          title: this.edit_lessonTitle,
          shortDescription: this.edit_lessonDescription,
        }).then(() => {
          this.$notify({
            group: 'appWideNotification',
            title: 'Success',
            text: 'Lesson has been updated successfully.',
            type: 'success',
          })
          this.toggleEditLesson()
        }).catch(error => {
          this.$notify({
            group: 'appWideNotification',
            title: 'Update Failed',
            text: error.message,
            type: 'error',
          })
        }).finally(() => {
          this.editLessonLoading = false
        })
      },
    },
  })
</script>

<style scoped>
  .lesson-controls {
    height: 60px;
  }
  .list-item {
  display: inline-block;
  margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
