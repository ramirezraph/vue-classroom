<template>
  <v-dialog
    :key="componentKey"
    v-model="dialog"
    fullscreen
    transition="dialog-bottom-transition"
    scrollable
    height="auto"
    persistent
  >
    <v-card
      flat
    >
      <v-toolbar
        dark
        color="primary"
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
                class="display-3 info--text mt-3"
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
                    color="info"
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
                  max-height="680"
                  max-width="100%"
                  position="center center"
                  :placeholder="computedFileActive.name"
                  @click="imgIndex = 0"
                />

                <cool-light-box
                  :items="[computedFileActive.link]"
                  :index="imgIndex"
                  @close="imgIndex = null"
                />
              </v-card>
              <v-card
                v-if="showDocPreview"
                max-width="100%"
                min-width="500"
                max-height="680"
                align="center"
                class="scroll"
              >
                <vue-doc-preview
                  :url="docValue"
                  :type="docType"
                  max-height="680"
                />
              </v-card>
              <v-card
                v-if="showPdfPreview"
                max-width="100%"
                min-width="500"
                max-height="680"
                align="center"
              >
                <!-- <pdf
                  v-for="i in pdfValueNumPage"
                  :key="i"
                  :src="pdfValue"
                  :page="i"
                /> -->
                <object
                  :data="pdfValue"
                  width="670px"
                  height="680px"
                />
              </v-card>
            </div>
          </div>
        </v-col>
        <v-col
          cols="3"
          class="pa-3"
        >
          <div>
            <v-toolbar
              dense
              class="ma-0 pa-0"
              flat
            >
              <v-toolbar-title>
                <span class="subtitle-1 info--text">Comments</span>
              </v-toolbar-title>
              <v-spacer />
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    icon
                    color="info"
                    v-bind="attrs"
                    v-on="on"
                    @click="fetchComments(computedFileActive)"
                  >
                    <v-icon>
                      mdi-refresh
                    </v-icon>
                  </v-btn>
                </template>
                <span>Refresh</span>
              </v-tooltip>
            </v-toolbar>
          </div>
          <v-divider />
          <div>
            <v-list
              :key="computedFileActive.id"
              three-line
            >
              <template v-for="(item, index) in fileComments">
                <v-subheader
                  v-if="item.header"
                  :key="index"
                  v-text="item.header"
                />

                <v-divider
                  v-else-if="item.divider"
                  :key="index"
                  :inset="item.inset"
                />

                <v-list-item
                  v-else
                  :key="index"
                >
                  <v-list-item-avatar>
                    <v-img :src="item.avatar" />
                  </v-list-item-avatar>

                  <v-list-item-content class="mb-n8">
                    <v-list-item-title
                      class="info--text font-weight-medium"
                      v-html="item.title"
                    />
                    <v-textarea
                      class="text-h5 mt-n3"
                      flat
                      :value="item.subtitle"
                      auto-grow
                      readonly
                      style="white-space: pre"
                      rows="1"
                    />
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
            <div class="mt-3 pa-3">
              <v-textarea
                v-model="comment_message"
                full-width
                color="blue"
                outlined
                rows="1"
                append-icon="mdi-send"
                auto-grow
                dense
                label="Comment"
                placeholder="Write a comment here"
                @click:append="postComment(computedFileActive)"
              >
                <template #prepend>
                  <v-avatar
                    color="blue"
                    size="40"
                    class="mt-n2"
                  >
                    <img
                      :src="currentUser.profile"
                    >
                  </v-avatar>
                </template>
              </v-textarea>
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import { videoPlayer } from 'vue-video-player'
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import VueDocPreview from 'vue-doc-preview'

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import CoolLightBox from 'vue-cool-lightbox'
  import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

  // require styles
  import 'video.js/dist/video-js.css'
  import { Class } from '@/model/Class'
  import { Unit } from '@/model/Unit'
  import { classesCollection, fileCommentsCollection, resourcesCollection, usersCollection } from '@/fb'
  import { ClassFile, Lesson } from '@/model/Lesson'
  import axios from 'axios'
  import firebase from 'firebase/app'
  import { User } from '@/model/User'

  export default Vue.extend({
    components: {
      File,
      videoPlayer,
      VueDocPreview,
      CoolLightBox,
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

        imgIndex: null,
        imgItem: [],

        showPdfPreview: false,
        pdfValue: '',

        comment_message: '',
        fileComments: [] as { avatar: string, title: string, subtitle: string }[],

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
      currentUser (): User {
        return this.$store.getters['user/getCurrentUser']
      },
    },
    watch: {
      '$route' () {
        // force rerender the component to reset the @click.once event.
        // everytime the router change.
        this.componentKey += 1
      },
      'computedFileActive' () {
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
              this.pdfValue = this.computedFileActive.link
              this.showPdfPreview = true
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
        this.pdfValue = ''
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
        }
      },
      lessonOpened (unitId: string, lessonId: string): void {
        const foundUnit = this.units.find(u => u.id === unitId)
        const foundLesson = foundUnit?.lessons?.find(l => l.id === lessonId)
        if ((foundLesson?.files?.length || 0) <= 0) { // read only if empty
          const fileRef = resourcesCollection.doc(lessonId).collection('files')
          fileRef.onSnapshot(snapshot => {
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
            this.$store.dispatch('classes/fetchFiles', { classId: this.classItem.id, unitId: unitId, lessonId: lessonId, files: fetchFiles })
          })
        }
      },
      fileClicked (file: ClassFile, unit: Unit) {
        if (file.id === this.computedFileActive.id) {
          console.log('true')
          return
        }
        this.computedUnitActive = unit
        this.computedFileActive = file
        this.fetchComments(this.computedFileActive)
      },
      postComment (activeFile: ClassFile) {
        const newComment = {
          userId: this.currentUser.id,
          time: firebase.firestore.Timestamp.now(),
          message: this.comment_message,
        }
        fileCommentsCollection.doc(activeFile.id).collection('comments')
          .add(newComment).then(() => {
            this.comment_message = ''
          }).catch(error => {
            console.log(error)
          })
      },
      async fetchComments (activeFile: ClassFile) {
        if (!activeFile) {
          return
        }

        // fetch comments
        let comments: { avatar: string, title: string, subtitle: string }[] = []
        const ref = fileCommentsCollection.doc(activeFile.id).collection('comments')
          .orderBy('time')
          .onSnapshot(commentSnapshot => {
            console.log('snapshot')
            comments = []
            commentSnapshot.forEach(comment => {
              usersCollection.doc(comment.data()?.userId).get().then(user => {
                comments.push({
                  avatar: user.data()?.imgProfile,
                  title: this.getFullName(user.data()?.firstName, user.data()?.middleName, user.data()?.lastName),
                  subtitle: comment.data()?.message,
                })
              })
            })
            this.fileComments = comments
          })
        this.fileComments = comments
        return ref
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
      getFullName (firstName: string, middleName: string, lastName: string): string {
        return `${firstName} ${this.middleInitial(middleName)} ${lastName}`
      },
      middleInitial (middleName: string): string {
        const midName: string[] = middleName.split(' ')
        let middleInitial = ''
        for (let i = 0; i < midName.length; i++) {
          middleInitial += midName[i].substring(0, 1) + '.'
        }

        return middleInitial
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
