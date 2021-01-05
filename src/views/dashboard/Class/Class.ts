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
      return new Class(
        'Software Design',
        'Lorem ipsum dolor aret',
        'CPE301',
        'John Doe',
        'https://blog.planview.com/wp-content/uploads/2020/01/Top-6-Software-Development-Methodologies.jpg',
        'blue',
      )
    },
    units (): Unit[] {
      return this.selectedClass.units || []
    },
  },
  created (): void {
    this.selectedClass.units = [
      {
        unitNumber: 0,
        title: 'Introduction / Orientation',
        shortDescription: 'Lorem ipsum dolor sit amet.',
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
    ]
  },
  methods: {},
})
