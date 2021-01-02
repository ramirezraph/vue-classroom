import Vue from 'vue'

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
    classes () {
      return this.$store.getters['classes/classes']
    },
  },
  methods: {},
})
