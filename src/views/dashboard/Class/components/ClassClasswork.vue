<template>
  <v-card
    flat
    color="white"
    class="mt-0 pa-3"
  >
    <v-card-title class="subtitle-1 text-h3 pb-6">
      <span>Classwork - <span class="font-weight-medium">{{ code }}</span></span>
      <v-btn
        rounded
        depressed
        color="blue"
        class="ml-6"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        Create
      </v-btn>
    </v-card-title>
    <v-card-text>
      <base-material-tabs
        color="blue"
        icons-and-text
        vertical
      >
        <v-tab
          class="mb-5"
        >
          All Units
          <v-icon>
            mdi-book-open-blank-variant
          </v-icon>
        </v-tab>
        <v-tab
          v-for="(item, i) in units"
          :key="i"
          class="mb-5"
        >
          {{ item.text }}
          <v-icon>
            mdi-book-open-blank-variant
          </v-icon>
        </v-tab>

        <v-tab-item>
          <v-card
            flat
            class="my-0"
          >
            <v-card-text class="pt-0">
              <v-expansion-panels
                accordion
                multiple
                class="mt-4"
              >
                <v-expansion-panel
                  v-for="(itemLesson, lessonIndex) in 3"
                  :key="lessonIndex"
                >
                  <v-expansion-panel-header>
                    <v-card
                      flat
                      tile
                      class="ma-0"
                      color="transparent"
                    >
                      <span class="text-h3 ma-0">
                        Introduction / Orientation
                      </span>
                    </v-card>
                    <template #actions>
                      <v-icon>
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
                      <v-expansion-panels
                        accordion
                        multiple
                        class="mt-4"
                      >
                        <!-- Form Type -->
                        <v-expansion-panel>
                          <v-expansion-panel-header>
                            <v-card
                              flat
                              tile
                              class="ma-0"
                              color="transparent"
                            >
                              <v-row
                                align="center"
                                justify="center"
                              >
                                <v-col
                                  cols="12"
                                  md="8"
                                >
                                  <v-icon
                                    left
                                    large
                                  >
                                    mdi-help-circle
                                  </v-icon>
                                  <span class="subtitle-1 ma-0">
                                    Lorem, ipsum dolor.
                                  </span>
                                </v-col>
                                <v-spacer />
                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <span class="caption grey--text">
                                    Due Tomorrow, 11:59 PM
                                  </span>
                                </v-col>
                              </v-row>
                            </v-card>
                            <template #actions>
                              <v-icon>
                                $expand
                              </v-icon>
                            </template>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-card
                              flat
                              class="mt-3"
                            >
                              <v-row>
                                <v-col
                                  sm="12"
                                  md="12"
                                  xl="8"
                                >
                                  <p class="caption grey--text">
                                    Posted Dec 17 (Edited 4:20 PM)
                                  </p>
                                  <div class="subtitle-1">
                                    Lorem ipsum dolor sit amet.
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, id enim. Quam temporibus distinctio incidunt nemo dolor saepe vel fugit!
                                  </div>
                                </v-col>
                                <v-spacer />
                                <v-col
                                  sm="12"
                                  md="12"
                                  xl="4"
                                  class="px-0 px-sm-16 px-md-0 px-lg-0 px-xl-0"
                                >
                                  <v-row
                                    no-gutters
                                    class="d-flex text-center"
                                  >
                                    <v-col>
                                      <div class="d-block">
                                        <v-avatar
                                          color="#404040"
                                          size="50"
                                        >
                                          <span class="white--text subtitle-1">
                                            17
                                          </span>
                                        </v-avatar>
                                      </div>
                                      <div class="d-block">
                                        <span class="caption grey--text">Assigned</span>
                                      </div>
                                    </v-col>
                                    <v-col>
                                      <div class="d-block">
                                        <v-avatar
                                          color="grey darken-1"
                                          size="50"
                                        >
                                          <span class="white--text subtitle-1">
                                            15
                                          </span>
                                        </v-avatar>
                                      </div>
                                      <div class="d-block">
                                        <span class="caption grey--text">Turned In</span>
                                      </div>
                                    </v-col>
                                    <v-col>
                                      <div class="d-block">
                                        <v-avatar
                                          color="blue"
                                          size="50"
                                        >
                                          <span class="white--text subtitle-1">
                                            0
                                          </span>
                                        </v-avatar>
                                      </div>
                                      <div class="d-block">
                                        <span class="caption grey--text">Graded</span>
                                      </div>
                                    </v-col>
                                  </v-row>
                                </v-col>
                              </v-row>
                              <v-divider />
                              <v-row>
                                <v-btn
                                  text
                                  depressed
                                  color="blue"
                                >
                                  View Question
                                </v-btn>
                              </v-row>
                            </v-card>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card
            flat
            class="my-0"
          >
            <v-card-text class="pt-0">
              <p>
                Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.
              </p>

              <p>
                Dramatically visualize customer directed convergence without revolutionary ROI. Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.
              </p>

              <div>
                Dramatically visualize customer directed convergence without revolutionary ROI. Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits.
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card
            flat
            class="my-0"
          >
            <v-card-text class="pt-0">
              <p>
                Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas.
              </p>

              <div>
                Dramatically maintain clicks-and-mortar solutions without functional solutions.
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </base-material-tabs>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    data () {
      return {
        code: 'CPE301',
        units: [
          {
            text: 'Unit 1',
          },
          {
            text: 'Unit 2',
          },
        ],
      }
    },
  })
</script>

<style lang="scss" scoped>

</style>
