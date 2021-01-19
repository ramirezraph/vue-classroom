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

      dbRef: classesCollection.doc(this.id),
  }
  },
  computed: {
    selectedClass (): Class {
      const test = this.$store.getters['classes/classes'].find((c: Class) => c.id === this.id)
      console.log(test)
      return test
    },
    discussionsList (): Post[] {
      return this.discussions
    },
    unitsList (): Unit[] {
      return this.units
    },
  },
  mounted () {
    this.units = this.fetchUnits()
    this.discussions = this.fetchDiscussions()
  },
  methods: {
     fetchUnits (): Unit[] {
      const fetchUnit: Unit[] = []
      this.dbRef.collection('units')
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
      this.dbRef.collection('discussions')
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
