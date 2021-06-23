import { Class } from "@/model/Class";
import { ClassFile } from "@/model/Lesson";

export default {
  namespaced: true,
  state: {
    activeClass: {} as Class,
    activeFile: {
      lessonId: String,
      file: ClassFile
    },
  },
  getters: {
    getActiveClass(state): Class {
      return state.activeClass
    },
    getActiveFile(state): { lessonId: String, file: ClassFile } {
      return state.activeFile
    }
  },
  mutations: {
    SET_ACTIVE_CLASS (state, payload: { newActiveClass: Class }) {
      state.activeClass = payload.newActiveClass
    },
    SET_ACTIVE_FILE (state, payload: { lessonId: String, file: ClassFile }) {
      state.activeFile = payload
    }
  },
  actions: {
    setActiveClass({ commit, rootGetters }, payload: { classId: String }) {
      if (payload.classId) {
        const selectedClass = rootGetters['classes/classes'].find((c: Class) => c.id === payload.classId)

        commit('SET_ACTIVE_CLASS', { newActiveClass: selectedClass })
      }
    },
    setActiveFile({ commit }, payload: { lessonId: String, file: ClassFile }) {
      commit('SET_ACTIVE_FILE', { lessonId: payload.lessonId, file: payload.file })
    }

  },
}
