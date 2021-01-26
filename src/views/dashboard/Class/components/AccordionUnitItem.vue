<template>
  <v-expansion-panel
    :key="componentKey"
    @click.once="unitOpened"
  >
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
            v-for="lesson in lessons"
            :key="lesson.id"
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
            :disabled="showHideAddLesson"
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
            <validation-observer
              ref="observer"
              v-slot="{ invalid }"
            >
              <v-form
                class="mt-4"
                @submit.prevent="submitAddLessonForm"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Lesson Number"
                  :rules="`required|min_value:0|${lessonNumberAlreadyExistsRule}`"
                >
                  <v-text-field
                    v-model="add_lessonNumber"
                    label="Lesson Number"
                    color="blue"
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
                    v-model="add_lessonTitle"
                    label="Title"
                    color="blue"
                    outlined
                    rounded
                    :error-messages="errors"
                    dense
                    prepend-inner-icon="mdi-pencil-outline"
                  />
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="Description"
                >
                  <v-textarea
                    v-model="add_lessonDescription"
                    label="Description"
                    color="blue"
                    outlined
                    rounded
                    optional
                    :error-messages="errors"
                    hint="Optional"
                    rows="3"
                    prepend-inner-icon="mdi-card-text-outline"
                  />
                </validation-provider>
                <v-btn
                  type="submit"
                  :disabled="invalid"
                  class="green mr-2"
                >
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
            </validation-observer>
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
  import { extend } from 'vee-validate'
  // eslint-disable-next-line camelcase
  import { excluded, min_value, required } from 'vee-validate/dist/rules'
  // eslint-disable-next-line no-undef
  import DocumentReference = firebase.firestore.DocumentReference;

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('min_value', {
    // eslint-disable-next-line camelcase
    ...min_value,
    message: '{_field_} cannot be a negative',
  })

  extend('excluded', {
    ...excluded,
    message: '{_field_} already in used.',
  })

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

        // Add Lesson
        add_lessonNumber: null,
        add_lessonTitle: '',
        add_lessonDescription: '',

        componentKey: 0,
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
      lessonNumberAlreadyExistsRule (): string {
        let lessonNumbers = ''
        this.lessons.forEach(lesson => {
          lessonNumbers += lesson.lessonNumber + ','
        })
        lessonNumbers = lessonNumbers.substring(0, lessonNumbers.length - 1)
        return `excluded:${lessonNumbers}`
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
      toggleAddNewLesson (): void {
        this.add_lessonNumber = null
        this.add_lessonTitle = ''
        this.add_lessonDescription = ''
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
        console.log('once!')
        this.fetchLessons()
      },
      submitAddLessonForm (dialogResponse: boolean): void {
        if (dialogResponse) {
          const newLesson = {
            lessonNumber: this.add_lessonNumber,
            title: this.add_lessonTitle,
            shortDescription: this.add_lessonDescription,
            isLive: false,
          }

          this.unitDbRef.collection('lessons').add(newLesson)
            .then(() => {
              // this.unitNotificationType = 'success'
              // this.unitNotificationMessage = 'Lesson added successfully.'
              // this.unitNotification = true
              console.log('adding lesson succeed')
            })
            .catch(error => {
              // this.unitNotificationType = 'error'
              // this.unitNotificationMessage = 'Adding Lesson failed: ' + error
              // this.unitNotification = true
              console.log('adding lesson failed', error)
            })
          this.toggleAddNewLesson()
        }
        // this.dialogConfirmAddUnit = false
      },
    },
  })
</script>

<style lang="scss" scoped>

</style>
