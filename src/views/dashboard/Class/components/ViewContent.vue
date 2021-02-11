<template>
  <v-dialog
    :key="componentKey"
    v-model="dialog"
    fullscreen
    transition="dialog-bottom-transition"
    scrollable
    height="auto"
  >
    <v-card
      flat
    >
      <v-toolbar
        dark
        color="blue"
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
      <v-row
        id="viewFileSection"
        no-gutters
      >
        <v-col
          cols="3"
          class="pa-5"
        >
          <span class="subtitle-2">Class Files</span>
          <v-expansion-panels
            class="mt-3"
          >
            <v-expansion-panel
              v-for="unit in units"
              :key="unit.id"
            >
              <v-expansion-panel-header
                class="text-h4 font-weight-medium"
                @click="unitOpened(unit.id)"
              >
                Unit: {{ unit.title }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-expansion-panels
                  class="ma-0 pa-0"
                  multiple
                >
                  <v-expansion-panel
                    v-for="lesson in unit.lessons"
                    :key="lesson.id"
                  >
                    <v-expansion-panel-header
                      class="subtitle-1"
                      @click="lessonOpened(unit.id, lesson.id)"
                    >
                      Lesson: {{ lesson.title }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <div class="py-4">
                        <file
                          v-for="file in lesson.files"
                          :key="file.id"
                          :has-edit-access="false"
                          file-id="asdfasf"
                          :name="file.name"
                          :type="file.type"
                          :link="file.link"
                        >
                          <template
                            #title
                          >
                            <span @click="fileClicked(file, unit)">
                              {{ file.name }}
                            </span>
                          </template>
                        </file>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <v-col
          cols="6"
          class="pa-3"
        >
          <div id="content-header">
            <div id="content-unit-info">
              <h1
                class="display-3 blue--text mt-3"
              >
                Unit: {{ computedUnitActive.title }}
              </h1>
              <div class="mt-3">
                {{ computedUnitActive.shortDescription }}
              </div>
            </div>
            <div
              id="content-file-info"
              class="mt-6"
            >
              <v-row
                no-gutters
                align="center"
              >
                <v-col cols="8">
                  <h1
                    class="display-1"
                  >
                    {{ computedFileActive.name }}
                  </h1>
                </v-col>
                <v-spacer />
                <v-col>
                  <v-btn
                    color="blue"
                    class="white--text"
                    height="30"
                    :loading="downloadBtnLoading"
                    @click="download"
                  >
                    <v-icon left>
                      mdi-download
                    </v-icon>
                    Download
                  </v-btn>
                </v-col>
              </v-row>
            </div>
            <div class="mt-6">
              <v-card
                v-if="computedFileActive.type ==='Video'"
                min-width="500"
                class="player"
                flat
              >
                <video-player
                  ref="videoPlayer"
                  class="video-player-box vjs-big-play-centered"
                  :options="playerOptions"
                  :playsinline="true"
                  custom-event-name="customstatechangedeventname"
                />
              </v-card>
              <v-card
                v-if="computedFileActive.type ==='Image'"
                max-width="100%"
                min-width="500"
                align="center"
              >
                <v-img
                  contain
                  :src="computedFileActive.link"
                  max-height="700"
                  max-width="100%"
                  position="center center"
                  :placeholder="computedFileActive.name"
                />
              </v-card>
              <v-card
                v-if="showDocPreview"
                max-width="100%"
                min-width="500"
                max-height="700"
                align="center"
                class="scroll"
              >
                <vue-doc-preview
                  :url="docValue"
                  :type="docType"
                  max-height="700"
                />
              </v-card>
              <v-card
                v-if="showPdfPreview"
                max-width="100%"
                min-width="500"
                max-height="700"
                align="center"
                class="scroll"
              >
                <pdf
                  v-for="i in pdfValueNumPage"
                  :key="i"
                  :src="pdfValue"
                  :page="i"
                />
              </v-card>
            </div>
          </div>
        </v-col>
        <v-col
          cols="3"
          class="pa-3"
        >
          <div class="px-6 pt-3 pb-2">
            <span class="subtitle-1 blue--text">Comments</span>
          </div>
          <v-divider />
          <div>
            <v-list
              three-line
            >
              <template v-for="(item, index) in items">
                <v-subheader
                  v-if="item.header"
                  :key="item.header"
                  v-text="item.header"
                />

                <v-divider
                  v-else-if="item.divider"
                  :key="index"
                  :inset="item.inset"
                />

                <v-list-item
                  v-else
                  :key="item.title"
                >
                  <v-list-item-avatar>
                    <v-img :src="item.avatar" />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-html="item.title" />
                    <v-list-item-subtitle v-html="item.subtitle" />
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
            <div class="mt-3 pa-3">
              <v-text-field
                full-width
                color="blue"
                outlined
                append-icon="mdi-send"
                dense
                placeholder="Write a comment here"
              >
                <template #prepend>
                  <v-avatar
                    color="blue"
                    size="40"
                    class="mt-n2"
                  >
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                    >
                  </v-avatar>
                </template>
              </v-text-field>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import File from '@/views/dashboard/components/component/File.vue'
  import { videoPlayer } from 'vue-video-player'
  import VueDocPreview from 'vue-doc-preview'
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import pdf from 'vue-pdf'

  // require styles
  import 'video.js/dist/video-js.css'
  import { Class } from '@/model/Class'
  import { Unit } from '@/model/Unit'
  import { classesCollection, resourcesCollection } from '@/fb'
  import { ClassFile, Lesson } from '@/model/Lesson'
  import axios from 'axios'

  export default Vue.extend({
    components: {
      File,
      videoPlayer,
      VueDocPreview,
      pdf,
    },
    props: {
      vModel: {
        type: Boolean,
        required: false,
        default: false,
      },
      classData: {
        type: Object as PropType<Class>,
        required: true,
      },
      activeFile: {
        type: Object as PropType<ClassFile>,
        required: true,
      },
      activeUnit: {
        type: Object as PropType<Unit>,
        required: true,
      },
      hasEditAccess: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data () {
      return {
        componentKey: 0,
        activeUnitData: {} as Unit,
        activeFileData: {} as ClassFile,
        downloadBtnLoading: false,

        docValue: '',
        docType: '',
        showDocPreview: false,

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pdfValue: null as any,
        pdfValueNumPage: 0,
        showPdfPreview: false,

        items: [
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'Brunch this weekend?',
            subtitle: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?',
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            title: 'Summer BBQ',
            subtitle: 'Wish I could come, but I\'m out of town this weekend.',
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title: 'Oui oui',
            subtitle: 'Do you have Paris recommendations? Have you ever been?',
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
            title: 'Birthday gift',
            subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
            title: 'Recipe to try',
            subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          },
        ],
        playerOptions: {},
      }
    },
    computed: {
      dialog (): boolean {
        return this.vModel
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      player (): any {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (this.$refs.videoPlayer as any).player
      },
      units (): Unit[] {
        return this.classItem.units || []
      },
      classItem (): Class {
        return this.$store.getters['classes/getClass'](this.classData.id)
      },
      computedFileActive: {
        get (): ClassFile {
          if (Object.keys(this.activeFileData).length === 0) {
            return this.activeFile
          } else {
            return this.activeFileData
          }
        },
        set (newValue: ClassFile):void {
          this.activeFileData = newValue
        },
      },
      computedUnitActive: {
        get (): Unit {
          if (Object.keys(this.activeUnitData).length === 0) {
            return this.activeUnit
          } else {
            return this.activeUnitData
          }
        },
        set (newValue: Unit):void {
          this.activeUnitData = newValue
        },
      },
    },
    watch: {
      '$route' () {
        // force rerender the component to reset the @click.once event.
        // everytime the router change.
        this.componentKey += 1
      },
      'computedFileActive' () {
        console.log(this.computedFileActive.type)
        if (this.computedFileActive.type === 'Video') {
          // videojs options
          this.playerOptions = {
            language: 'en',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            fluid: true,
            sources: [{
              type: 'video/mp4',
              src: this.computedFileActive.link,
            }],
          }
          this.showPdfPreview = false
          this.showDocPreview = false
        } else if (this.computedFileActive.type === 'Other') {
          const docType = this.computedFileActive.name.split('.').reverse()[0]
          if (
            docType === 'docx' ||
            docType === 'pptx' ||
            docType === 'xlsx'
          ) {
            this.showPdfPreview = false
            axios({
              method: 'get',
              url: this.computedFileActive.link,
              responseType: 'arraybuffer',
            })
              .then(response => {
                this.docValue = window.URL.createObjectURL(new Blob([response.data]))
                this.docType = 'office'
                this.showDocPreview = true
              })
              .catch(() => console.log('error occured'))
              .finally(() => {
                this.downloadBtnLoading = false
              })
          } else {
            if (docType === 'pdf') {
              this.showDocPreview = false
              const loadingTask = pdf.createLoadingTask(this.computedFileActive.link)
              if (loadingTask) {
                this.pdfValue = loadingTask
                this.pdfValue.promise.then(p => {
                  this.pdfValueNumPage = p.numPages
                })
                this.showPdfPreview = true
              }
            }
          }
        } else {
          this.showDocPreview = false
          this.showPdfPreview = false
        }
      },
    },
    methods: {
      close (): void {
        // this.player.pause()
        this.activeUnitData = {} as Unit
        this.activeFileData = {} as ClassFile
        this.pdfValue = null
        this.pdfValueNumPage = 0
        this.showPdfPreview = false
        this.$emit('close')
      },
      unitOpened (unitId: string): void {
        const foundUnit = this.units.find(u => u.id === unitId)
        if ((foundUnit?.lessons?.length || 0) <= 0) { // read only if empty
          let fetchLessons: Lesson[] = []
          classesCollection.doc(this.classItem.id).collection('units').doc(unitId).collection('lessons').orderBy('lessonNumber')
            .onSnapshot(snapshot => {
              fetchLessons = []
              snapshot.forEach(doc => {
                const lesson = new Lesson(
                  doc.id,
                  doc.data().lessonNumber,
                  doc.data().title,
                  doc.data().shortDescription,
                  doc.data().isLive,
                )
                if (this.hasEditAccess) {
                  fetchLessons.push(lesson)
                } else {
                  if (lesson.isLive) {
                    fetchLessons.push(lesson)
                  }
                }
              })
              this.$store.dispatch('classes/fetchLessons', { classId: this.classItem.id, unitId: unitId, lessons: fetchLessons })
            })
          console.log('read lessons')
        }
      },
      lessonOpened (unitId: string, lessonId: string): void {
        const foundUnit = this.units.find(u => u.id === unitId)
        const foundLesson = foundUnit?.lessons?.find(l => l.id === lessonId)
        if ((foundLesson?.files?.length || 0) <= 0) { // read only if empty
          resourcesCollection.doc(lessonId).collection('files')
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
              // this.files = fetchFiles
              const classId = this.classItem.id
              this.$store.dispatch('classes/fetchFiles', { classId: classId, unitId: unitId, lessonId: lessonId, files: fetchFiles })
            })
          console.log('read files')
        }
      },
      fileClicked (file: ClassFile, unit: Unit): void {
        this.computedUnitActive = unit
        this.computedFileActive = file
      },
      forceFileDownload (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', this.computedFileActive.name) // or any other extension
        document.body.appendChild(link)
        link.click()
      },
      download (): void {
        this.downloadBtnLoading = true
        axios({
          method: 'get',
          url: this.computedFileActive.link,
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
    },
  })
</script>

<style lang="scss" scoped>
  #viewFileSection {
    width: 100%;
    height: 93.4vh;
  }
  .scroll {
    overflow-y: scroll
  }
</style>
