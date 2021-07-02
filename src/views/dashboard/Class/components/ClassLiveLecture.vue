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
          active-class="primary"
          value="today"
          class="px-6"
        >
          Today
        </v-chip>
        <v-chip
          filter
          active-class="primary"
          value="thisWeek"
          class="px-6"
        >
          This Week
        </v-chip>
        <v-chip
          filter
          active-class="primary"
          class="px-6"
          value="all"
        >
          All Meetings
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
        <p
          class="grey--text subtitle-1"
        >
          <span v-if="filterClassMeetings === 'today'">
            No meeting today.
          </span>
          <span v-else-if="filterClassMeetings === 'thisWeek'">
            No meeting this week.
          </span>
          <span v-else-if="filterClassMeetings === 'all'">
            No meeting found.
          </span>
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
