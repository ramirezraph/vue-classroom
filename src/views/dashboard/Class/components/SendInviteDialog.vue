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
            Send Invite
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
      <v-card-text class="px-6">
        <v-card
          flat
        >
          <v-expand-transition>
            <div
              v-if="selected.length > 0"
              class="pb-6"
            >
              <p class="caption grey--text">
                Selected <span class="ml-3 font-weight-bold">{{ selected.length }}</span>
              </p>
              <div class="d-flex flex-wrap">
                <v-chip
                  v-for="(item, index) in selected"
                  :key="index"
                  pill
                  color="primary"
                  close
                  class="mr-2 mb-2"
                  @click:close="removeUserFromInvite(index)"
                >
                  <v-avatar left>
                    <v-img :src="item.imgLink" />
                  </v-avatar>
                  {{ item.email }}
                </v-chip>
              </div>
            </div>
          </v-expand-transition>

          <v-text-field
            v-model="search"
            label="Search people by email"
            prepend-inner-icon="mdi-account-search-outline"
            block
            class="mt-3"
            type="email"
            clearable
            :error-messages="errorMessage"
            @input="fetchSearchResult(search)"
          />
          <v-expand-transition>
            <v-list
              v-if="searchResults.length > 0"
              subheader
            >
              <v-subheader class="pa-0">
                Search Result: <span class="ml-3 font-weight-bold">{{ searchResults.length }}</span>
              </v-subheader>

              <v-list-item
                v-for="(result, index) in searchResults"
                :key="index"
                class="pa-0"
              >
                <v-list-item-avatar>
                  <v-img
                    alt="avatar"
                    :src="result.imgLink"
                    style="object-fit: cover;"
                  />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>
                    {{ result.fullname }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-scale-transition>
                  <v-list-item-icon v-if="alreadySelected(result)">
                    <v-icon
                      size="28"
                      color="success"
                    >
                      mdi-check
                    </v-icon>
                  </v-list-item-icon>
                </v-scale-transition>
                <v-list-item-icon
                  @click="addToSelected(result)"
                >
                  <v-icon
                    size="28"
                    color="primary"
                  >
                    mdi-plus-box-outline
                  </v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-expand-transition>
        </v-card>
      </v-card-text>
      <v-card-actions class="ma-0 pa-3 px-6 mt-n6">
        <v-btn
          block
          class="primary"
          @click="invite"
        >
          Send Invite
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { classesCollection, usersCollection } from '@/fb'
  import getFullName from '@/plugins/fullname'
  import Vue from 'vue'

  export type SearchUser = {
    id: string;
    fullname: string;
    imgLink: string;
    email: string;
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
        search: '',
        selected: [] as SearchUser[],
        searchResults: [] as SearchUser[],

        errorMessage: '',
      }
    },
    computed: {
      modelValue () {
        return this.vModel || false
      },
      activeClass () {
        return this.$store.getters['class/getActiveClass']
      },
    },
    methods: {
      close (): void {
        this.$emit('close')
      },
      invite (): void {
        this.$emit('send-invite', this.selected)
      },
      addToSelected (user: SearchUser): void {
        if (this.selected.some(o => o.id === user.id)) {
          this.errorMessage = 'User already selected.'
          return
        }

        this.alreadyInvited(user).then(res => {
          if (res === true) {
            throw Error('User has already been invited.')
          } else {
            this.alreadyOnClass(user).then(res => {
              if (res === true) {
                throw Error('User already inside the class.')
              } else {
                this.selected.push(user)
              }
            }).catch(error => {
              this.errorMessage = error.message
            })
          }
        }).catch(error => {
          this.errorMessage = error.message
        })
      },
      removeUserFromInvite (index): void {
        this.selected.splice(index, 1)
      },
      alreadySelected (user: SearchUser): boolean {
        return this.selected.some(o => o.id === user.id)
      },
      async alreadyOnClass (user: SearchUser) {
        let exists = false

        const classId = this.activeClass.id
        await classesCollection.doc(classId).collection('people').doc(user.id).get().then(doc => {
          if (doc.exists) {
            exists = true
          } else {
            exists = false
          }
        })

        return new Promise((resolve) => {
          resolve(exists)
        })
      },
      async alreadyInvited (user: SearchUser) {
        let exists = false

        const classId = this.activeClass.id
        await classesCollection.doc(classId).get().then(doc => {
          if (doc.exists) {
            const pendingList: string[] = doc.data()?.pendingInvites
            if (pendingList) {
              if (pendingList.includes(user.id)) {
                exists = true
              }
            } else {
              exists = false
            }
          }
        })

        return new Promise((resolve) => {
          resolve(exists)
        })
      },
      fetchSearchResult (email: string): void {
        this.errorMessage = ''

        if (!email) {
          this.searchResults = []
          return
        }

        if (email.length > 7) {
          usersCollection.where('email', '>=', email).where('email', '<=', email + '\uf8ff').get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                this.searchResults = []
                if (doc.exists) {
                  const fullname = getFullName(doc.data()?.firstName, doc.data()?.middleName, doc.data()?.lastName)

                  const found = {
                    id: doc.id,
                    fullname: fullname,
                    imgLink: doc.data()?.imgProfile,
                    email: doc.data()?.email,
                  }

                  this.searchResults.push(found)
                }
              })
            })
        }
      },
    },
  })
</script>
