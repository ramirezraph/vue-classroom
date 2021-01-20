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
      showHideAddUnit: false,
      unitDataLoading: false,

      units: [] as Unit[],
      discussions: [] as Post[],

      dbRef: classesCollection.doc(this.id),
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
  mounted () {
    this.units = this.fetchUnits()
    this.discussions = this.fetchDiscussions()
  },
  methods: {
     fetchUnits (): Unit[] {
       this.unitDataLoading = true
      const fetchUnit: Unit[] = []
      this.dbRef.collection('units').orderBy('number')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (doc.exists) {
              const unit = new Unit(
                doc.id,
                doc.data().number,
                doc.data().title,
                doc.data().shortDescription,
                doc.data().isLive,
              )
              fetchUnit.push(unit)
            }
          })
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        }).finally(() => {
          this.unitDataLoading = false
      })
       return fetchUnit
     },
    fetchDiscussions (): Post[] {
      const fetchDiscussions: Post[] = []
      this.dbRef.collection('discussions')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
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
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
      return fetchDiscussions
    },
    toggleAddNewUnit (): void {
       // NOTE: confirm first
       this.showHideAddUnit = !this.showHideAddUnit
    },
  },
})
