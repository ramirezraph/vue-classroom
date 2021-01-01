<template>
  <v-container
    fluid
    class="px-6 px-md-8"
  >
    <v-row>
      <v-btn
        text
        rounded
        @click="$router.back()"
      >
        <v-icon
          left
        >
          mdi-arrow-left
        </v-icon>
        Back to List
      </v-btn>
    </v-row>
    <v-row class="mt-n6">
      <v-col
        cols="12"
        md="6"
        xl="5"
      >
        <v-row>
          <class-header :value="selectedClass" />
        </v-row>
        <v-row>
          <v-card
            min-width="100%"
            color="white"
            elevation="4"
            outlined
            class="pb-6"
          >
            <v-card-title>
              <span>Flip Class</span>
            </v-card-title>
            <div class="mt-2">
              <v-expansion-panels
                accordion
                popout
                focusable
              >
                <v-expansion-panel
                  v-for="(item,i) in 5"
                  :key="i"
                >
                  <v-expansion-panel-header color="#404040">
                    <v-card
                      flat
                      tile
                      class="ma-0 white--text"
                      color="transparent"
                    >
                      <p class="text-h3 ma-0">
                        Unit: Introduction / Orientation
                      </p>
                      <p class="ma-0">
                        Lorem ipsum dolor sit amet.
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
                      elevation="3"
                    >
                      <v-expansion-panels
                        accordion
                        focusable
                        class="mt-4"
                      >
                        <v-expansion-panel
                          v-for="(item,i) in 3"
                          :key="i"
                        >
                          <v-expansion-panel-header color="#686868">
                            <v-card
                              flat
                              tile
                              class="ma-0 white--text"
                              color="transparent"
                            >
                              <p class="text-h4 ma-0">
                                Lesson: Introduction
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
                              <div id="description">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus nobis fugiat beatae quos, minus, commodi quo, placeat sed ipsa sequi debitis architecto facere unde est!</p>
                              </div>
                              <div class="d-flex px-6 mb-4">
                                <span
                                  class="blue--text"
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
                              <div class="d-flex mt-10">
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
                            </v-card>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-card>
                    <v-card
                      flat
                    >
                      <v-btn
                        color="blue"
                        @click="toggleAddNewLesson"
                      >
                        <v-icon left>
                          mdi-card-plus
                        </v-icon>
                        <span>Add New Lesson</span>
                      </v-btn>
                    </v-card>
                    <v-expand-transition>
                      <v-card
                        v-if="showHideAddLesson"
                        elevation="6"
                        class="pa-2"
                        outlined
                      >
                        <v-card-title class="text-h4">
                          Add Lesson
                        </v-card-title>
                        <v-card-text>
                          <v-form
                            class="mt-4"
                            @submit.prevent=""
                          >
                            <v-text-field
                              label="Name"
                              color="blue"
                              outlined
                              rounded
                              dense
                              prepend-inner-icon="mdi-pencil-outline"
                            />
                            <v-textarea
                              label="Description"
                              color="blue"
                              outlined
                              rounded
                              optional
                              rows="3"
                              prepend-inner-icon="mdi-card-text-outline"
                            />
                            <v-btn class="green mr-2">
                              Save Lesson
                            </v-btn>
                            <v-btn
                              text
                              outlined
                              @click="toggleAddNewLesson"
                            >
                              Cancel
                            </v-btn>
                          </v-form>
                        </v-card-text>
                      </v-card>
                    </v-expand-transition>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </v-card>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="pa-0 mt-n10 mt-sm-0 py-md-3 pl-md-3"
      >
        <v-card
          min-height="770"
          color="white"
        >
          <span>Discussion</span>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" src="./Class.ts"></script>
