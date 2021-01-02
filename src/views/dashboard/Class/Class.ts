import Vue from 'vue'
import { Class } from '@/model/Class'
import ClassItem from '@/views/dashboard/Classes/components/ClassItem.vue'
import ClassHeader from './components/ClassHeader.vue'
import ClassDiscussions from './components/ClassDiscussions.vue'

export default Vue.extend({
  name: 'Class',
  components: {
    ClassItem,
    ClassHeader,
    ClassDiscussions,
  },
  props: {
    id: { // from router params
      type: String,
      required: true,
    },
  },
  data () {
    return {
      showHideAddLesson: false,
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
  },
  methods: {
    toggleAddNewLesson (): void {
      this.showHideAddLesson = !this.showHideAddLesson
    },
  },
})
