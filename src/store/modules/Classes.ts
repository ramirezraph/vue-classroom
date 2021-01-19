import { Class } from '@/model/Class'
import db from '@/fb'

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
      db.collection('classes')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            if (doc.exists) {
              classes.push(<Class>doc.data())
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
