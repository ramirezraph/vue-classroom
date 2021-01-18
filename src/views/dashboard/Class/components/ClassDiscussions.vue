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
                color="blue"
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
          <p class="grey--text">No discussion yet.</p>
        </div>
        <v-timeline
          align-top
          dense
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
        </v-timeline>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import PostItem from './PostItem.vue'
  import { Post } from '@/model/Post'

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

      }
    },
    computed: {
      posts (): Post[] {
        return this.discussions || []
      },
    },
  })
</script>

<style lang="scss" scoped>
    #discussions {
        background-color: #eeeeee;
    }
</style>
