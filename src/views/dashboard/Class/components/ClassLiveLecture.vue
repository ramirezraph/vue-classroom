<template>
  <v-card
    flat
    outlined
    class="mt-0"
  >
    <v-card-title
      class="mt-6"
    >
      <v-btn
        v-if="hasEditAccess"
        color="primary"
        rounded
        class="ml-5"
        @click="createLiveLectureDialog = true"
      >
        <v-icon left>
          mdi-video-outline
        </v-icon>
        <span
          class="text-none"
        >
          New Meeting
        </span>
      </v-btn>
      <v-spacer v-if="hasEditAccess" />
      <v-chip-group
        v-model="filterClassMeetings"
        mandatory
        :class="hasEditAccess ? 'px-0' : 'px-4'"
      >
        <v-chip
          filter
          active-class="secondary"
          value="all"
        >
          All Meetings
        </v-chip>
        <v-chip
          filter
          active-class="secondary"
          value="today"
        >
          Today
        </v-chip>
        <v-chip
          filter
          active-class="secondary"
          value="thisWeek"
        >
          This Week
        </v-chip>
      </v-chip-group>
    </v-card-title>
    <v-card-text>
      <div v-if="meetings.length > 0">
        <live-lecture-item
          v-for="item in meetings"
          :key="item.id"
          :meeting="item"
          :has-edit-access="hasEditAccess"
        />
      </div>
      <div
        v-else
        class="ma-6"
      >
        <p class="grey--text caption">
          There is no meeting here.
        </p>
      </div>
    </v-card-text>
    <live-meeting-dialog
      v-if="createLiveLectureDialog"
      :v-model="createLiveLectureDialog"
      @close="createLiveLectureDialog = false"
    />
  </v-card>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import LiveLectureItem from './LiveLectureItem.vue'
  import LiveMeetingDialog from '@/views/dashboard/components/dialogs/LiveMeetingDialog.vue'
  import { Meeting } from '@/model/Meeting'
  export default Vue.extend({
    name: 'ClassLiveLecture',
    components: {
      LiveLectureItem,
      LiveMeetingDialog,
    },
    props: {
      meetings: {
        type: Array as PropType<Meeting[]>,
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
        createLiveLectureDialog: false,
        filterClassMeetings: 0,
      }
    },
    watch: {
      'filterClassMeetings' () {
        this.$emit('filter-meetings', this.filterClassMeetings)
      },
    },
    methods: {},
  })
</script>

<style scoped>

</style>
