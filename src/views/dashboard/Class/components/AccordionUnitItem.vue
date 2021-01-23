<template>
  <v-expansion-panel @click.once="unitOpened">
    <v-expansion-panel-header color="#404040">
      <v-card
        flat
        tile
        class="ma-0 white--text"
        color="transparent"
      >
        <p class="text-h3 ma-0">
          Unit {{ unitItem.unitNumber }}: {{ unitItem.title }}
        </p>
        <p class="ma-0">
          {{ unitItem.shortDescription }}
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
        elevation="3"
        class="mt-n2"
      >
        <v-expansion-panels
          accordion
          focusable
          multiple
          class="mt-4"
        >
          <accordion-lesson-item
            v-for="(lesson, indexLesson) in lessons"
            :key="indexLesson"
            :lesson="lesson"
            :unit-db-ref="unitDbRef"
          />
        </v-expansion-panels>
      </v-card>
      <v-card
        flat
      >
        <v-row
          no-gutters
        >
          <v-btn
            color="blue lighten-1"
            @click="toggleAddNewLesson"
          >
            <v-icon left>
              mdi-card-plus
            </v-icon>
            <span>Add New Lesson</span>
          </v-btn>
          <v-spacer />
          <v-tooltip left>
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                color="error"
                v-bind="attrs"
                v-on="on"
                @click="removeUnit"
              >
                <v-icon size="25">
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
            <span>
              Remove Unit
            </span>
          </v-tooltip>
        </v-row>
      </v-card>
      <v-expand-transition>
        <v-card
          v-if="showHideAddLesson"
          elevation="6"
          class="pa-2"
          outlined
        >
          <v-card-title class="text-h4">
            Add Lesson
          </v-card-title>
          <v-card-text>
            <v-form
              class="mt-4"
              @submit.prevent=""
            >
              <v-text-field
                label="Name"
                color="blue"
                outlined
                rounded
                dense
                prepend-inner-icon="mdi-pencil-outline"
              />
              <v-textarea
                label="Description"
                color="blue"
                outlined
                rounded
                optional
                rows="3"
                prepend-inner-icon="mdi-card-text-outline"
              />
              <v-btn class="green mr-2">
                Save Lesson
              </v-btn>
              <v-btn
                text
                outlined
                @click="toggleAddNewLesson"
              >
                Cancel
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-expand-transition>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
  import { Lesson } from '@/model/Lesson'
  import { Unit } from '@/model/Unit'
  import Vue, { PropType } from 'vue'
  import AccordionLessonItem from './AccordionLessonItem.vue'
  import firebase from 'firebase'
  // eslint-disable-next-line no-undef
  import DocumentReference = firebase.firestore.DocumentReference;
  export default Vue.extend({
    components: {
      AccordionLessonItem,
    },
    props: {
      unit: {
        type: Object as PropType<Unit>,
        required: true,
      },
      classDbRef: {
        type: Object as PropType<DocumentReference>,
        required: true,
      },
    },
    data () {
      return {
        showHideAddLesson: false,
        isUnitLive: false,

      }
    },
    computed: {
      unitItem (): Unit {
        return this.unit
      },
      lessons (): Lesson[] {
        return this.unitItem.lessons || []
      },
      liveDraftLabel (): string {
        return this.isUnitLive ? 'Live' : 'Draft'
      },
      liveDraftColorSwitch (): string {
        return this.isUnitLive ? 'white' : 'white'
      },
      unitDbRef (): DocumentReference {
        return this.classDbRef.collection('units').doc(this.unit.id)
      },
    },
    methods: {
      toggleAddNewLesson (): void {
        this.showHideAddLesson = !this.showHideAddLesson
      },
      removeUnit (): void {
        // confirm
        this.$emit('remove-unit', this.unit)
      },
      fetchLessons (): void {
        let fetchLessons: Lesson[] = []
        this.unitDbRef.collection('lessons').orderBy('lessonNumber')
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
              fetchLessons.push(lesson)
            })
            this.unitItem.lessons = fetchLessons
          })
      },
      unitOpened (): void {
        this.fetchLessons()
      },
    },
  })
</script>

<style lang="scss" scoped>

</style>
