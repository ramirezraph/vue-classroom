// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import { Class } from '@/model/Class'

export default {
  namespaced: true,
  state: {
    classes: [
      {
        id: '1',
        title: 'Software Design',
        description: 'Lorem ipsum donor alter ale',
        code: 'CPE 301',
        teacherName: 'Marjorie R. Stahl',
        imageSource: 'https://blog.planview.com/wp-content/uploads/2020/01/Top-6-Software-Development-Methodologies.jpg',
        units: [
          {
            unitNumber: 0,
            title: 'Introduction / Orientation',
            shortDescription: 'Lorem ipsum dolor sit amet.',
            isLive: false,
            lessons: [
              {
                title: 'Discussion of Vision, Mission, etc.',
                shortDescription: 'Lorem ipsum dolor sit amet. inter description.',
              },
              {
                title: 'Brief History',
                shortDescription: 'Lorem ipsum dolor sit amet. inter description.',
              },
              {
                title: 'Course Syllabus & Policy',
                shortDescription: 'Lorem ipsum dolor sit amet. inter description.',
              },
            ],
          },
          {
            unitNumber: 1,
            title: 'Introduction to Software Design',
            shortDescription: 'Lorem ipsum dolor sit amet.',
            isLive: false,
            lessons: [
              {
                title: 'History and Overview',
                shortDescription: 'Lorem ipsum dolor sit amet. inter description.',
              },
              {
                title: 'Software Design / Engineering Concept',
                shortDescription: 'Lorem ipsum dolor sit amet. inter description.',
              },
            ],
          },
        ],
        discussions: [
          {
            id: 1,
            name: 'John Doe',
            time: '9:23 PM',
            message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis ad quas possimus fugiat veniam consectetur reprehenderit cum quos mollitia tempora?',
            comments: [],
          },
          {
            id: 2,
            name: 'John Doe',
            time: '9:02 PM',
            message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis ad quas possimus fugiat veniam consecter.',
            comments: [],
          },
          {
            id: 3,
            name: 'John Doe',
            time: '9:02 PM',
            message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis ad quas possimus fugiat veniam consecter.',
            comments: [],
          },
          {
            id: 4,
            name: 'John Doe',
            time: '9:02 PM',
            message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis ad quas possimus fugiat veniam consecter.',
            comments: [],
          },
          {
            id: 5,
            name: 'John Doe',
            time: '9:02 PM',
            message: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis ad quas possimus fugiat veniam consecter.',
            comments: [],
          },
        ],
      },
      {
        id: '2',
        title: 'Logic Circuit and Design',
        description: 'Lorem ipsum donor alter ale',
        code: 'CPE 302',
        teacherName: 'Alicia D. Clayton',
        color: 'green lighten-2',
      },
      {
        id: '3',
        title: 'Feedback and Control System',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, ut!',
        code: 'CPE 305',
        teacherName: 'David E. Roberts',
        color: 'blue lighten-2',
      },
      {
        id: '4',
        title: 'Operating System',
        description: 'Lorem ipsum donor alter ale',
        code: 'CPE 303',
        teacherName: 'Donald K. Hanna',
        imageSource: 'https://www.ionos.co.uk/digitalguide/fileadmin/DigitalGuide/Teaser/operating-system-t.jpg',
        color: 'blue lighten-1',
      },
      {
        id: '5',
        title: 'Fundamentals of Mixed Signals and Sensors',
        description: 'Lorem ipsum donor alter ale',
        code: 'CPE 303',
        teacherName: 'Donald K. Hanna',
        color: 'red lighten-2',
      },
    ],
  },
  getters: {
    classes (state: { classes: Class[]; }): Class[] {
      return state.classes
    },
  },
  mutations: {},
  actions: {},
}
