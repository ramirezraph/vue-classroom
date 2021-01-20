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
import { excluded, required } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('excluded', {
  ...excluded,
  message: '{_field_} already in used.',
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
      dialogConfirm: false,

      units: [] as Unit[],
      discussions: [] as Post[],

      dbRef: classesCollection.doc(this.id),

      // Add Unit
      unitNumber: null,
      unitTitle: '',
      unitShortDescription: '',
      unitIsLive: false,
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
      this.unitNumber = null
      this.unitTitle = ''
      this.unitShortDescription = ''
      this.unitIsLive = false
      this.showHideAddUnit = !this.showHideAddUnit
    },
    submitAddUnitForm (): void {
      const newUnit = {
        number: this.unitNumber,
        title: this.unitTitle,
        shortDescription: this.unitShortDescription,
        isLive: this.unitIsLive,
      }

      this.dbRef.collection('units').add(newUnit)
        .then(() => {
          this.unitNotificationType = 'success'
          this.unitNotificationMessage = 'Unit added successfully.'
          this.unitNotification = true
        })
        .catch(error => {
          this.unitNotificationType = 'error'
          this.unitNotificationMessage = 'Unit added failed: ' + error
          this.unitNotification = true
        })

      this.dialogConfirm = false
      this.toggleAddNewUnit()
    },
  },
})
