import { fileCommentsCollection, usersCollection } from "@/fb";
import { Class } from "@/model/Class";
import { ClassFile } from "@/model/Lesson";
import getFullName from "@/plugins/fullname"

export default {
  namespaced: true,
  state: {
    activeClass: {} as Class,
    activeFile: {
      lessonId: String,
      file: ClassFile
    },
    fileCommentSnapshotUnsubscribe: null,

  },
  getters: {
    getActiveClass(state): Class {
      return state.activeClass
    },
    getActiveFile(state): { lessonId: String, file: ClassFile } {
      return state.activeFile
    },
    getCommentSnapshot(state) {
      return state.fileCommentSnapshotUnsubscribe
    }
  },
  mutations: {
    SET_ACTIVE_CLASS (state, payload: { newActiveClass: Class }) {
      state.activeClass = payload.newActiveClass
    },
    SET_ACTIVE_FILE (state, payload: { lessonId: String, file: ClassFile }) {
      state.activeFile = payload
    },
    SET_COMMENT_SNAPSHOT (state, payload) {
      state.fileCommentSnapshotUnsubscribe = payload
    }
  },
  actions: {
    setActiveClass({ commit, rootGetters }, payload: { classId: String }) {
      if (payload.classId) {
        const selectedClass = rootGetters['classes/classes'].find((c: Class) => c.id === payload.classId)

        commit('SET_ACTIVE_CLASS', { newActiveClass: selectedClass })
      }
    },
    setActiveFile({ commit, getters }, payload: { lessonId: String, file: ClassFile }) {

      // fetch comments
      let comments: { avatar: string, title: string, subtitle: string }[] = []

      const snapshot = getters['fileCommentSnapshotUnsubscribe']

      if (snapshot) {
        snapshot() // detach a listener
      }

      const unsubscribe = fileCommentsCollection.doc(payload.file.id)
      .collection('comments')
      .orderBy('time')
      .onSnapshot(commentSnapshot => {
        comments = []
        commentSnapshot.forEach(comment => {
          usersCollection.doc(comment.data()?.userId).get().then(user => {
            comments.push({
              avatar: user.data()?.imgProfile,
              title: getFullName(user.data()?.firstName, user.data()?.middleName, user.data()?.lastName),
              subtitle: comment.data()?.message,
            })
          })
        })
        payload.file.comments = comments
      })

      commit('SET_COMMENT_SNAPSHOT', unsubscribe)
      commit('SET_ACTIVE_FILE', { lessonId: payload.lessonId, file: payload.file })
    },
  },
}
