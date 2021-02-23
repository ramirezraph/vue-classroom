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
                  label="Link"
                  color="info"
                  :error-messages="errors"
                  dense
                  prepend-icon="mdi-link"
                  class="mb-6"
                />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="Meeting Title"
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
              <v-menu
                v-model="menuDate"
                :close-on-content-click="false"
                max-width="290"
              >
                <template #activator="{ on, attrs }">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Description"
                    rules="meeting_required"
                  >
                    <v-text-field
                      :value="computedDateFormattedMomentJs"
                      label="Date"
                      readonly
                      v-bind="attrs"
                      :error-messages="errors"
                      prepend-icon="mdi-calendar"
                      v-on="on"
                      @click:clear="date = null"
                    />
                  </validation-provider>
                </template>
                <v-date-picker
                  v-model="date"
                  @change="menuDate = false"
                />
              </v-menu>
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
                  <validation-provider
                    v-slot="{ errors }"
                    name="Meeting Time Start"
                    rules="meeting_required"
                  >
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
                  </validation-provider>
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
                  <validation-provider
                    v-slot="{ errors }"
                    name="Meeting Time End"
                    rules="meeting_required"
                  >
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
                  </validation-provider>
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
  import Vue from 'vue'
  import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
  import { required } from 'vee-validate/dist/rules'
  import { lecturesCollection } from '@/fb'
  import firebase from 'firebase/app'
  import moment from 'moment'
  import { format, parseISO } from 'date-fns'

  extend('meeting_required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  export default Vue.extend({
    name: 'LiveMeetingDialog',
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    props: {
      vModel: {
        type: Boolean,
        required: true,
      },
    },
    data () {
      return {
        title: '',
        description: '',
        timeEnd: '',
        timeStart: '',
        link: '',

        menuDate: false,
        date: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),

        menuTimeStart: false,
        menuTimeEnd: false,
      }
    },
    computed: {
      modelValue () {
        return this.vModel || false
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
      computedDateFormattedMomentJs (): string {
        return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
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
          dateCreated: firebase.firestore.Timestamp.now(),
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
      convertTime (timeString: string) {
        const H = +timeString.substr(0, 2)
        const h = (H % 12) || 12
        const ampm = H < 12 ? ' AM' : ' PM'
        return h + timeString.substr(2, 3) + ampm
      },
    },
  })
</script>

<style scoped>

</style>
