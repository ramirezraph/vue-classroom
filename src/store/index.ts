import Vue from 'vue'
import Vuex from 'vuex'
import Classes from '@/store/modules/Classes'
import User from "@/store/modules/User";
import Class from '@/store/modules/Class';

import createPersistedState from 'vuex-persistedstate'
import Snapshots from './modules/Snapshots';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    classes: Classes,
    user: User,
    class: Class,
    snapshots: Snapshots,
  },
  state: {
    // barColor: 'rgba(47, 47, 43, .8), rgba(0, 0, 0, .8)',
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg',
    drawer: null,
  },
  plugins: [createPersistedState({
    paths: ['user']
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

export default store
