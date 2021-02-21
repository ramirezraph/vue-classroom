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

      notification: false,
      notificationType: 'success',
      notificationMessage: '',
    }
  },
  computed: {
    classes (): Class[] {
      return this.$store.getters['classes/classes']
    },
  },
  methods: {
    submitJoinClass (): void {
      // check if already enrolled
      const foundClass = this.$store.getters['classes/getClass'](this.join_classCode)
      if (foundClass) {
        this.join_classCode = ''
        this.joinClassCardVisible = false
        this.notificationType = 'success'
        this.notificationMessage = 'You are already enrolled in this class.'
        this.notification = true
        return
      }
      const data = classesCollection.doc(this.join_classCode).get()
        data.then(doc => {
          if (doc.exists) {
            const currentUser: User = this.$store.getters['user/getCurrentUser']
            classesCollection.doc(doc.id).collection('people')
              .doc(currentUser.id)
              .set({
                type: 'Student',
              }).then(() => {
                classesCollection.doc(doc.id).update({
                  userList: firebase.firestore.FieldValue.arrayUnion(currentUser.id),
                }).then(() => {
                  this.join_classCode = ''
                  this.joinClassCardVisible = false
                  this.notificationType = 'success'
                  this.notificationMessage = 'You have enrolled successfully.'
                  this.notification = true
                })
              }).catch(error => {
              this.join_classCode = ''
              this.joinClassCardVisible = false
              this.notificationType = 'error'
              this.notificationMessage = error.message
              this.notification = true
              })
          } else {
            this.dialogClassNotFound = true
          }
        }).catch(error => {
          console.log(error)
        })
    },
    cancelJoinClass (): void {
      this.join_classCode = ''
      this.joinClassCardVisible = false
    },
  },
})
