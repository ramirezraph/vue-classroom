import { Class } from '@/model/Class'
import {classesCollection, lecturesCollection} from '@/fb'
import { User } from '@/model/User';
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
