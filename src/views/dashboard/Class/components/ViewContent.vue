<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card
      flat
    >
      <v-toolbar
        dark
        color="blue"
      >
        <v-btn
          text
          color="white"
          @click="close()"
        >
          <v-icon>mdi-arrow-left</v-icon>
          Back to Class
        </v-btn>
        <v-spacer />
      </v-toolbar>
      <v-row
        id="viewFileSection"
        no-gutters
      >
        <v-col
          cols="3"
          class="pa-5"
        >
          <span class="subtitle-2">Class Files</span>
          <v-expansion-panels
            class="mt-3"
            focusable
            multiple
          >
            <v-expansion-panel
              v-for="(item,i) in 5"
              :key="i"
            >
              <v-expansion-panel-header class="subtitle-1">
                Introduction / Orientation
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div class="py-4">
                  <file
                    :has-edit-access="false"
                    file-id="asdfasf"
                    name="Introduction.mp4"
                    type="Video"
                    link="asdfasdfafs"
                  />
                  <file
                    :has-edit-access="false"
                    file-id="asdfasf"
                    name="Introduction.pdf"
                    type="PDF"
                    link="asdfasdfafs"
                  />
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <v-col
          cols="6"
          class="pa-3"
        >
          <div id="content-header">
            <div id="content-unit-info">
              <h1
                class="display-2 blue--text"
              >
                Introduction / Orientation
              </h1>
              <div class="mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo autem animi quam numquam, laudantium velit consectetur sint quae aliquam temporibus odit, recusandae necessitatibus commodi corporis, dolores nemo fugiat iste porro iusto nobis? Voluptate pariatur nihil cum dolor necessitatibus magni facere.
              </div>
            </div>
            <div
              id="content-file-info"
              class="mt-6"
            >
              <v-row
                no-gutters
                align="center"
              >
                <v-col cols="8">
                  <h1
                    class="display-1"
                  >
                    Introduction.mp4
                  </h1>
                </v-col>
                <v-spacer />
                <v-col>
                  <v-btn
                    color="blue"
                    class="white--text"
                    height="30"
                  >
                    <v-icon left>
                      mdi-download
                    </v-icon>
                    Download
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>
        <v-col
          cols="3"
          class="pa-3"
        >
          <div class="px-6 pt-3 pb-2">
            <span class="subtitle-1 blue--text">Comments</span>
          </div>
          <v-divider />
          <div>
            <v-list
              three-line
            >
              <template v-for="(item, index) in items">
                <v-subheader
                  v-if="item.header"
                  :key="item.header"
                  v-text="item.header"
                />

                <v-divider
                  v-else-if="item.divider"
                  :key="index"
                  :inset="item.inset"
                />

                <v-list-item
                  v-else
                  :key="item.title"
                >
                  <v-list-item-avatar>
                    <v-img :src="item.avatar" />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-html="item.title" />
                    <v-list-item-subtitle v-html="item.subtitle" />
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
            <div class="mt-3 pa-3">
              <v-text-field
                full-width
                color="blue"
                outlined
                append-icon="mdi-send"
                dense
                placeholder="Write a comment here"
              >
                <template #prepend>
                  <v-avatar
                    color="blue"
                    size="40"
                    class="mt-n2"
                  >
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                    >
                  </v-avatar>
                </template>
              </v-text-field>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import Vue from 'vue'
  import File from '@/views/dashboard/components/component/File.vue'
  export default Vue.extend({
    components: {
      File,
    },
    props: {
      vModel: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data () {
      return {
        items: [
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'Brunch this weekend?',
            subtitle: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to hang out?',
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            title: 'Summer BBQ',
            subtitle: 'Wish I could come, but I\'m out of town this weekend.',
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title: 'Oui oui',
            subtitle: 'Do you have Paris recommendations? Have you ever been?',
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
            title: 'Birthday gift',
            subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
            title: 'Recipe to try',
            subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          },
        ],
      }
    },
    computed: {
      dialog (): boolean {
        return this.vModel
      },
    },
    methods: {
      close (): void {
        this.$emit('close')
      },
    },
  })
</script>

<style lang="scss" scoped>
  #viewFileSection {
    width: 100%;
    height: 93.4vh;
  }
</style>
