<template>
  <v-card
    class="mt-0 pa-8"
  >
    <v-card-title>
      <div>
        <v-btn
          color="info"
          rounded
          class="mb-6 ml-n1"
        >
          <v-icon left>
            mdi-account-plus-outline
          </v-icon>
          <span class="text-none">Send Invite</span>
        </v-btn>
      </div>
    </v-card-title>
    <v-card-text>
      <div>
        <span class="display-2 info--text">
          Teacher
        </span>
        <v-list class="mt-2">
          <people-item
            v-for="item in teachers"
            :key="item.id"
            :user="item"
            :has-edit-access="hasEditAccess"
            class="my-0 mr-1 pa-0"
            :is-class-owner="isClassOwner"
            :owner-id="ownerId"
            @remove-person="removePerson"
          />
        </v-list>
      </div>
      <div class="mt-8">
        <span class="display-2 info--text ml-2">
          Classmates
        </span>
        <v-card
          flat
          class="d-flex align-center mt-2"
          max-height="50"
        >
          <v-checkbox
            class="ml-3"
          />
          <v-menu
            offset-y
            internal-activator
          >
            <template #activator="{ on, attrs }">
              <v-btn
                tile
                v-bind="attrs"
                outlined
                small
                text-none
                v-on="on"
              >
                Actions<v-icon right>
                  mdi-chevron-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title>Send an Email</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Remove</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn icon>
            <v-icon>mdi-order-alphabetical-ascending</v-icon>
          </v-btn>
          <v-text-field
            placeholder="Search"
            solo
            dense
            single-line
            append-icon="mdi-magnify"
            style="max-width: 250px;"
            class="mt-5 ml-auto"
          />
        </v-card>
        <div class="mt-2">
          <v-list v-if="students.length > 0">
            <people-item
              v-for="item in students"
              :key="item.id"
              :user="item"
              :has-edit-access="hasEditAccess"
              class="my-0 mr-1 pa-0"
              owner-id="ownerId"
              @remove-person="removePerson"
            />
          </v-list>
          <v-list v-else>
            <v-list-item>
              <v-list-item-title class="grey--text caption">
                No students enrolled.
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </v-card-text>
    <confirm-dialog
      v-if="dialogConfirmRemovePerson"
      :model="dialogConfirmRemovePerson"
      :title="`Confirm: ${remove_userName}`"
      text="Are you sure you want to remove this person?"
      @goto-response="confirmRemovePerson"
    />
  </v-card>
</template>

<script lang="ts">
  import { User, UserType } from '@/model/User'
  import Vue, { PropType } from 'vue'
  import PeopleItem from './PeopleItem.vue'
  import { classesCollection } from '@/fb'
  import firebase from 'firebase/app'
  export default Vue.extend({
    name: 'ClassPeople',
    components: {
      PeopleItem,
    },
    props: {
      people: {
        type: Array as PropType<User[]>,
        required: true,
      },
      hasEditAccess: {
        type: Boolean,
        required: true,
      },
      isClassOwner: {
        type: Boolean,
        required: false,
        default: false,
      },
      ownerId: {
        type: String,
        required: true,
      },
    },
    data () {
      return {
        dialogConfirmRemovePerson: false,
        remove_userId: '',
        remove_userName: '',
      }
    },
    computed: {
      teachers (): User[] {
        return this.people.filter(p => p.userType === UserType.Teacher)
      },
      students (): User[] {
        return this.people.filter(p => p.userType === UserType.Student)
      },
      classId (): string {
        const path = this.$route.path.split('/')
        return path[path.length - 1]
      },
    },
    methods: {
      removePerson (userId: string, userName: string): void {
        this.remove_userId = userId
        this.remove_userName = userName
        this.dialogConfirmRemovePerson = true
      },
      confirmRemovePerson (response: boolean): void {
        if (response) {
          classesCollection.doc(this.classId).collection('people')
            .doc(this.remove_userId)
            .delete()
            .then(() => {
              classesCollection.doc(this.classId).update({
                userList: firebase.firestore.FieldValue.arrayRemove(this.remove_userId),
              }).then(() => {
                this.$notify({
                  group: 'appWideNotification',
                  title: 'Remove Success',
                  text: 'User removed successfully.',
                  type: 'success',
                })
                // this.$emit('user-removed')
              }).catch(errorOnArray => {
                this.$notify({
                  group: 'appWideNotification',
                  title: 'Remove Failed',
                  text: errorOnArray.message,
                  type: 'error',
                })
              })
            }).catch(error => {
              this.$notify({
                group: 'appWideNotification',
                title: 'Remove Failed',
                text: error.message,
                type: 'error',
              })
            })
        }

        this.dialogConfirmRemovePerson = false
      },
    },
  })
</script>
