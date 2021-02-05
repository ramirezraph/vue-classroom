<template>
  <v-expansion-panel>
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
          id="description"
          class="body-1"
        >
          <p>{{ lessonItem.shortDescription }}</p>
        </div>
        <div class="d-flex px-6 mt-6 mb-4">
          <span
            class="blue--text body-1"
            style="cursor: pointer;"
          >
            <v-icon
              left
              color="blue"
            >
              mdi-video
            </v-icon>
            Introduction.mp4
          </span>
          <v-spacer />
          <v-btn
            icon
            small
          >
            <v-icon class="blue--text">
              mdi-download
            </v-icon>
          </v-btn>
          <v-btn
            v-if="hasEditAccess"
            icon
            small
          >
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
          <v-btn
            v-if="hasEditAccess"
            icon
            small
          >
            <v-icon>
              mdi-arrow-up-down
            </v-icon>
          </v-btn>
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
                  @click="toggleUploadFileCard('image/*')"
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
                  @click="toggleUploadFileCard('video/*')"
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
                  @click="toggleUploadFileCard('.pdf,.doc,.docx,.ptx,.pptx')"
                >
                  <v-icon>
                    mdi-link
                  </v-icon>
                </v-btn>
              </template>
              <span>
                File
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
                    rules="required"
                  >
                    <v-file-input
                      id="fileInput"
                      ref="fileInput"
                      v-model="uploadFileFile"
                      label="File Input"
                      show-size
                      :accept="activeAcceptFileType"
                      :rules="fileRules"
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
                    >
                      Submit
                    </v-btn>
                    <v-btn
                      min-width="100"
                      depressed
                      text
                      outlined
                      @click="toggleUploadFileCard"
                    >
                      Cancel
                    </v-btn>
                  </div>
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
  </v-expansion-panel>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { Lesson } from '@/model/Lesson'
  import firebase from 'firebase'
  // eslint-disable-next-line no-undef
  import DocumentReference = firebase.firestore.DocumentReference
  export default Vue.extend({
    props: {
      hasEditAccess: {
        type: Boolean,
        required: true,
      },
      lesson: {
        type: Object as PropType<Lesson>,
        required: true,
      },
      unitDbRef: {
        type: Object as PropType<DocumentReference>,
        required: true,
      },
    },
    data () {
      return {
        dialogConfirmDeleteLesson: false,

        toggleUploadFile: false,
        uploadFileTitle: '',
        uploadFileFile: [],
        activeAcceptFileType: '',
        fileRules: [
          value => !value || value.size < 25000000 || 'size should be less than 25 MB.',
        ],
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
            console.log('toggle failed', error)
          })
      },
      removeLesson (): void {
        this.dialogConfirmDeleteLesson = true
      },
      confirmRemoveUnit (response: boolean): void {
        if (response) {
          this.lessonDbRef.delete()
            .then(() => {
              console.log('Lesson deleted successfully.')
            })
            .catch(error => {
              console.log('Lesson delete failed.', error)
            })
        }
        this.dialogConfirmDeleteLesson = false
      },
      toggleUploadFileCard (accept?: string): void {
        this.uploadFileTitle = ''
        this.uploadFileFile = []
        if (accept) {
          this.activeAcceptFileType = accept
        }
        this.toggleUploadFile = !this.toggleUploadFile
      },
      submitUploadFile (): void {
        console.log(this.uploadFileFile)
      },
    },
  })
</script>

<style scoped>
  .lesson-controls {
    height: 60px;
  }
</style>
