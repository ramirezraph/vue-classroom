import Vue from 'vue'

export default Vue.extend({
  name: 'Dashboard',
  components: {
    DashboardStats: () => import('./components/DashboardStats.vue'),
    DashboardTodos: () => import('./components/DashboardTodos.vue'),
    DashboardAnnouncements: () => import('./components/DashboardAnnouncements.vue'),
    DashboardClassMeetings: () => import('./components/DashboardClassMeetings.vue'),
    DashboardClassList: () => import('./components/DashboardClassList.vue'),
  },
  data () {
    return {}
  },
})
