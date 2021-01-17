import Vue from 'vue'
import { Class } from '@/model/Class'
import ClassItem from '@/views/dashboard/Classes/components/ClassItem.vue'
import ClassHeader from './components/ClassHeader.vue'
import ClassDiscussions from './components/ClassDiscussions.vue'
import ClassClasswork from './components/ClassClasswork.vue'
import AccordionUnitItem from './components/AccordionUnitItem.vue'
import { Unit } from '@/model/Unit'

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
    }
  },
  computed: {
    selectedClass (): Class {
      return this.$store.getters['classes/classes'].find((c: Class) => c.id === this.id)
    },
    units (): Unit[] {
      return this.selectedClass.units || []
    },
  },
  methods: {},
})
