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
            :has-edit-access="hasEditAccess"
            :lesson="lesson"
            :unit-db-ref="unitDbRef"
            @file-clicked="fileClicked"
          />
        </v-expansion-panels>
      </v-card>
      <v-card
        v-if="hasEditAccess"
        flat
      >
        <v-row
          no-gutters
        >
          <v-btn
            color="info"
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
                v-bind="attrs"
                v-on="on"
                @click="toggleEditUnit"
              >
                <v-icon size="25">
                  mdi-pencil
                </v-icon>
              </v-btn>
            </template>
            <span>
              Edit Unit
            </span>
          </v-tooltip>
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
                    v-model="add_lessonTitle"
                    label="Title"
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
                  name="Description"
                >
                  <v-textarea
                    v-model="add_lessonDescription"
                    label="Description"
                    color="info"
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
                  class="info mr-2"
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
      <v-expand-transition>
        <v-card
          v-if="showHideEditUnit"
          elevation="6"
          class="pa-2"
          outlined
        >
          <v-card-title class="text-h4">
            Edit Unit
          </v-card-title>
          <v-card-text>
            <validation-observer
              ref="observer"
              v-slot="{ invalid }"
            >
              <v-form
                class="mt-4"
                @submit.prevent="submitEditUnit"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Unit Number"
                  :rules="`required|min_value:0|${unitNumberAlreadyExistsRuleEdit}`"
                >
                  <v-text-field
                    v-model="edit_unitNumber"
                    label="Unit Number"
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
                  name="Unit Title"
                  rules="required"
                >
                  <v-text-field
                    v-model="edit_unitTitle"
                    label="Unit Title"
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
                    v-model="edit_unitDescription"
                    label="Short Description"
                    color="info"
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
                  class="info mr-2"
                  :loading="editUnitLoading"
                >
                  Save Changes
                </v-btn>
                <v-btn
                  text
                  outlined
                  @click="toggleEditUnit"
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
  import { ClassFile, Lesson } from '@/model/Lesson'
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
      hasEditAccess: {
        type: Boolean,
        required: true,
      },
      unit: {
        type: Object as PropType<Unit>,
        required: true,
      },
      units: {
        type: Array as PropType<Unit[]>,
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

        lessons: [] as Lesson[],
        // Add Lesson
        add_lessonNumber: null,
        add_lessonTitle: '',
        add_lessonDescription: '',

        showHideEditUnit: false,
        edit_unitNumberTemp: -1,
        edit_unitNumber: -1,
        edit_unitTitle: '',
        edit_unitDescription: '',
        editUnitLoading: false,

        componentKey: 0,
      }
    },
    computed: {
      unitItem (): Unit {
        return this.unit
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
      unitNumberAlreadyExistsRuleEdit (): string {
        let unitNumbers = ''
        this.units.forEach(unit => {
          if (this.edit_unitNumberTemp !== unit.unitNumber) {
            unitNumbers += unit.unitNumber + ','
          }
        })
        unitNumbers = unitNumbers.substring(0, unitNumbers.length - 1)
        return `excluded:${unitNumbers}`
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
      toggleEditUnit (): void {
        this.edit_unitNumber = this.unitItem.unitNumber
        this.edit_unitTitle = this.unitItem.title
        this.edit_unitDescription = this.unitItem.shortDescription

        this.edit_unitNumberTemp = this.unitItem.unitNumber

        this.showHideEditUnit = !this.showHideEditUnit
      },
      async submitEditUnit () {
        this.editUnitLoading = true
        await this.unitDbRef.update({
          number: this.edit_unitNumber,
          title: this.edit_unitTitle,
          shortDescription: this.edit_unitDescription,
        }).then(() => {
          this.$notify({
            group: 'appWideNotification',
            title: 'Success',
            text: 'Unit has been updated successfully.',
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
          this.editUnitLoading = false
        })
        this.toggleEditUnit()
      },
      removeUnit (): void {
        // confirm
        this.$emit('remove-unit', this.unit)
      },
      fetchLessons () {
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
              if (this.hasEditAccess) {
                fetchLessons.push(lesson)
              } else {
                if (lesson.isLive) {
                  fetchLessons.push(lesson)
                }
              }
            })
            const classId = this.unitDbRef.path.split('/')[1]
            this.lessons = fetchLessons
            this.$store.dispatch('classes/fetchLessons', { classId: classId, unitId: this.unitItem.id, lessons: this.lessons })
          })
      },
      unitOpened (): void {
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
              this.$notify({
                group: 'appWideNotification',
                title: 'Success',
                text: 'Added lesson successfully.',
                type: 'success',
              })
            })
            .catch(error => {
              this.$notify({
                group: 'appWideNotification',
                title: 'Adding Lesson Failed',
                text: error.message,
                type: 'error',
              })
            })
          this.toggleAddNewLesson()
        }
        // this.dialogConfirmAddUnit = false
      },
      fileClicked (file: ClassFile): void {
        this.$emit('file-clicked', file, this.unitItem)
      },
    },
  })
</script>

<style lang="scss" scoped>

</style>
