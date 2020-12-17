<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <announcement />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Announcement from './components/core/Announcement.vue'
  export default {
    name: 'DashboardDashboard',
    components: { Announcement },

    data () {
      return {
        tab: 0,
        tabs: [
          'School',
          'Classes',
          'Department',
        ],
        announce: [
          { topic: 'Parent Teacher Meet', notes: 'Calling the attention of parent and teachers', date: '13 Dec' },
          { topic: 'Changes in School Calendar', notes: 'Lorem ipsum dolmet consectetur.', date: '11 Nov' },
          { topic: 'Announcement to Freshmen Students', notes: 'Lorem ipsum dolor.', date: '3 Jan' },
          { topic: 'Development Webinars for Faculty', notes: 'Lorem ipsum dolmet consectetur.', date: '2 Jan' },
        ],
      }
    },
  }
</script>
