// eslint-disable-next-line @typescript-eslint/ban-ts-comment

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
        color: 'green lighten-1',
      },
      {
        id: '2',
        title: 'Logic Circuit and Design',
        description: 'Lorem ipsum donor alter ale',
        code: 'CPE 302',
        teacherName: 'Alicia D. Clayton',
        color: 'green lighten-1',
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
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    classes (state: { classes: unknown; }) {
      return state.classes
    },
  },
  mutations: {},
  actions: {},
}
