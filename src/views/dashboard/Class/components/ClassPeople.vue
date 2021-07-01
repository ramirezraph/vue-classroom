<template>
  <v-card
    class="mt-0 pa-8"
  >
    <v-card-title
      v-if="hasEditAccess"
      class="d-flex align-center pb-8"
    >
      <v-btn
        color="primary"
        rounded
        :loading="sendInviteLoading"
        @click="dialogSendInvite = true"
      >
        <v-icon left>
          mdi-account-plus-outline
        </v-icon>
        <span class="text-none">Send Invite</span>
      </v-btn>
      <v-spacer />
      <v-btn
        color="info"
        rounded
        text
        @click="dialogPendingInvites = true"
      >
        <v-icon left>
          mdi-menu
        </v-icon>
        <span class="text-none">Pending Invites</span>
      </v-btn>
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
        <span class="display-2 info--text">
          Classmates
        </span>
        <v-card
          flat
          class="d-flex align-center mt-6"
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
    <send-invite-dialog
      v-if="dialogSendInvite"
      :v-model="dialogSendInvite"
      @close="dialogSendInvite = false"
      @send-invite="sendClassInvite"
    />

    <pending-invites-dialog
      v-if="dialogPendingInvites"
      :v-model="dialogPendingInvites"
      @close="dialogPendingInvites = false"
    />
  </v-card>
</template>

<script lang="ts">
  import { User, UserType } from '@/model/User'
  import Vue, { PropType } from 'vue'
  import PeopleItem from './PeopleItem.vue'
  import { classesCollection, notificationsCollection } from '@/fb'
  import firebase from 'firebase/app'
  import SendInviteDialog, { SearchUser } from './SendInviteDialog.vue'
  import { NotificationType } from '@/model/UserNotification'
  import { Class } from '@/model/Class'
  import PendingInvitesDialog from './PendingInvitesDialog.vue'

  export default Vue.extend({
    name: 'ClassPeople',
    components: {
      PeopleItem,
      SendInviteDialog,
      PendingInvitesDialog,
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
        dialogSendInvite: false,
        dialogPendingInvites: false,

        remove_userId: '',
        remove_userName: '',

        sendInviteLoading: false,
      }
    },
    computed: {
      teachers (): User[] {
        const list = this.people.filter(p => p.userType === UserType.Teacher)
        return list.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1)
      },
      students (): User[] {
        const list = this.people.filter(p => p.userType === UserType.Student)
        return list.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1)
      },
      selectedClass (): Class {
        return this.$store.getters['class/getActiveClass']
      },
    },
    methods: {
      removePerson (userId: string, userName: string): void {
        this.remove_userId = userId
        this.remove_userName = userName
        this.dialogConfirmRemovePerson = true
      },
      async confirmRemovePerson (response: boolean) {
        if (response) {
          await classesCollection.doc(this.selectedClass.id).collection('people')
            .doc(this.remove_userId)
            .delete()
            .then(() => {
              classesCollection.doc(this.selectedClass.id).update({
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
      sendClassInvite (selectedUsers: SearchUser[]): void {
        if (!this.hasEditAccess) return

        if (selectedUsers.length <= 0) return

        this.sendInviteLoading = true

        selectedUsers.forEach(user => {
          notificationsCollection.doc(user.id).collection('items').add({
            userId: this.$store.getters['user/getCurrentUser'].id,
            type: NotificationType.ClassInvite,
            read: false,
            date: firebase.firestore.Timestamp.now(),
            classId: this.selectedClass.id,
          })
            .then(() => {
              // add to pending list
              classesCollection.doc(this.selectedClass.id).update({
                pendingInvites: firebase.firestore.FieldValue.arrayUnion(user.id),
              }).then(() => {
                this.$notify({
                  group: 'appWideNotification',
                  title: 'Success',
                  text: 'Class invitation sent.',
                  type: 'success',
                })
              })
            })
            .catch(error => {
              this.$notify({
                group: 'appWideNotification',
                title: 'Failed',
                text: error.message,
                type: 'error',
              })
            }).finally(() => {
              this.dialogSendInvite = false
              this.sendInviteLoading = false
            })
        })
      },
    },
  })
</script>
