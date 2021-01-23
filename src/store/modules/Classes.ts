import { Class } from '@/model/Class'
import { classesCollection } from '@/fb'
import createPersistedState from 'vuex-persistedstate'
import { User } from '@/model/User';

export default {
  namespaced: true,
  state: {
    classes: [] as Class[],
  },
  plugins: [createPersistedState()],
  getters: {
    classes (state: { classes: Class[]; }): Class[] {
      return state.classes
    },
  },
  mutations: {
    SET_CLASSES (state: { classes: Class[]; }, payload: Class[]): void {
      state.classes = payload
    },
  },
  actions: {
     fetchClasses (context: { commit: (arg0: string, arg1: Class[]) => void }, payload: User) {
       classesCollection.where('userList', 'array-contains', payload.id)
         .onSnapshot(snapshot => {
           const classes: Class[] = []
           snapshot.forEach(doc => {
             if (doc.exists) {
               const generatedClass = new Class(
                 doc.id,
                 doc.data().title,
                 doc.data().description,
                 doc.data().code,
                 doc.data().teacherName,
                 doc.data().imageSource,
                 doc.data().color
               )
               classes.push(generatedClass)
             }
           })

           context.commit('SET_CLASSES', classes)
         })
    },
  },
}
