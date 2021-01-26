import Vue from 'vue'
import Vuex from 'vuex'
import Classes from '@/store/modules/Classes'
import createPersistedState from 'vuex-persistedstate'
import User from "@/store/modules/User";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    classes: Classes,
    user: User
  },
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg',
    drawer: null,
  },
  plugins: [createPersistedState({
    paths: ['classes', 'user']
  })],
  getters: {
    drawer (state) {
      return state.drawer
    },
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SET_SCRIM (state, payload) {
      state.barColor = payload
    },
  },
  actions: {},
})
