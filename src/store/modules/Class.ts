import { fileCommentsCollection, usersCollection } from "@/fb";
import { Class } from "@/model/Class";
import { ClassFile } from "@/model/Lesson";
import { Comment } from "@/model/Post";
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

      const snapshot = getters['fileCommentSnapshotUnsubscribe']

      if (snapshot) {
        snapshot() // detach a listener
      }

      let fetchComm: Comment[] = []
      const unsubscribe = fileCommentsCollection.doc(payload.file.id)
          .collection('comments')
          .orderBy('time', 'asc')
          .onSnapshot(querySnapshot => {
            fetchComm = []
            querySnapshot.forEach(commentItem => {
              if (commentItem.exists) {
                const comment = new Comment(
                  commentItem.id,
                  commentItem.data()?.userId,
                  commentItem.data()?.time,
                  commentItem.data()?.message,
                )
                fetchComm.push(comment)
              }
            })
             payload.file.comments = fetchComm
          })

      commit('SET_COMMENT_SNAPSHOT', unsubscribe)
      commit('SET_ACTIVE_FILE', { lessonId: payload.lessonId, file: payload.file })
    },
  },
}
