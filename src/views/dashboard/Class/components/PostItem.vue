<template>
  <v-card class="px-6 pt-6">
    <v-card-title>
      <div>
        <div
          class="d-block subtitle-2 font-weight-medium"
          color="grey"
        >
          {{ post.name }}
        </div>
        <div class="d-block caption text-center justify-content">
          <v-icon small>
            mdi-clock-time-eight-outline
          </v-icon>
          {{ post.time }}
        </div>
      </div>
    </v-card-title>
    <v-card-text class="pt-3 body-1">
      <div class="pb-6">
        {{ post.message }}
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
      <div v-if="commentToggle">
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
              @click:append="postComment(i)"
            />
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Post } from '@/model/Post.ts'
  export default Vue.extend({
    props: {
      post: {
        type: Post,
        required: true,
      },
    },
    data () {
      return {
        commentToggle: false,
      }
    },
  })
</script>

<style lang="scss" scoped>

</style>
