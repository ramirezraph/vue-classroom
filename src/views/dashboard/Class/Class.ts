import Vue from 'vue'
import { Class } from '@/model/Class'
import ClassItem from '@/views/dashboard/Classes/components/ClassItem.vue'
import ClassHeader from './components/ClassHeader.vue'
import ClassDiscussions from './components/ClassDiscussions.vue'
import ClassPeople from './components/ClassPeople.vue'
import ClassClasswork from './components/ClassClasswork.vue'
import ClassLiveLecture from './components/ClassLiveLecture.vue'
import AccordionUnitItem from './components/AccordionUnitItem.vue'
import { Unit } from '@/model/Unit'
import { Post } from '@/model/Post'
import { classesCollection, lecturesCollection, usersCollection } from '@/fb'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
// eslint-disable-next-line camelcase
import { excluded, min_value, required } from 'vee-validate/dist/rules'
import firebase from 'firebase'
import { User, UserType } from '@/model/User'
import ViewContent from './components/ViewContent.vue'
import { ClassFile } from '@/model/Lesson'
import CreateClassDialog from '@/views/dashboard/Classes/components/CreateClassDialog.vue'
import { Meeting } from '@/model/Meeting'
import DocumentReference = firebase.firestore.DocumentReference;

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('excluded', {
  ...excluded,
  message: '{_field_} already in used.',
})

extend('min_value', {
  // eslint-disable-next-line camelcase
  ...min_value,
  message: '{_field_} cannot be a negative',
})

