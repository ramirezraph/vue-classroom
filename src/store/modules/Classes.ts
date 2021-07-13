import { Class } from '@/model/Class'
import {classesCollection, lecturesCollection, usersCollection} from '@/fb'
import { User } from '@/model/User';
import {Meeting} from "@/model/Meeting";
import getFullName from '@/plugins/fullname';

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
    getAllMeetings (state): Meeting[] {
      return state.meetings
    },
  },
  mutations: {
    SET_CLASSES (state, payload: Class[]): void {
      state.classes = payload
    },
    FETCH_ALL_MEETINGS (state, payload: { meetings: Meeting[] }) {
      state.meetings = payload.meetings
    },
    CLEAR_CLASSES (state) {
      state.classes = []
    },
  },
  actions: {
      clearClasses ({ commit }) {
        console.log('clear classes');
        commit('CLEAR_CLASSES')
      },
      fetchClasses ({ commit, rootGetters, dispatch }, payload: User): void {
        if (payload) {

          const snapshot = rootGetters['snapshots/getClassesSnapshot']

          if (snapshot) {
            console.log('detaching classes')
            snapshot(); // detach a listener
          }

          const unsubscribe = classesCollection.where('userList', 'array-contains', payload.id)
            .onSnapshot(snapshot => {
              const classes: Class[] = []
              snapshot.forEach(doc => {
                if (doc.exists) {
                  usersCollection.doc(doc.data().ownerId).get().then(userDoc => {
                    if (userDoc.exists) {
                      const teacherName = getFullName(userDoc.data()?.firstName, userDoc.data()?.middleName, userDoc.data()?.lastName)

                      const generatedClass = new Class(
                        doc.id,
                        doc.data().title,
                        doc.data().description,
                        doc.data().code,
                        teacherName,
                        doc.data().imageSource,
                        doc.data().color,
                        doc.data().ownerId,
                        doc.data().inviteCode,
                      )
                      classes.push(generatedClass)
                    }
                  })
                }
              })
              console.log('snapshot runs for', payload.id);
              commit('SET_CLASSES', classes)
            })
            dispatch('snapshots/setClassesSnapshot', unsubscribe, { root: true })
        }
    },
    // All meetings
    fetchAllMeetings ({ commit, rootGetters, dispatch }, payload: { currentUser: User }) {
       if (payload) {

        const snapshot = rootGetters['snapshots/getAllMeetingsSnapshot']

        if (snapshot) {
          console.log('detaching all meetings snapshot')
          snapshot(); // detach a listener
        }

        // get all class ids
        const classIds: string[] = []

        classesCollection.where('userList', 'array-contains', payload.currentUser.id).get().then(snapshot => {
          snapshot.forEach(classDoc => {
            classIds.push(classDoc.id)
          })
        }).then(() => {

          console.log(classIds);


          if (classIds.length <= 0) return

          const unsubscribe = lecturesCollection
          .orderBy('date')
          .where('classId', 'in', classIds)
          .onSnapshot(snapshot => {
            const meetings: Meeting[] = []
            snapshot.forEach(meet => {
               if (meet.exists) {
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
                 generatedMeeting.isClosed = meet.data()?.isClosed,
                 meetings.push(generatedMeeting)
               }
            })
            commit('FETCH_ALL_MEETINGS', { meetings: meetings })
          })
         dispatch('snapshots/setAllMeetingsSnapshot', unsubscribe, { root: true })
        })
    }
  }
  },
}
