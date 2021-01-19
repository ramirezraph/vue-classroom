import { Class } from '@/model/Class'
import { db, classesCollection } from '@/fb'

export default {
  namespaced: true,
  state: {
    classes: [] as Class[],
  },
  getters: {
    classes (state: { classes: Class[]; }): Class[] {
      return state.classes
    },
  },
  mutations: {
    setClasses (state: { classes: Class[]; }, payload: Class[]): void {
      state.classes = payload
    },
  },
  actions: {
     fetchClasses (context: { commit: (arg0: string, arg1: Class[]) => void }) {
      const classes: Class[] = []
      classesCollection.get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
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
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })

      context.commit('setClasses', classes)
    },
  },
}