export default Vue.extend({
  name: 'Class',
  components: {
    ClassItem,
    ClassHeader,
    ClassDiscussions,
    ClassClasswork,
    ClassPeople,
    ClassLiveLecture,
    AccordionUnitItem,
    ValidationProvider,
    ValidationObserver,
    ViewContent,
    CreateClassDialog,
  },
  props: {
    id: { // from router params
      type: String,
      required: true,
    },
  },
  data () {
    return {
      tabs: null,
      showHideAddUnit: false,
      unitDataLoading: false,

      units: [] as Unit[],
      discussions: [] as Post[],
      people: [] as User[],
      meetings: [] as Meeting[],

      // Add Unit
      dialogConfirmAddUnit: false,
      add_unitNumber: null,
      add_unitTitle: '',
      add_unitShortDescription: '',
      add_unitIsLive: false,

      // Delete Unit
      dialogConfirmDeleteUnit: false,
      delete_unitId: '',
      delete_unitNumber: -1,
      delete_unitTitle: '',

      dbRef: {} as DocumentReference,

      dialogViewContent: false,

      numberOfPostLimit: 3,

      dialogEditClass: false,
      destroyClassDialog: false,
      selectedClassTeacher: {} as User,
    }
  },
  computed: {
    selectedClass (): Class {
      return this.$store.getters['class/getActiveClass']
    },
    selectedClassOwner (): User {
      return this.getSelectedClassOwner(this.selectedClass.ownerId)
    },
    unitNumberAlreadyExistsRule (): string {
      let unitNumbers = ''
      this.units.forEach(unit => {
        unitNumbers += unit.unitNumber + ','
      })
      unitNumbers = unitNumbers.substring(0, unitNumbers.length - 1)
      return `excluded:${unitNumbers}`
    },
    computed_dbRef (): DocumentReference {
      return this.dbRef
    },
    currentUser (): User {
      return this.$store.getters['user/getCurrentUser']
    },
    isClassOwner (): boolean {
      return this.currentUser.id === this.selectedClass.ownerId
    },
    hasEditAccess (): boolean {
      let hasAccess = false

      if (this.isClassOwner) {
        hasAccess = true
      } else {
        const foundUser = this.people.find(p => p.id === this.currentUser.id)
        if (foundUser) {
          if (foundUser.userType === UserType.Teacher) {
            hasAccess = true
          }
        }
      }

      return hasAccess
    },
  },
  watch: {
    '$route' (to) {
      // updates active class
      this.$store.dispatch('class/setActiveClass', { classId: to.params.id })

      this.dbRef = classesCollection.doc(this.id)
      this.fetchUnits().then(() => {
        console.log('fetch unit success on watch')
      }).catch(error => {
        console.log('Fetch Unit Failed on Watch: ' + error)
      })
      this.fetchDiscussions().then(() => {
        console.log('fetch Discussion success on watch')
      }).catch(error => {
        console.log('Fetch Discussion Failed on Watch: ' + error)
      })
      this.fetchPeople().then(() => {
        console.log('fetch People success on watch')
      }).catch(error => {
        console.log('Fetch People Failed on Watch: ' + error)
      })
      this.fetchLectures().then(() => {
        console.log('fetch Lecture success on watch')
      }).catch(error => {
        console.log('Fetch Lecture Failed on Watch: ' + error)
      })
    },
  },
  mounted () {
    this.dbRef = classesCollection.doc(this.id)

    this.fetchUnits().then(() => {
      console.log('fetch Unit success on Mounted')
    }).catch(error => {
      console.log('Fetch Unit Failed on Mounted: ' + error)
    })
    this.fetchDiscussions().then(() => {
      console.log('fetch Discussion success on Mounted')
    }).catch(error => {
      console.log('Fetch Discussion Failed on Mounted: ' + error)
    })
    this.fetchPeople().then(() => {
      console.log('fetch People success on Mounted')
    }).catch(error => {
      console.log('Fetch People Failed on Mounted: ' + error)
    })
    this.fetchLectures().then(() => {
      console.log('fetch Lecture success on Mounted')
    }).catch(error => {
      console.log('Fetch Lecture Failed on Mounted: ' + error)
    })
  },
  methods: {
    async fetchUnits () {
      this.unitDataLoading = true
      try {
        let fetchUnit: Unit[] = []
        await classesCollection.doc(this.id).collection('units').orderBy('number')
          .onSnapshot(snapshot => {
            fetchUnit = []
            snapshot.forEach(doc => {
              const unit = new Unit(
                doc.id,
                doc.data().number,
                doc.data().title,
                doc.data().shortDescription,
                doc.data().isLive,
              )
              fetchUnit.push(unit)
            })
            this.units = fetchUnit
            this.$store.dispatch('classes/fetchUnits', { class: this.selectedClass, units: fetchUnit })
          })
      } finally {
        this.unitDataLoading = false
      }
    },
    async fetchDiscussions () {
      try {
        let fetchDiscussions: Post[] = []

        // paginate
        await classesCollection.doc(this.id).collection('discussions')
          .orderBy('time', 'desc')
          .limit(this.numberOfPostLimit).onSnapshot(snapshot => {
            fetchDiscussions = []
            snapshot.forEach(doc => {
              if (doc.exists) {
                const post = new Post(
                  doc.id,
                  doc.data().userId,
                  doc.data().time,
                  doc.data().message,
                )
                post.numberOfComments = doc.data().numberOfComments

                fetchDiscussions.push(post)
              }
            })
            this.discussions = fetchDiscussions
          })
      } finally {
        this.unitDataLoading = false
      }
    },
    async fetchPeople () {
      try {
        let fetchPeople: User[] = []
        await classesCollection.doc(this.id).collection('people')
          .onSnapshot(snapshot => {
            fetchPeople = []
            snapshot.forEach(doc => {
              if (doc.exists) {
                let people: User
                usersCollection.doc(doc.id).get().then(user => {
                  if (user.exists) {
                    people = new User(
                      doc.id,
                      user.data()?.firstName,
                      user.data()?.middleName,
                      user.data()?.lastName,
                      user.data()?.birthdate,
                      user.data()?.email,
                      user.data()?.imgProfile,
                    )

                    people.userType = doc.data().type
                    fetchPeople.push(people)
                  }
                })
              }
            })
            this.people = fetchPeople
          })
      } finally {
        this.unitDataLoading = false
      }
    },
    async fetchLectures () {
      await lecturesCollection.where('classId', '==', this.selectedClass.id)
        .onSnapshot(snapshot => {
          const lectures: Meeting[] = []
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
              generatedMeeting.isClosed = meet.data()?.isClosed

              lectures.push(generatedMeeting)
            }
          })
          this.meetings = lectures
        })
    },
    toggleAddNewUnit (): void {
      // NOTE: confirm first
      this.add_unitNumber = null
      this.add_unitTitle = ''
      this.add_unitShortDescription = ''
      this.add_unitIsLive = false
      this.showHideAddUnit = !this.showHideAddUnit
    },
    submitAddUnitForm (dialogResponse: boolean): void {
      if (dialogResponse) {
        const newUnit = {
          number: this.add_unitNumber,
          title: this.add_unitTitle,
          shortDescription: this.add_unitShortDescription,
          isLive: this.add_unitIsLive,
        }

        classesCollection.doc(this.id).collection('units').add(newUnit)
          .then(() => {
            this.$notify({
              group: 'appWideNotification',
              title: 'Success',
              text: 'Unit added successfully.',
              type: 'success',
            })
          })
          .catch(error => {
            this.$notify({
              group: 'appWideNotification',
              title: 'Failed',
              text: error.message,
              type: 'error',
            })
          })
        this.toggleAddNewUnit()
      }
      this.dialogConfirmAddUnit = false
    },
    removeUnit (unit: Unit): void {
      this.delete_unitId = unit.id
      this.delete_unitNumber = unit.unitNumber
      this.delete_unitTitle = unit.title
      this.dialogConfirmDeleteUnit = true
    },
    confirmRemoveUnit (response: boolean): void {
      if (response) {
        classesCollection.doc(this.id).collection('units').doc(this.delete_unitId).delete()
          .then(() => {
            this.$notify({
              group: 'appWideNotification',
              title: 'Success',
              text: 'Unit deleted successfully.',
              type: 'success',
            })
          })
          .catch(error => {
            this.$notify({
              group: 'appWideNotification',
              title: 'Failed',
              text: error.message,
              type: 'error',
            })
          })

        // reset
        this.delete_unitId = ''
        this.delete_unitNumber = -1
        this.delete_unitTitle = ''
      }
      this.dialogConfirmDeleteUnit = false
    },
    fileClicked ({ file, lessonId }): void {
      console.log('selected file lesson id', lessonId)
      console.log('selected file', file)

      this.$store.dispatch('class/setActiveFile', { lessonId: lessonId, file: file })

      this.dialogViewContent = true
    },
    showMorePosts (): void {
      this.numberOfPostLimit += 3
      this.fetchDiscussions()
    },
  editClass (): void {
      this.dialogEditClass = true
      this.destroyClassDialog = false
    },
    closeEditClass (): void {
      this.dialogEditClass = false

      setTimeout(() => {
        this.destroyClassDialog = true
      }, 1000)
    },
    getSelectedClassOwner (ownerId: string): User {
      const index = this.people.findIndex(user => user.id === ownerId)
      return this.people[index]
    },
  },
})
