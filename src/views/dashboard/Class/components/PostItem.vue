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
              link
            >
              <span>Pin to top</span>
            </v-list-item>
            <v-list-item
              link
              @click="editPost"
            >
              <span>Edit</span>
            </v-list-item>
            <v-list-item
              link
              @click="deletePost"
            >
              <span>Remove</span>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-card-title>
    <v-card-text class="pt-3 body-1">
      <div class="pb-6">
        {{ postItem.message }}
      </div>
      <div class="pb-3">
        <v-btn
          depressed
          text
          outlined
          rounded
          color="primary"
          @click="toggleComments"
          @click.once="fetchComments"
        >
          <v-icon left>
            mdi-comment-outline
          </v-icon>
          Comment
        </v-btn>
      </div>
      <v-expand-transition>
        <div
          v-if="commentToggle"
        >
          <div>
            <v-divider />

            <v-list
              three-line
              class="ma-0 pa-0 pt-3"
            >
              <v-btn
                small
                text
                class="text-none"
                color="primary"
                @click="viewMoreComments"
              >
                View more comments.
              </v-btn>
              <transition-group
                name="list"
                tag="p"
              >
                <template v-for="comment in comments">
                  <comment-item
                    :key="comment.id"
                    :comment="comment"
                    @edit-comment="editComment"
                    @remove-comment="deleteComment"
                  />
                </template>
              </transition-group>
            </v-list>
          </div>
          <div>
            <v-divider />
            <v-row>
              <v-col cols="2">
                <v-avatar class="ml-n3 ml-sm-3">
                  <img
                    :src="currentUser.profile"
                  >
                </v-avatar>
              </v-col>
              <v-col cols="10">
                <v-form @submit.prevent="postComment(postItem.id)">
                  <v-textarea
                    v-model="comment_message"
                    outlined
                    clearable
                    rows="1"
                    auto-grow
                    label="Write a comment"
                    append-icon="mdi-send"
                    color="primary"
                    @click:append="postComment(postItem.id)"
                  />
                  <v-btn
                    v-show="false"
                    type="submit"
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
  import { Comment, Post } from '@/model/Post.ts'
  import { classesCollection, usersCollection } from '@/fb'
  import { User } from '@/model/User'
  import firebase from 'firebase'
  import CommentItem from './CommentItem.vue'
  // eslint-disable-next-line no-undef
  import Timestamp = firebase.firestore.Timestamp;
  // eslint-disable-next-line no-undef

  export default Vue.extend({
    components: {
      CommentItem,
    },
    props: {
      post: {
        type: Object as PropType<Post>,
        required: true,
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
      }
    },
    computed: {
      postItem (): Post {
        return this.post
      },
      convertedDate (): string {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
        const theDate = this.postItem.time.toDate()
        return theDate.toLocaleDateString('en-US', options)
      },
      currentUser (): User {
        return this.$store.getters['user/getCurrentUser']
      },
      classId (): string {
        const path = this.$route.path.split('/')
        return path[path.length - 1]
      },
    },
    mounted () {
      usersCollection.doc(this.postItem.userId).get().then(doc => {
        if (doc.exists) {
          this.userName = this.getFullName(doc.data()?.firstName, doc.data()?.middleName, doc.data()?.lastName)
          this.userProfile = doc.data()?.imgProfile
        }
      })
    },
    methods: {
      fetchComments (): void {
        let fetchComm: Comment[] = []
        classesCollection.doc(this.classId).collection('discussions').doc(this.postItem.id)
          .collection('comments')
          .orderBy('time', 'asc')
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

        classesCollection.doc(this.classId).collection('discussions')
          .doc(postId).collection('comments').add(newComment)
          .catch(error => {
            console.log(error.message)
          }).finally(() => {
            this.comment_message = ''
          })
      },
      getFullName (firstName: string, middleName: string, lastName: string): string {
        return `${firstName} ${this.middleInitial(middleName)} ${lastName}`
      },
      middleInitial (middleName: string): string {
        const midName: string[] = middleName.split(' ')
        let middleInitial = ''
        for (let i = 0; i < midName.length; i++) {
          middleInitial += midName[i].substring(0, 1) + '.'
        }

        return middleInitial
      },
      convertDate (time: Timestamp): string {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
        const theDate = time.toDate()
        return theDate.toLocaleDateString('en-US', options)
      },
      viewMoreComments (): void {
        // classesCollection.doc(this.classId).collection('discussions').doc(this.postItem.id)
        //   .collection('comments').get()
        //   .then(querySnapshot => {
        //     if (this.commentLimit < querySnapshot.size) {
        //       console.log('extend limit!')
        //       this.commentLimit += 5
        //     }
        //   })
      },
      editComment (commentId: string): void {
        console.log(commentId)
      },
      deleteComment (commentId: string): void {
        this.commentIdToBeDeleted = commentId
        this.dialogConfirmDeleteComment = true
      },
      editPost () {
        this.$emit('edit-post', this.postItem.id)
      },
      deletePost () {
        this.$emit('delete-post', this.postItem.id)
      },
      confirmDeleteComment (response: boolean): void {
        if (response) {
          classesCollection.doc(this.classId).collection('discussions').doc(this.postItem.id)
            .collection('comments').doc(this.commentIdToBeDeleted)
            .delete()
            .catch((deleteError) => {
              console.log(deleteError)
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
