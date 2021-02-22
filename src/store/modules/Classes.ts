import { Class } from '@/model/Class'
import { classesCollection } from '@/fb'
import { User } from '@/model/User';
import { Unit } from '@/model/Unit';
import { ClassFile, Lesson } from '@/model/Lesson';

export default {
  namespaced: true,
  state: {
    classes: [] as Class[],
  },
  getters: {
    classes (state): Class[] {
      return state.classes
    },
    getClass: (state) => (id) => {
      return state.classes.find(c => c.id === id)
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
    FETCH_LESSONS (state, payload: { classId: string, unitId: string, lessons: Lesson[] }): void {
      const classIndex = state.classes.findIndex(c => c.id === payload.classId)
      const unitIndex = state.classes[classIndex].units.findIndex((u: Unit) => u.id === payload.unitId)
      state.classes[classIndex].units[unitIndex].lessons = payload.lessons
    },
    FETCH_FILES (state, payload: { classId: string, unitId: string, lessonId: string, files: ClassFile[] }): void {
      const classIndex = state.classes.findIndex((c: Class) => c.id === payload.classId)
      const unitIndex = state.classes[classIndex].units.findIndex((u: Unit) => u.id === payload.unitId)
      const lessonIndex = state.classes[classIndex].units[unitIndex].lessons.findIndex((l: Lesson) => l.id === payload.lessonId)
      state.classes[classIndex].units[unitIndex].lessons[lessonIndex].files = payload.files
    },
  },
  actions: {
     fetchClasses (context, payload: User): void {
       if (payload) {
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
       }
    },
    fetchUnits (context, payload: { class: Class, units: Unit[] }): void {
      if (payload) {
        context.commit('FETCH_UNITS', payload)
      }
    },
    fetchLessons (context, payload: { classId: string, unitId: string, lessons: Lesson[] }): void {
      if (payload) {
        context.commit('FETCH_LESSONS', payload)
      }
    },
    fetchFiles (context, payload: { classId: string, unitId: string, lessonId: string, files: ClassFile[] }): void {
      if (payload) {
        context.commit('FETCH_FILES', payload)
      }
    },
  },
}
