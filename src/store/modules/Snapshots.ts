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
  },
  actions: {
    setClassesSnapshot ({ commit }, payload) {
      console.log('set classes snapshot');
      commit('SET_CLASSES_SNAPSHOT', payload)
    },
    setPeopleSnapshot ({ commit }, payload) {
      console.log('set people snapshot');
      commit('SET_PEOPLE_SNAPSHOT', payload)
    }
  },
}
