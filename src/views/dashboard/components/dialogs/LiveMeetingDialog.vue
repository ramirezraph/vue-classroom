<template>
  <v-row justify="center">
    <v-dialog
      v-model="modelValue"
      max-width="700px"
      persistent
    >
      <v-card>
        <validation-observer
          ref="observer"
          v-slot="{ invalid }"
        >
          <v-card-title class="pb-3">
            <div class="d-flex">
              <div class="headline">
                Create Meeting
              </div>
              <div class="ml-auto">
                <v-btn
                  text
                  outlined
                  class="px-6 text-none"
                  @click="close"
                >
                  Cancel
                </v-btn>
              </div>
            </div>
          </v-card-title>
          <v-divider />
          <v-card-text class="px-12 py-6">
            <v-form @submit.prevent="create">
              <validation-provider
                v-slot="{ errors }"
                name="Meeting Link"
                rules="meeting_required"
              >
                <v-text-field
                  v-model="link"
                  label="Meeting Link"
                  color="info"
                  :error-messages="errors"
                  dense
                  prepend-icon="mdi-link"
                  class="mb-6"
                />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="Title"
                rules="meeting_required"
              >
                <v-text-field
                  v-model="title"
                  label="Title"
                  color="info"
                  :error-messages="errors"
                  dense
                  prepend-icon="mdi-pencil-outline"
                  class="mb-6"
                />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="Description"
              >
                <v-textarea
                  v-model="description"
                  label="Description"
                  color="info"
                  rows="3"
                  style="white-space: pre"
                  :error-messages="errors"
                  dense
                  prepend-icon="mdi-pencil-outline"
                  class="mb-6"
                />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="Title"
              >
                <v-menu
                  v-model="menuDate"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      v-model="computedDateFormatted"
                      label="Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      :error-messages="errors"
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    @input="menuDate = false"
                  />
                </v-menu>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="Time Start"
                rules="meeting_required"
              >
                <v-menu
                  ref="menuTimeStart"
                  v-model="menuTimeStart"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="timeStart"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      v-model="formattedTimeStart"
                      label="Time Start"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      :error-messages="errors"
                      persistent-hint
                      v-on="on"
                    />
                  </template>
                  <v-time-picker
                    v-if="menuTimeStart"
                    v-model="timeStart"
                    full-width
                    ampm-in-title
                    format="24hr"
                    @click:minute="$refs.menuTimeStart.save(timeStart)"
                  />
                </v-menu>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="Time End"
                rules="meeting_required"
              >
                <v-menu
                  ref="menuTimeEnd"
                  v-model="menuTimeEnd"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="timeEnd"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template #activator="{ on, attrs }">
                    <v-text-field
                      v-model="formattedTimeEnd"
                      label="Time End"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      persistent-hint
                      :error-messages="errors"
                      v-on="on"
                    />
                  </template>
                  <v-time-picker
                    v-if="menuTimeEnd"
                    v-model="timeEnd"
                    full-width
                    ampm-in-title
                    format="24hr"
                    @click:minute="$refs.menuTimeEnd.save(timeEnd)"
                  />
                </v-menu>
              </validation-provider>
            </v-form>
          </v-card-text>
          <v-card-actions class="ma-0 pa-3 mt-n6 px-6">
            <v-btn
              block
              class="primary"
              type="submit"
              :disabled="invalid"
              @click="create"
            >
              Save
            </v-btn>
          </v-card-actions>
        </validation-observer>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { Meeting } from '@/model/Meeting'
  import { extend } from 'vee-validate'
  import { required } from 'vee-validate/dist/rules'
  import { lecturesCollection } from '@/fb'
  import firebase from 'firebase/app'

  extend('meeting_required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  export default Vue.extend({
    name: 'LiveMeetingDialog',
    props: {
      vModel: {
        type: Boolean,
        required: true,
      },
      meeting: {
        type: Object as PropType<Meeting>,
        required: false,
        default: () => {
          return new Meeting()
        },
      },
    },
    data () {
      return {
        title: '',
        description: '',
        timeEnd: null,
        timeStart: null,
        link: '',

        date: new Date().toISOString().substr(0, 10),
        dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
        menuDate: false,

        menuTimeStart: false,
        menuTimeEnd: false,
      }
    },
    computed: {
      modelValue () {
        return this.vModel || false
      },
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
      currentUser () {
        return this.$store.getters['user/getCurrentUser']
      },
      classId (): string {
        const path = this.$route.path.split('/')
        return path[path.length - 1]
      },
      formattedTimeStart (): string {
        return this.convertTime(this.timeStart)
      },
      formattedTimeEnd (): string {
        return this.convertTime(this.timeEnd)
      },
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
    methods: {
      create (): void {
        const newMeeting = {
          teacherId: this.currentUser.id,
          classId: this.classId,
          title: this.title,
          description: this.description,
          date: firebase.firestore.Timestamp.fromDate(new Date(this.date)),
          timeStart: this.formattedTimeStart,
          timeEnd: this.formattedTimeEnd,
          link: this.link,
        }

        lecturesCollection.add(newMeeting)
          .then(() => {
            this.$notify({
              group: 'appWideNotification',
              title: 'Success',
              text: 'Meeting has been created successfully. ',
              type: 'success',
            })
            this.$emit('close')
          }).catch(error => {
            this.$notify({
              group: 'appWideNotification',
              title: 'Failed',
              text: error.message,
              type: 'error',
            })
          }).finally(() => {
            this.$emit('close')
          })
      },
      close (): void {
        this.$emit('close')
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      convertTime (time: string): string {
        if (time) {
          // Check correct time format and split into components
          time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time]

          if (time.length > 1) { // If time format correct
            time = time.slice(1) // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM' // Set AM/PM
            time[0] = +time[0] % 12 || 12 // Adjust hours
          }
          return time.join('') // return adjusted time or original string        }
        }
      },
    },
  })
</script>

<style scoped>

</style>
