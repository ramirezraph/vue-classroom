<template>
  <div
    id="discussions"
    class="mt-n8"
  >
    <v-card
      class="px-6 pt-1 pb-3"
      elevation="2"
    >
      <v-card
        outlined
      >
        <v-card-title class="pl-4 body-1 pa-2 grey--text">
          Post a message
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-row class="px-6">
            <v-textarea
              v-model="post_message"
              label="Type your message here"
              outlined
              auto-grow
              color="info"
              style="white-space: pre"
            />
          </v-row>
          <v-row class="px-3">
            <v-col cols="8">
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    icon
                    outlined
                    depressed
                    tile
                    class="mr-2"
                    color="black"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>
                      mdi-file-plus
                    </v-icon>
                  </v-btn>
                </template>
                <span>
                  Insert a file
                </span>
              </v-tooltip>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    icon
                    outlined
                    depressed
                    tile
                    class="mr-2"
                    color="black"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>
                      mdi-link-plus
                    </v-icon>
                  </v-btn>
                </template>
                <span>
                  Insert a link
                </span>
              </v-tooltip>
            </v-col>
            <v-spacer />
            <v-col>
              <v-btn
                color="primary"
                min-width="150"
                :loading="postLoading"
                :disabled="!(post_message.length > 0)"
                @click="postDiscussion"
              >
                Post
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card>
    <v-card
      color="transparent"
      flat
      class="mt-6"
    >
      <v-card-title
        class="caption"
      >
        <v-icon left>
          mdi-clock-time-four-outline
        </v-icon>
        Recent Discussions
      </v-card-title>
      <v-card-text>
        <div
          v-if="discussions.length === 0"
          class="ma-6"
        >
          <p class="grey--text">
            No discussion yet.
          </p>
        </div>
        <v-timeline
          align-top
          dense
        >
          <transition-group
            name="list"
            tag="p"
          >
            <v-timeline-item
              v-for="post in posts"
              :key="post.id"
              class="ml-n6"
              color="info"
              icon="mdi-forum"
              fill-dot
              medium
            >
              <post-item
                :post="post"
                :teacher-access="teacherEditAccess"
                @edit-post="editPost"
                @delete-post="deletePost"
              />
            </v-timeline-item>
          </transition-group>
        </v-timeline>
        <div class="text-center">
          <v-btn
            v-if="discussions.length > 0"
            text
            small
            depressed
            class="px-12 ml-12"
            @click="showMorePosts"
          >
            Show More
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
    <confirm-dialog
      :model="dialogConfirmDeletePost"
      title="Delete post?"
      text="Are you sure you want to delete this post?"
      @goto-response="confirmDeletePost"
    />
    <edit-post-dialog
      v-if="dialogEditPost"
      :key="postToEdit.id"
      :v-model="dialogEditPost"
      :post="postToEdit"
      @close="dialogEditPost = false"
      @save-changes="saveEditPost"
    />
  </div>
</template>

<script lang="ts">
  import { PropType } from 'vue'
  import PostItem from './PostItem.vue'
  import { Post } from '@/model/Post'
  import { User } from '@/model/User'
  import firebase from 'firebase'
  import { classesCollection } from '@/fb'
  import EditPostDialog from './EditPostDialog.vue'
  import SendNotification from '@/plugins/SendNotification'
  // eslint-disable-next-line no-undef
  import Timestamp = firebase.firestore.Timestamp;

  export default SendNotification.extend({
    components: {
      PostItem,
      EditPostDialog,
    },
    props: {
      discussions: {
        type: Array as PropType<Post[]>,
        required: true,
      },
      teacherEditAccess: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data () {
      return {
        post_message: '',
        postLoading: false,

        dialogEditPost: false,
        postToEdit: {} as Post,

        dialogConfirmDeletePost: false,
        postIdToBeDeleted: '',
      }
    },
    computed: {
      posts (): Post[] {
        return this.discussions || []
      },
      user (): User {
        return this.$store.getters['user/getCurrentUser']
      },
      classId (): string {
        const path = this.$route.path.split('/')
        return path[path.length - 1]
      },
    },
    methods: {
      async postDiscussion () {
        this.postLoading = true
        const newPost = {
          userId: this.user.id,
          time: Timestamp.now(),
          message: this.post_message,
        }
        const path = this.$route.path.split('/')
        const classId = path[path.length - 1]
        this.post_message = ''
        await classesCollection.doc(classId).collection('discussions')
          .add(newPost)
          .then((res) => {
            this.sendPostNotification(this.classId, this.user.id, res.id)
          })
          .catch(addError => {
            this.$notify({
              group: 'appWideNotification',
              title: 'Posting Failed',
              text: addError.message,
              type: 'error',
            })
          }).finally(() => {
            this.postLoading = false
          })
      },
      showMorePosts (): void {
        this.$emit('show-more-post')
      },
      editPost (post: Post): void {
        console.log(post)
        this.postToEdit = post
        this.dialogEditPost = true
      },
      saveEditPost (newMessage: string): void {
        classesCollection.doc(this.classId).collection('discussions')
          .doc(this.postToEdit.id).set({
            message: newMessage,
            edited: Timestamp.now(),
          }, { merge: true })
          .then(() => {
            console.log('edit success')
          }).catch(error => {
            console.log(error)
          })
        this.dialogEditPost = false
      },
      deletePost (postId: string): void {
        this.postIdToBeDeleted = postId
        this.dialogConfirmDeletePost = true
      },
      confirmDeletePost (response: boolean) {
        if (response) {
          const postRef = classesCollection.doc(this.classId).collection('discussions').doc(this.postIdToBeDeleted)
          postRef.delete()
            .then(() => {
              postRef.collection('comments').get()
                .then(comments => {
                  comments.forEach(comment => {
                    postRef.collection('comments').doc(comment.id)
                      .delete()
                      .then(() => {
                        console.log('success')
                      })
                  })
                })
            })
            .catch((deleteError) => {
              console.log(deleteError)
            })
        }
        this.dialogConfirmDeletePost = false
      },
    },
  })
</script>

<style lang="scss" scoped>
    #discussions {
        background-color: #eeeeee;
    }
    .list-item {
      display: inline-block;
      margin-right: 10px;
    }
    .list-enter-active, .list-leave-active {
      transition: all 1s;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
      opacity: 0;
      transform: translateY(30px);
    }
</style>
