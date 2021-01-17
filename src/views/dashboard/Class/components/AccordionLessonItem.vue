<template>
  <v-expansion-panel>
    <v-expansion-panel-header color="#686868">
      <v-card
        flat
        tile
        class="ma-0 white--text"
        color="transparent"
      >
        <p class="text-h4 ma-0">
          <v-icon
            :color="liveDraftColor"
          >
            mdi-circle-medium
          </v-icon>
          Lesson: {{ lessonItem.title }}
        </p>
      </v-card>
      <template #actions>
        <v-icon color="white">
          $expand
        </v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-card
        flat
        min-width="100%"
        class="mt-3"
      >
        <div
          id="description"
          class="body-1"
        >
          <p>{{ lessonItem.shortDescription }}</p>
        </div>
        <div class="d-flex px-6 mb-4">
          <span
            class="blue--text body-1"
            style="cursor: pointer;"
          >
            <v-icon
              left
              color="blue"
            >
              mdi-video
            </v-icon>
            Introduction.mp4
          </span>
          <v-spacer />
          <v-btn
            icon
            small
          >
            <v-icon class="blue--text">
              mdi-download
            </v-icon>
          </v-btn>
          <v-btn
            icon
            small
          >
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
          <v-btn
            icon
            small
          >
            <v-icon>
              mdi-arrow-up-down
            </v-icon>
          </v-btn>
        </div>
        <v-row
          no-gutters
          class="mt-6"
        >
          <div
            class="d-flex lesson-controls"
          >
            <v-btn
              icon
              outlined
              depressed
              tile
              class="mr-2"
              color="black"
            >
              <v-icon>
                mdi-file-pdf
              </v-icon>
            </v-btn>
            <v-btn
              icon
              outlined
              depressed
              tile
              class="mr-2"
              color="black"
            >
              <v-icon>
                mdi-file-powerpoint
              </v-icon>
            </v-btn>
            <v-btn
              icon
              outlined
              depressed
              tile
              class="mr-2"
              color="black"
            >
              <v-icon>
                mdi-file-video
              </v-icon>
            </v-btn>
            <v-btn
              icon
              outlined
              depressed
              tile
              class="mr-2"
              color="black"
            >
              <v-icon>
                mdi-video
              </v-icon>
            </v-btn>
            <v-btn
              icon
              outlined
              depressed
              tile
              class="mr-2"
              color="black"
            >
              <v-icon>
                mdi-format-text
              </v-icon>
            </v-btn>
          </div>
          <v-spacer />
          <div>
            <v-btn
              depressed
              small
              :color="liveDraftColor"
              rounded
              width="120"
            >
              <v-switch
                v-model="isUnitLive"
                dense
                inset
                color="white"
                class="liveDraft"
              >
                <template #label>
                  <span class="input__label ml-n4 white--text">{{ liveDraftLabel }}</span>
                </template>
              </v-switch>
            </v-btn>
            <v-tooltip top>
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  color="error"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon size="25">
                    mdi-delete
                  </v-icon>
                </v-btn>
              </template>
              <span>
                Remove Lesson
              </span>
            </v-tooltip>
          </div>
        </v-row>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { Lesson } from '@/model/Lesson'
  export default Vue.extend({
    props: {
      lesson: {
        type: Object as PropType<Lesson>,
        required: true,
      },
    },
    data () {
      return {
        isUnitLive: false,
      }
    },
    computed: {
      lessonItem (): Lesson {
        return this.lesson
      },
      liveDraftLabel (): string {
        return this.isUnitLive ? 'Live' : 'Draft'
      },
      liveDraftColor (): string {
        return this.isUnitLive ? 'green' : 'orange'
      },
    },
    methods: {

    },
  })
</script>

<style scoped>
  .lesson-controls {
    height: 60px;
  }
</style>
