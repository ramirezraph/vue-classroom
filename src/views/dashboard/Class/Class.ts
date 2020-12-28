import Vue from 'vue'

export default Vue.extend({
  name: 'Class',
  props: {
    id: { // from router params
      type: Number,
      required: true,
    },
  },
  data () {
    return {

    }
  },
})
