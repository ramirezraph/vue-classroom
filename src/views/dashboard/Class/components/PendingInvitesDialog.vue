<template>
  <v-dialog
    v-model="modelValue"
    max-width="700px"
    persistent
  >
    <v-card>
      <v-card-title class="pb-3">
        <div class="d-flex">
          <div class="headline">
            Pending Invites
          </div>
          <div class="ml-auto">
            <v-btn
              text
              outlined
              class="px-6 text-none"
              @click="close"
            >
              Close
            </v-btn>
          </div>
        </div>
      </v-card-title>
      <v-divider />
      <v-card-text
        v-if="pendingInvites.length > 0"
        class="px-6"
      >
        <v-list
          subheader
        >
          <v-subheader class="pa-0">
            {{ pendingInvites.length }} pending invites
          </v-subheader>

          <transition-group
            name="list"
            tag="p"
          >
            <v-list-item
              v-for="(item, index) in pendingInvites"
              :key="item.id"
              class="pa-0 list-item"
            >
              <v-list-item-avatar>
                <v-img
                  alt="avatar"
                  :src="item.imgLink"
                  style="object-fit: cover;"
                />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  {{ item.fullname }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-btn
                  class="grey mx-0"
                  @click="cancelInvite(item, index)"
                >
                  Cancel Invite
                </v-btn>
              </v-list-item-icon>
            </v-list-item>
          </transition-group>
        </v-list>
      </v-card-text>
      <v-card-text
        v-else
        class="px-6"
      >
        <span class="caption grey--text">No pending invites.</span>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { classesCollection, notificationsCollection, usersCollection } from '@/fb'
  import { Class } from '@/model/Class'
  import getFullName from '@/plugins/fullname'
  import firebase from 'firebase'
  import Vue from 'vue'

  type PendingInvite = {
    id: string;
    fullname: string;
    imgLink: string;
  }

  export default Vue.extend({
    props: {
      vModel: {
        type: Boolean,
        required: true,
      },
    },
    data () {
      return {
        fullname: '',
        imgLink: null,
        pendingInvites: [] as PendingInvite[],
        userIdList: [] as string[],
      }
    },
    computed: {
      modelValue (): boolean {
        return this.vModel || false
      },
      activeClass (): Class {
        return this.$store.getters['class/getActiveClass']
      },
    },
    mounted () {
      classesCollection.doc(this.activeClass.id).get().then(doc => {
        if (doc.exists) {
          if (!doc.data()?.pendingInvites) return
          if (doc.data()?.pendingInvites.length <= 0) return

          this.userIdList = [...doc.data()?.pendingInvites]

          // get some info of the user
          this.userIdList.reverse().forEach(id => {
            usersCollection.doc(id).get().then(userDoc => {
              if (userDoc.exists) {
                const name = getFullName(userDoc.data()?.firstName, userDoc.data()?.middleName, userDoc.data()?.lastName)
                const imgLink = userDoc.data()?.imgProfile
                this.pendingInvites.push(
                  {
                    id: id,
                    fullname: name,
                    imgLink: imgLink,
                  },
                )
              }
            })
          })
        }
      })
    },
    methods: {
      close (): void {
        this.$emit('close')
      },
      cancelInvite (user: PendingInvite, index: number) {
        // remove from pending invites list
        classesCollection.doc(this.activeClass.id).update({
          pendingInvites: firebase.firestore.FieldValue.arrayRemove(user.id),
        }).catch(error => {
          this.$notify({
            group: 'appWideNotification',
            title: 'Failed',
            text: error.message,
            type: 'error',
          })
        })

        // remove notification
        notificationsCollection.doc(user.id).collection('items').where('classId', '==', this.activeClass.id).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              if (doc.exists) {
                notificationsCollection.doc(user.id).collection('items').doc(doc.id).delete().then(() => {
                  this.pendingInvites.splice(index, 1)
                })
              }
            })
          }).catch(error => {
            this.$notify({
              group: 'appWideNotification',
              title: 'Failed',
              text: error.message,
              type: 'error',
            })
          })
      },
    },
  })
</script>

<style lang="scss" scoped>
  .list-enter-active,
  .list-leave-active {
    transition: all 300ms ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
</style>
