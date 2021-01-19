import Vue from 'vue'
import { Class } from '@/model/Class'
import ClassItem from '@/views/dashboard/Classes/components/ClassItem.vue'
import ClassHeader from './components/ClassHeader.vue'
import ClassDiscussions from './components/ClassDiscussions.vue'
import ClassClasswork from './components/ClassClasswork.vue'
import AccordionUnitItem from './components/AccordionUnitItem.vue'
import { Unit } from '@/model/Unit'
import { Post } from '@/model/Post'
import db from '@/fb'

export default Vue.extend({
  name: 'Class',
  components: {
    ClassItem,
    ClassHeader,
    ClassDiscussions,
    ClassClasswork,
    AccordionUnitItem,
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
      units: [] as Unit[],
      discussions: [] as Post[],
  }
  },
  computed: {
    selectedClass (): Class {
      return this.$store.getters['classes/classes'].find((c: Class) => c.id === this.id)
    },
    discussionsList (): Post[] {
      return this.discussions
    },
    unitsList (): Unit[] {
      return this.units
    },
  },
  created () {
    this.units = this.fetchUnits()
    this.discussions = this.fetchDiscussions()
  },
  methods: {
    fetchUnits (): Unit[] {
      const fetchUnit: Unit[] = []
      db.collection('classes').doc(this.id).collection('units')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            if (doc.exists) {
              fetchUnit.push(<Unit>doc.data())
            }
          })
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
      return fetchUnit
    },
    fetchDiscussions (): Post[] {
      const fetchDiscussions: Post[] = []
      db.collection('classes').doc(this.id).collection('discussions')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            if (doc.exists) {
              fetchDiscussions.push(<Post>doc.data())
            }
          })
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
      return fetchDiscussions
    },
  },
})
