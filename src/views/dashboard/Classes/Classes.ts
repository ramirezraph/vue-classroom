import Vue from 'vue'
import { Class } from '@/model/Class'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import CreateClassDialog from './components/CreateClassDialog.vue'
import ClassItem from './components/ClassItem.vue'
import { classesCollection } from '@/fb'
import { User } from '@/model/User'
import firebase from 'firebase/app'
import ClassicDialog from '@/views/dashboard/components/dialogs/ClassicDialog.vue'

extend('joinClass_required', {
  ...required,
  message: 'You need a class key to join a class.',
})

export default Vue.extend({
  name: 'Classes',
  components: {
    ClassItem,
    ValidationProvider,
    ValidationObserver,
    CreateClassDialog,
    ClassicDialog,
  },
  data () {
    return {
      joinClassCardVisible: false,
      dialogCreateClass: false,
      dialogClassNotFound: false,
      join_classCode: '',

      loadingBtnJoinClass: false,
    }
  },
  computed: {
    classes (): Class[] {
      return this.$store.getters['classes/classes']
    },
    currentUser (): User {
      return this.$store.getters['user/getCurrentUser']
    },
  },
  methods: {
    submitJoinClass (): void {
      this.loadingBtnJoinClass = true
      // check if already enrolled
      const foundClass = this.$store.getters['classes/getClass'](this.join_classCode)
      if (foundClass) {
        this.join_classCode = ''
        this.joinClassCardVisible = false
        this.$notify({
          group: 'appWideNotification',
          title: 'Enrolled Failed',
          text: 'You are already enrolled in this class.',
          type: 'warn',
        })
        this.loadingBtnJoinClass = false
        return
      }

      // find class
      const data = classesCollection.where('inviteCode', '==', this.join_classCode).get()
        data.then(snapshot => {
          let foundIt = false
          snapshot.forEach(foundClass => {
            foundIt = true

            // add to people collection
            classesCollection.doc(foundClass.id).collection('people')
              .doc(this.currentUser.id)
              .set({
                type: 'Student',
              }).then(() => {
                // add to userList array
                classesCollection.doc(foundClass.id).update({
                  userList: firebase.firestore.FieldValue.arrayUnion(this.currentUser.id),
                }).then(() => {
                  this.join_classCode = ''
                  this.joinClassCardVisible = false
                  this.$notify({
                    group: 'appWideNotification',
                    title: 'Enrolled Success',
                    text: 'You have enrolled successfully.',
                    type: 'success',
                  })
                })
              }).catch(error => {
                this.join_classCode = ''
                this.joinClassCardVisible = false
                this.$notify({
                  group: 'appWideNotification',
                  title: 'Join Class Failed.',
                  text: error.message,
                  type: 'error',
                })
              })
          })

          if (!foundIt) {
            this.dialogClassNotFound = true
          }
        }).catch(error => {
          this.$notify({
            group: 'appWideNotification',
            title: 'Join Class Failed.',
            text: error.message,
            type: 'error',
          })
        }).finally(() => {
          this.loadingBtnJoinClass = false
        })
    },
    cancelJoinClass (): void {
      this.join_classCode = ''
      this.joinClassCardVisible = false
    },
  },
})
