import Vue from 'vue'
import { Class } from '@/model/Class'

export default Vue.extend({
  name: 'Classes',
  components: {
    ClassItem: () => import('./components/ClassItem.vue'),
  },
  data () {
    return {

    }
  },
  computed: {
    classes (): Class[] {
      return this.$store.getters['classes/classes']
    },
  },
  methods: {},
})
