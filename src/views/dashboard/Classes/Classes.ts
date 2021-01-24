import Vue from 'vue'
import { Class } from '@/model/Class'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'You need a class code to join a class.',
})

export default Vue.extend({
  name: 'Classes',
  components: {
    ClassItem: () => import('./components/ClassItem.vue'),
    ValidationProvider,
    ValidationObserver,
  },
  data () {
    return {
      joinClassCardVisible: false,
      join_classCode: '',
    }
  },
  computed: {
    classes (): Class[] {
      return this.$store.getters['classes/classes']
    },
  },
  methods: {
    submitJoinClass (): void {
      console.log('on submit')
    },
    cancelJoinClass (): void {
      this.join_classCode = ''
      this.joinClassCardVisible = false
    },
  },
})
