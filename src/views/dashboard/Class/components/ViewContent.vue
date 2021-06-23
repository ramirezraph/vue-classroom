<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    transition="dialog-bottom-transition"
    scrollable
    persistent
    hide-overlay
    height="100vh"
  >
    <v-card
      flat
    >
      <v-toolbar
        dark
        color="primary"
        max-height="60"
      >
        <v-btn
          text
          color="white"
          @click="close()"
        >
          <v-icon>mdi-arrow-left</v-icon>
          Back to Class
        </v-btn>
        <v-spacer />
      </v-toolbar>
      <v-card
        flat
        class="px-3"
      >
        <v-row>
          <v-col
            cols="4"
          >
            <v-card
              min-width="100%"
              color="white"
              class="pb-6"
            >
              <v-card-title class="d-flex">
                <div>
                  <span class="subtitle-2">Class Material/s</span>
                </div>
              </v-card-title>
              <v-skeleton-loader
                :loading="unitDataLoading"
                transition="fade-transition"
                class="mx-auto"
                max-width="92%"
                type="card"
              >
                <div>
                  <div
                    v-if="units.length > 0"
                    class="mt-2"
                  >
                    <v-expansion-panels
                      :key="$route.fullPath"
                      accordion
                      popout
                      focusable
                      multiple
                    >
                      <accordion-unit-item
                        v-for="unitItem in unitsList"
                        :key="unitItem.id"
                        :has-edit-access="hasEditAccess"
                        :class-db-ref="computed_dbRef"
                        :unit="unitItem"
                        :units="unitsList"
                        :read-only="true"
                        @file-clicked="fileClicked"
                      />
                    </v-expansion-panels>
                  </div>
                  <div
                    v-else
                    class="ma-6"
                  >
                    <p class="grey--text">
                      No unit found.
                    </p>
                  </div>
                </div>
              </v-skeleton-loader>
            </v-card>
          </v-col>
          <v-col
            cols="8"
          >
            <v-card
              min-width="100%"
              color="white"
              class="pb-6 pa-6"
              min-height="600"
            >
              <div class="d-flex text-left pa-0 ma-0 align-center">
                <h3>
                  {{ activeFile.file.name }}
                </h3>
                <v-spacer />
                <v-btn
                  color="primary"
                  min-width="175"
                  class="ma-0"
                  :loading="downloadBtnLoading"
                  @click="download()"
                >
                  <v-icon left>
                    mdi-download
                  </v-icon>

                  <span>
                    Download
                  </span>
                </v-btn>
              </div>
              <v-card
                flat
                class="full-width mt-3"
                max-width="100%"
              >
                <v-img
                  v-if="activeFile.file.type === 'Image'"
                  :src="activeFile.file.link"
                  contain
                  position="top"
                  min-width="100%"
                  placeholder="Class File Image Preview"
                  max-height="72vh"
                  class="scroll"
                  @click="imgIndex = 0"
                />

                <cool-light-box
                  v-if="activeFile.file.type === 'Image'"
                  :items="[activeFile.file.link]"
                  :index="imgIndex"
                  @close="imgIndex = null"
                />

                <video-player
                  v-if="activeFile.file.type === 'Video'"
                  ref="videoPlayer"
                  class="video-player-box vjs-big-play-centered full-width"
                  :options="playerOptions"
                  :playsinline="true"
                />

                <object
                  v-if="activeFile.file.type === 'Other' && getFileType(activeFile.file) === 'pdf'"
                  :data="activeFile.file.link"
                  type="application/pdf"
                  width="100%"
                  height="700"
                >
                  <iframe :src="`https://docs.google.com/viewer?url=${activeFile.file.link}&embedded=true`" />
                </object>
              </v-card>
            </v-card>
            <v-card
              flat
              class="pa-0 mt-6"
            >
              <v-icon
                color="grey"
                left
              >
                mdi-clock-time-four-outline
              </v-icon>
              <span class="grey--text">Recent Discussions</span>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import Vue from 'vue'
  import File from '@/views/dashboard/components/component/File.vue'

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import CoolLightBox from 'vue-cool-lightbox'
  import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import { videoPlayer } from 'vue-video-player'
  import 'video.js/dist/video-js.css'

  import { Unit } from '@/model/Unit'

  import firebase from 'firebase'
  import AccordionUnitItem from './AccordionUnitItem.vue'
  import { ClassFile } from '@/model/Lesson'
  import { classesCollection } from '@/fb'
  import axios from 'axios'

  // eslint-disable-next-line no-undef
  import DocumentReference = firebase.firestore.DocumentReference;

  export default Vue.extend({
    components: {
      File,
      CoolLightBox,
      AccordionUnitItem,
      videoPlayer,
    },
    props: {
      vModel: {
        type: Boolean,
        required: false,
        default: false,
      },
      classId: {
        type: String,
        required: true,
      },
      hasEditAccess: {
        type: Boolean,
        required: true,
      },
    },
    data () {
      return {
        unitDataLoading: false,
        downloadBtnLoading: false,

        units: [] as Unit[],

        dbRef: {} as DocumentReference,

        playerOptions: {},

        // for light box
        imgIndex: null,
      }
    },
    computed: {
      dialog (): boolean {
        return this.vModel
      },
      unitsList (): Unit[] {
        return this.units
      },
      computed_dbRef (): DocumentReference {
        return this.dbRef
      },
      activeFile (): { lessonId: string, file: ClassFile } {
        const file = this.$store.getters['class/getActiveFile']

        return file
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      player (): any {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (this.$refs.videoPlayer as any).player
      },
    },
    watch: {
      '$route.params.id' () {
        this.dbRef = classesCollection.doc(this.classId)
        console.log(this.dbRef)

        this.fetchUnits().then(() => {
          console.log('fetch Unit success on ViewContent Mounted')
        }).catch(error => {
          console.log('Fetch Unit Failed on ViewContent Mounted: ' + error)
        })
      },
      'activeFile' () {
        if (this.activeFile.file.type === 'Video') {
          // videojs options
          this.playerOptions = {
            language: 'en',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            fluid: true,
            sources: [{
              type: 'video/mp4',
              src: this.activeFile.file.link,
            }],
          }
        }
      },
    },
    mounted () {
      this.dbRef = classesCollection.doc(this.classId)
      console.log(this.dbRef)
      this.fetchUnits().then(() => {
        console.log('fetch Unit success on ViewContent Mounted')
      }).catch(error => {
        console.log('Fetch Unit Failed on ViewContent Mounted: ' + error)
      })
    },
    methods: {
      close (): void {
        this.$emit('close')
      },
      fileClicked ({ file, lessonId }): void {
        this.$store.dispatch('class/setActiveFile', { lessonId: lessonId, file: file })

        console.log('active file: ', file)
        console.log('active lessonId: ', lessonId)
      },
      async fetchUnits () {
        this.unitDataLoading = true
        try {
          let fetchUnit: Unit[] = []
          await classesCollection.doc(this.classId).collection('units').orderBy('number')
            .onSnapshot(snapshot => {
              fetchUnit = []
              snapshot.forEach(doc => {
                const unit = new Unit(
                  doc.id,
                  doc.data().number,
                  doc.data().title,
                  doc.data().shortDescription,
                  doc.data().isLive,
                )
                fetchUnit.push(unit)
              })
              this.units = fetchUnit
            })
        } finally {
          this.unitDataLoading = false
        }
      },
      forceFileDownload (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', this.activeFile.file.name) // or any other extension
        document.body.appendChild(link)
        link.click()
      },
      download (): void {
        this.downloadBtnLoading = true
        axios({
          method: 'get',
          url: this.activeFile.file.link,
          responseType: 'arraybuffer',
        })
          .then(response => {
            this.forceFileDownload(response)
          })
          .catch(() => console.log('error occured'))
          .finally(() => {
            this.downloadBtnLoading = false
          })
      },
      getFileType (file: ClassFile): string {
        return file.name.split('.').reverse()[0]
      },
    },
  })
</script>

<style lang="scss" scoped>
  .scroll {
    overflow-y: scroll;
  }
</style>
