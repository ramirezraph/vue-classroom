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
        <div v-if="commentToggle">
          <div>
            <v-divider />
            <v-list
              three-line
              class="ma-0 pa-0"
            >
              <template v-for="comment in comments">
                <comment-item
                  :key="comment.id"
                  :comment="comment"
                />
              </template>
              <v-btn
                small
                text
                class="text-none"
                color="primary"
                @click="viewMoreComments"
              >
                View more comments.
              </v-btn>
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
          .orderBy('time', 'desc')
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
            this.commentToggle = false
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
        classesCollection.doc(this.classId).collection('discussions').doc(this.postItem.id)
          .collection('comments').get()
          .then(querySnapshot => {
            if (this.commentLimit < querySnapshot.size) {
              console.log('extend limit!')
              this.commentLimit += 5
            }
          })
      },
    },
  })
</script>

<style lang="scss" scoped>

</style>
