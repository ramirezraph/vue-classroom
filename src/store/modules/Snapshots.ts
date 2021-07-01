import { fileCommentsCollection } from "@/fb";

export default {
  namespaced: true,
  state: {
    peopleSnapshot: null,
    classesSnapshot: null,
    unitsSnapshot: null,
    lessonsSnapshot: null,
    discussionsSnapshot: null,
    meetingsSnapshot: null,

    fileCommentSnapshot: null,

    pushNotificationSnapshot: null,
  },
  getters: {
    getPeopleSnapshot (state) {
      return state.peopleSnapshot
    },
    getClassesSnapshot (state) {
      return state.classesSnapshot
    },
    getUnitsSnapshot (state) {
      return state.unitsSnapshot
    },
    getLessonSnapshot (state) {
      return state.lessonsSnapshot
    },
    getDiscussionsSnapshot (state) {
      return state.discussionsSnapshot
    },
    getMeetingsSnapshot (state) {
      return state.meetingsSnapshot
    },
    getFileCommentSnapshot(state) {
      return state.fileCommentSnapshot
    },
    getPushNotificationSnapshot(state) {
      return state.pushNotificationSnapshot
    },
  },
  mutations: {
    SET_PEOPLE_SNAPSHOT (state, payload) {
      state.peopleSnapshot = payload
    },
    SET_CLASSES_SNAPSHOT (state, payload) {
      state.classesSnapshot = payload
    },
    SET_UNITS_SNAPSHOT (state, payload) {
      state.unitsSnapshot = payload
    },
    SET_LESSONS_SNAPSHOT (state, payload) {
      state.lessonsSnapshot = payload
    },
    SET_DISCUSSIONS_SNAPSHOT (state, payload) {
      state.discussionsSnapshot = payload
    },
    SET_MEETINGS_SNAPSHOT (state, payload) {
      state.meetingsSnapshot = payload
    },
    SET_COMMENT_SNAPSHOT (state, payload) {
      state.fileCommentSnapshot = payload
    },
    SET_PUSH_NOTIFICATION_SNAPSHOT (state, payload) {
      state.pushNotificationSnapshot = payload
    },
  },
  actions: {
    setClassesSnapshot ({ commit }, payload) {
      console.log('set classes snapshot');
      commit('SET_CLASSES_SNAPSHOT', payload)
    },
    setPeopleSnapshot ({ commit }, payload) {
      console.log('set people snapshot');
      commit('SET_PEOPLE_SNAPSHOT', payload)
    },
    setUnitsSnapshot ({ commit }, payload) {
      console.log('set units snapshot');
      commit('SET_UNITS_SNAPSHOT', payload)
    },
    setLessonsSnapshot ({ commit }, payload) {
      console.log('set lessons snapshot');
      commit('SET_LESSONS_SNAPSHOT', payload)
    },
    setDiscussionsSnapshot ({ commit }, payload) {
      console.log('set discussions snapshot');
      commit('SET_DISCUSSIONS_SNAPSHOT', payload)
    },
    setMeetingsSnapshot ({ commit }, payload) {
      console.log('set meetings snapshot');
      commit('SET_MEETINGS_SNAPSHOT', payload)
    },
    setFileCommentSnapshot ({ commit }, payload) {
      console.log('set file comment snapshot');
      commit('SET_COMMENT_SNAPSHOT', payload)
    },
    setPushNotificationSnapshot({ commit }, payload) {
      console.log('set push notif snapshot');
      commit('SET_PUSH_NOTIFICATION_SNAPSHOT', payload)
    },
  },
}
