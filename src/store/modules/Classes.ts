import { Class } from '@/model/Class'
import { classesCollection } from '@/fb'
import { User } from '@/model/User';

export default {
  namespaced: true,
  state: {
    classes: [] as Class[],
  },
  getters: {
    classes (state): Class[] {
      return state.classes
    },
  },
  mutations: {
    SET_CLASSES (state, payload: Class[]): void {
      state.classes = payload
    },
    ADD_CLASSES (state, payload: Class): void {
      state.classes.push(payload)
    }
  },
  actions: {
     fetchClasses (context, payload: User) {
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
                 doc.data().color,
                 doc.data().ownerId,
               )
               classes.push(generatedClass)
             }
           })

           context.commit('SET_CLASSES', classes)
         })
    },
  },
}
