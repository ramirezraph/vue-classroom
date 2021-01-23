import Vue from 'vue'
import { Class } from '@/model/Class'
import ClassItem from '@/views/dashboard/Classes/components/ClassItem.vue'
import ClassHeader from './components/ClassHeader.vue'
import ClassDiscussions from './components/ClassDiscussions.vue'
import ClassClasswork from './components/ClassClasswork.vue'
import AccordionUnitItem from './components/AccordionUnitItem.vue'
import { Unit } from '@/model/Unit'
import { Post } from '@/model/Post'
import { classesCollection } from '@/fb'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
// eslint-disable-next-line camelcase
import { excluded, min_value, required } from 'vee-validate/dist/rules'

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
    AccordionUnitItem,
    ValidationProvider,
    ValidationObserver,
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
      unitNotification: false,
      unitNotificationType: 'success',
      unitNotificationMessage: '',

      units: [] as Unit[],
      discussions: [] as Post[],

      dbRef: classesCollection.doc(this.id),
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

    }
  },
  computed: {
    selectedClass (): Class {
      return this.$store.getters['classes/classes'].find((c: Class) => c.id === this.id)
    },
    unitNumberAlreadyExistsRule (): string {
      let unitNumbers = ''
      this.units.forEach(unit => {
        unitNumbers += unit.unitNumber + ','
      })
      unitNumbers = unitNumbers.substring(0, unitNumbers.length - 1)
      return `excluded:${unitNumbers}`
    },
  },
  created () {
    this.fetchUnits()
    this.fetchDiscussions()
  },
  methods: {
    fetchUnits (): void {
      this.unitDataLoading = true
      try {
        let fetchUnit: Unit[] = []
        this.dbRef.collection('units').orderBy('number')
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
          })
      } finally {
        this.unitDataLoading = false
      }
    },
    fetchDiscussions (): void {
      try {
        let fetchDiscussions: Post[] = []
        this.dbRef.collection('discussions')
          .onSnapshot(snapshot => {
            fetchDiscussions = []
            snapshot.forEach(doc => {
              if (doc.exists) {
                const post = new Post(
                  doc.id,
                  doc.data().userId,
                  doc.data().userName,
                  doc.data().time,
                  doc.data().message,
                )
                post.comments = doc.data().comments
                fetchDiscussions.push(post)
              }
            })
            this.discussions = fetchDiscussions
          })
      } finally {
        this.unitDataLoading = false
      }
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

        this.dbRef.collection('units').add(newUnit)
          .then(() => {
            this.unitNotificationType = 'success'
            this.unitNotificationMessage = 'Unit added successfully.'
            this.unitNotification = true
          })
          .catch(error => {
            this.unitNotificationType = 'error'
            this.unitNotificationMessage = 'Adding Unit failed: ' + error
            this.unitNotification = true
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
        this.dbRef.collection('units').doc(this.delete_unitId).delete()
          .then(() => {
            this.unitNotificationType = 'success'
            this.unitNotificationMessage = 'Unit deleted successfully.'
            this.unitNotification = true
          })
          .catch(error => {
            this.unitNotificationType = 'error'
            this.unitNotificationMessage = 'Deleting Unit failed: ' + error
            this.unitNotification = true
          })

        // reset
        this.delete_unitId = ''
        this.delete_unitNumber = -1
        this.delete_unitTitle = ''
      }
      this.dialogConfirmDeleteUnit = false
    },
  },
})
