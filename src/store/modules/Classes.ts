import { Class } from '@/model/Class'
import { classesCollection } from '@/fb'
import { User } from '@/model/User';
import { Unit } from '@/model/Unit';
import { Lesson } from '@/model/Lesson';

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
    FETCH_UNITS (state, payload: { class: Class, units: Unit[] }): void {
      const classIndex = state.classes.findIndex((c: Class) => c.id === payload.class.id)
      state.classes[classIndex].units = payload.units
    },
    FETCH_LESSONS (state, payload: { unit: Unit, lessons: Lesson[] }): void {
      const classIndex = state.classes.findIndex((c: Class) => c.units?.includes(payload.unit))
      const unitIndex = state.classes[classIndex].units.findIndex((u: Unit) => u.id === payload.unit.id)
      state.classes[classIndex].units[unitIndex].lessons = payload.lessons
    },
    ADD_CLASSES (state, payload: Class): void {
      state.classes.push(payload)
    },
  },
  actions: {
     fetchClasses (context, payload: User): void {
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
    fetchUnits (context, payload: { class: Class, units: Unit[] }): void {
      if (payload) {
        context.commit('FETCH_UNITS', payload)
      }
    },
    fetchLessons (context, payload: { unit: Unit, lessons: Lesson[] }): void {
      if (payload) {
        context.commit('FETCH_LESSONS', payload)
      }
    },
  },
}
