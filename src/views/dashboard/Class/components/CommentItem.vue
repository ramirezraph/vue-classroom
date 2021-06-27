<template>
  <v-card
    flat
    class="full-width d-flex py-0 my-n6"
  >
    <div
      class="pa-3"
    >
      <v-avatar
        style="border: 1px solid lightgray"
      >
        <img
          :src="userProfile"
          alt="John"
        >
      </v-avatar>
    </div>
    <div class="py-3 ml-1 d-flex flex-column custom-full-width">
      <div
        class="d-flex subtitle-2 font-weight-medium mb-n3"
      >
        {{ userName }}
        <v-tooltip
          right
          color="info"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              x-small
              v-bind="attrs"
              class="ml-2"
              v-on="on"
            >
              <v-icon x-small>
                mdi-clock-outline
              </v-icon>
            </v-btn>
          </template>
          <span>{{ convertedDate }}</span>
        </v-tooltip>
        <div class="ml-auto">
          <v-menu
            v-if="editAccess || deleteAccess"
            rounded
            offset-y
          >
            <template #activator="{ attrs, on }">
              <v-btn
                icon
                v-bind="attrs"
                class="mt-n4"
                v-on="on"
              >
                <v-icon>
                  mdi-dots-vertical
                </v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-if="editAccess"
                link
                @click="editComment"
              >
                <v-icon left>
                  mdi-pencil-outline
                </v-icon>
                <span>Edit</span>
              </v-list-item>
              <v-list-item
                v-if="deleteAccess"
                link
                @click="removeComment"
              >
                <v-icon left>
                  mdi-delete-outline
                </v-icon>
                <span>Remove</span>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
      <div class="mt-3">
        <v-textarea
          v-model="commentItem.message"
          rows="1"
          auto-grow
          flat
          style="white-space: pre"
          class="no-padding pr-10"
          readonly
          solo
          dense
        />
      </div>
    </div>
  </v-card>
</template>
<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { Comment } from '@/model/Post'
  import { usersCollection } from '@/fb'
  import { User } from '@/model/User'
  import getFullName from '@/plugins/fullname'

  export default Vue.extend({
    name: 'CommentItem',
    props: {
      comment: {
        type: Object as PropType<Comment>,
        required: true,
      },
      teacherAccess: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data () {
      return {
        userName: '',
        userProfile: '',
      }
    },
    computed: {
      commentItem (): Comment {
        return this.comment
      },
      convertedDate (): string {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
        const theDate = this.comment.time.toDate()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return theDate.toLocaleDateString('en-US', options)
      },
      currentUser (): User {
        return this.$store.getters['user/getCurrentUser']
      },
      deleteAccess (): boolean {
        if (this.teacherAccess) {
          return true
        }
        return this.currentUser.id === this.commentItem.userId
      },
      editAccess (): boolean {
        return this.currentUser.id === this.commentItem.userId
      },
    },
    mounted () {
      usersCollection.doc(this.comment.userId).get().then(doc => {
        if (doc.exists) {
          this.userName = getFullName(doc.data()?.firstName, doc.data()?.middleName, doc.data()?.lastName)
          this.userProfile = doc.data()?.imgProfile
        }
      })
    },
    methods: {
      editComment () {
        this.$emit('edit-comment', this.comment.id)
      },
      removeComment () {
        this.$emit('remove-comment', this.comment.id)
      },
    },
  })
</script>

<style lang="scss" scoped>
  .custom-full-width {
    width: 100%;
  }
</style>
