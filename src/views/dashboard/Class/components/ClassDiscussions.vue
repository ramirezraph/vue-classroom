<template>
  <div
    id="discussions"
    class="mt-n8"
  >
    <v-card
      class="px-6 pb-3 pt-1"
      elevation="2"
    >
      <v-card
        outlined
      >
        <v-card-title class="body-1 pa-2 pl-4 grey--text">
          Post a message
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-row class="px-6">
            <v-textarea
              v-model="post_message"
              label="Type your message here"
              outlined
              color="blue"
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
                color="info"
                min-width="150"
                :loading="postLoading"
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
              v-for="(post, i) in posts"
              :key="i"
              class="ml-n6"
              color="green"
              icon="mdi-forum"
              fill-dot
              medium
            >
              <post-item :post="post" />
            </v-timeline-item>
          </transition-group>
        </v-timeline>
        <div class="text-center">
          <v-btn
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
  </div>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import PostItem from './PostItem.vue'
  import { Post } from '@/model/Post'
  import { User } from '@/model/User'
  import firebase from 'firebase'
  import { classesCollection } from '@/fb'
  // eslint-disable-next-line no-undef
  import Timestamp = firebase.firestore.Timestamp;

  export default Vue.extend({
    components: {
      PostItem,
    },
    props: {
      discussions: {
        type: Array as PropType<Post[]>,
        required: true,
      },
    },
    data () {
      return {
        post_message: '',
        postLoading: false,
      }
    },
    computed: {
      posts (): Post[] {
        return this.discussions || []
      },
      user (): User {
        return this.$store.getters['user/getCurrentUser']
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
        await classesCollection.doc(classId).collection('discussions')
          .add(newPost).then(() => {
            this.post_message = ''
          }).catch(addError => {
            console.log(addError, addError.message)
          }).finally(() => {
            this.postLoading = false
          })
      },
      showMorePosts (): void {
        this.$emit('show-more-post')
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
