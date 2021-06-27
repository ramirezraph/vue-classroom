import { Class } from '@/model/Class'
import {classesCollection, lecturesCollection} from '@/fb'
import { User } from '@/model/User';
import { Unit } from '@/model/Unit';
import { ClassFile, Lesson } from '@/model/Lesson';
import {Meeting} from "@/model/Meeting";

export default {
  namespaced: true,
  state: {
    classes: [] as Class[],
    meetings: [] as Meeting[],
  },
  getters: {
    classes (state): Class[] {
      return state.classes
    },
    getClass: (state) => (id) => {
      return state.classes.find(c => c.id === id)
    },
    meetings (state): Meeting[] {
      return state.meetings
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
    FETCH_MEETINGS (state, payload: { meetings: Meeting[] }) {
      state.meetings = payload.meetings
    }
  },
  actions: {
     fetchClasses ({ commit }, payload: User): void {
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
                   doc.data().inviteCode,
                 )
                 classes.push(generatedClass)
               }
             })

             commit('SET_CLASSES', classes)
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
    fetchMeetings ({ commit, state }, payload: { currentUser: User }) {
       if (payload) {
         lecturesCollection.orderBy('date').onSnapshot(snapshot => {
           const meetings: Meeting[] = []
           snapshot.forEach(meet => {
             state.classes.forEach(c => {
               if (meet.data().classId === c.id) {
                 const generatedMeeting = new Meeting(
                   meet.id,
                   meet.data()?.teacherId,
                   meet.data()?.classId,
                   meet.data()?.title,
                   meet.data()?.description,
                   meet.data()?.date,
                   meet.data()?.timeEnd,
                   meet.data()?.timeStart,
                   meet.data()?.link,
                   meet.data()?.dateCreated,
                 )
                 meetings.push(generatedMeeting)
               }
             })
           })

           commit('FETCH_MEETINGS', { meetings: meetings })
         })
       }
    }
  },
}
