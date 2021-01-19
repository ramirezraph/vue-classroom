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
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            >
          </v-avatar>
        </div>
        <div class="ml-3">
          <div
            class="d-block subtitle-2 font-weight-medium"
            color="grey"
          >
            {{ postItem.userName }}
          </div>
          <div class="d-block caption grey--text">
            <v-icon
              small
              color="grey"
            >
              mdi-clock-time-eight-outline
            </v-icon>
            {{ postItem.time }}
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
          color="blue"
          @click="commentToggle = !commentToggle"
        >
          <v-icon left>
            mdi-comment-outline
          </v-icon>
          Comment
        </v-btn>
      </div>
      <v-expand-transition>
        <div v-show="commentToggle">
          <v-divider />
          <v-row>
            <v-col cols="2">
              <v-avatar class="ml-n3 ml-sm-3">
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                >
              </v-avatar>
            </v-col>
            <v-col cols="10">
              <v-textarea
                rows="1"
                outlined
                clearable
                label="Write a comment"
                append-icon="mdi-send"
                color="blue"
                @click:append="postComment(postItem.id)"
              />
            </v-col>
          </v-row>
        </div>
      </v-expand-transition>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { Post } from '@/model/Post.ts'
  export default Vue.extend({
    props: {
      post: {
        type: Object as PropType<Post>,
        required: true,
      },
    },
    data () {
      return {
        commentToggle: false,
      }
    },
    computed: {
      postItem (): Post {
        return this.post
      },
    },
    methods: {
      postComment (id: string): void {
        console.log(id, 'send button clicked')
      },
    },
  })
</script>

<style lang="scss" scoped>

</style>
