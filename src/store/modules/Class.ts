import { Class } from "@/model/Class";

export default {
  namespaced: true,
  state: {
    activeClass: {} as Class,
  },
  getters: {
    getActiveClass(state): Class {
      return state.activeClass
    }
  },
  mutations: {
    SET_ACTIVE_CLASS (state, payload: { newActiveClass: Class }) {
      state.activeClass = payload.newActiveClass
    }
  },
  actions: {
    setActiveClass({ commit, rootGetters }, payload: { classId: String }) {
      if (payload.classId) {
        const selectedClass = rootGetters['classes/classes'].find((c: Class) => c.id === payload.classId)

        commit('SET_ACTIVE_CLASS', { newActiveClass: selectedClass })
      }
    }
  },
}
