<template>
  <v-card
    class="px-6 pt-6"
    min-width="102%"
  >
    <v-card-title>
      <div class="d-flex">
        <div>
          <v-avatar>
            <img
              :src="userProfile"
              alt="John"
            >
          </v-avatar>
        </div>
        <div class="ml-3">
          <div
            class="d-block subtitle-2 font-weight-medium"
          >
            {{ userName }}
          </div>
          <div class="d-block caption grey--text">
            <v-icon
              small
              color="grey"
            >
              mdi-clock-time-eight-outline
            </v-icon>
            {{ convertedDate }}
          </div>
        </div>
      </div>
      <div class="ml-auto">
        <v-menu
          v-if="deleteAccess || editAccess || teacherAccess"
          rounded
          offset-y
        >
          <template #activator="{ attrs, on }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                mdi-dots-vertical
              </v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-if="teacherAccess"
              link
            >
              <v-icon left>
                mdi-pin-outline
              </v-icon>
              <span>Pin to top</span>
            </v-list-item>
            <v-list-item
              v-if="editAccess"
              link
              @click="editPost"
            >
              <v-icon left>
                mdi-pencil-outline
              </v-icon>
              <span>Edit</span>
            </v-list-item>
            <v-list-item
              v-if="deleteAccess"
              link
              @click="deletePost"
            >
              <v-icon left>
                mdi-delete-outline
              </v-icon>
              <span>Remove</span>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-card-title>
    <v-card-text class="pt-3 body-1">
      <div>
        <v-textarea
          v-model="postItem.message"
          rows="1"
          auto-grow
          flat
          style="white-space: pre"
          readonly
          solo
          dense
        />
      </div>
      <div class="pb-3">
        <v-btn
          depressed
          text
          outlined
          rounded
          color="info"
          @click="toggleComments"
          @click.once="fetchComments"
        >
          <v-icon left>
            {{ postItem.numberOfComments > 0 ? 'mdi-comment' : 'mdi-comment-outline' }}
          </v-icon>
          {{ commentBtnText }}
        </v-btn>
      </div>
      <v-expand-transition>
        <div
          v-if="commentToggle"
        >
          <div>
            <v-divider />

            <div>
              <v-btn
                v-if="postItem.numberOfComments > comments.length"
                small
                text
                class="text-none mb-3 mt-1"
                color="primary"
                @click="viewMoreComments"
              >
                View more comments
              </v-btn>
              <div class="mt-6">
                <transition-group
                  name="list"
                  tag="p"
                >
                  <template v-for="comment in comments">
                    <comment-item
                      :key="comment.id"
                      :comment="comment"
                      class="mt-n3"
                      :teacher-access="teacherAccess"
                      @edit-comment="editComment"
                      @remove-comment="deleteComment"
                    />
                  </template>
                </transition-group>
              </div>
            </div>
          </div>
          <div class="mt-n6">
            <v-divider />
            <v-row class="justify-center">
              <v-col cols="2">
                <v-avatar
                  class="ml-n3 ml-sm-3 mt-1"
                >
                  <img
                    :src="currentUser.profile"
                  >
                </v-avatar>
              </v-col>
              <v-col cols="10">
                <v-form @submit.prevent="postComment(postItem.id)">
                  <v-textarea
                    v-model="comment_message"
                    class="ml-xl-n16"
                    outlined
                    clearable
                    rows="1"
                    auto-grow
                    label="Write a comment"
                    append-icon="mdi-send"
                    color="primary"
                    style="white-space: pre"
                    @click:append="postComment(postItem.id)"
                  />
                </v-form>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-expand-transition>
    </v-card-text>
    <confirm-dialog
      :model="dialogConfirmDeleteComment"
      title="Delete comment?"
      text="Are you sure you want to delete this comment?"
      @goto-response="confirmDeleteComment"
    />
  </v-card>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { Comment, Post } from '@/model/Post'
  import { classesCollection, usersCollection } from '@/fb'
  import { User } from '@/model/User'
  import firebase from 'firebase'
  import CommentItem from './CommentItem.vue'
  // eslint-disable-next-line no-undef

  import getFullName from '@/plugins/fullname'
  // eslint-disable-next-line no-undef
  import Timestamp = firebase.firestore.Timestamp;

  export default Vue.extend({
    components: {
      CommentItem,
    },
    props: {
      post: {
        type: Object as PropType<Post>,
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
        commentToggle: false,
        userName: '',
        userProfile: '',
        comment_message: '',

        comments: [] as Comment[],
        commentLimit: 2,

        dialogConfirmDeleteComment: false,
        commentIdToBeDeleted: '',

        numberOfComments: 0,
        numberOfCommentLimit: 3,
      }
    },
    computed: {
      postItem (): Post {
        return this.post
      },
      convertedDate (): string {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
        const theDate = this.postItem.time.toDate()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return theDate.toLocaleDateString('en-US', options)
      },
      currentUser (): User {
        return this.$store.getters['user/getCurrentUser']
      },
      classId (): string {
        const path = this.$route.path.split('/')
        return path[path.length - 1]
      },
      commentBtnText (): string {
        if (this.postItem.numberOfComments > 0) {
          if (this.postItem.numberOfComments === 1) {
            return `${this.postItem.numberOfComments} Comment`
          }
          return `${this.postItem.numberOfComments} Comments`
        }

        return 'Comment'
      },
      deleteAccess (): boolean {
        if (this.teacherAccess) {
          return true
        }
        return this.currentUser.id === this.postItem.userId
      },
      editAccess (): boolean {
        return this.currentUser.id === this.postItem.userId
      },
    },
    mounted () {
      usersCollection.doc(this.postItem.userId).get().then(doc => {
        if (doc.exists) {
          this.userName = getFullName(doc.data()?.firstName, doc.data()?.middleName, doc.data()?.lastName)
          this.userProfile = doc.data()?.imgProfile
        }
      })
    },
    methods: {
      fetchComments (): void {
        let fetchComm: Comment[] = []
        classesCollection.doc(this.classId).collection('discussions').doc(this.postItem.id)
          .collection('comments')
          .orderBy('time')
          .limitToLast(this.numberOfCommentLimit)
          .onSnapshot(querySnapshot => {
            fetchComm = []
            querySnapshot.forEach(commentItem => {
              if (commentItem.exists) {
                const comment = new Comment(
                  commentItem.id,
                  commentItem.data()?.userId,
                  commentItem.data()?.time,
                  commentItem.data()?.message,
                )
                fetchComm.push(comment)
              }
            })
            this.comments = fetchComm
          })
      },
      toggleComments (): void {
        this.commentToggle = !this.commentToggle
      },
      postComment (postId: string): void {
        const newComment = {
          userId: this.currentUser.id,
          time: Timestamp.now(),
          message: this.comment_message,
        }

        const postRef = classesCollection.doc(this.classId).collection('discussions')
          .doc(postId)
        postRef.collection('comments').add(newComment).then(() => {
          postRef.set({
            numberOfComments: firebase.firestore.FieldValue.increment(1),
          }, { merge: true })
        }).catch(error => {
          console.log(error.message)
        }).finally(() => {
          this.comment_message = ''
        })
      },
      convertDate (time: Timestamp): string {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
        const theDate = time.toDate()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return theDate.toLocaleDateString('en-US', options)
      },
      viewMoreComments (): void {
        this.numberOfCommentLimit += 3
        this.fetchComments()
      },
      editComment (commentId: string): void {
        console.log(commentId)
      },
      deleteComment (commentId: string): void {
        this.commentIdToBeDeleted = commentId
        this.dialogConfirmDeleteComment = true
      },
      editPost () {
        this.$emit('edit-post', this.postItem)
      },
      deletePost () {
        this.$emit('delete-post', this.postItem.id)
      },
      confirmDeleteComment (response: boolean): void {
        if (response) {
          const postRef = classesCollection.doc(this.classId).collection('discussions').doc(this.postItem.id)
          postRef.collection('comments').doc(this.commentIdToBeDeleted)
            .delete()
            .then(() => {
              postRef.set({
                numberOfComments: firebase.firestore.FieldValue.increment(-1),
              }, { merge: true })
            })
            .catch((error) => {
              this.$notify({
                group: 'appWideNotification',
                title: 'Failed',
                text: error.message,
                type: 'error',
              })
            })
        }
        this.dialogConfirmDeleteComment = false
      },
    },
  })
</script>

<style lang="scss" scoped>
  .list-item {
    display: inline-block;
    margin-right: 5px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 0.5s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(5px);
  }
</style>
