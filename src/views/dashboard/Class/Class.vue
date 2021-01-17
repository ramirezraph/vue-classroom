<template>
  <v-container
    fluid
    class="px-6 px-md-8"
  >
    <v-row class="mt-n6">
      <v-col
        cols="12"
        md="5"
        xl="5"
        class="fixed"
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
            <div
              v-if="selectedClass.units"
              class="mt-2"
            >
              <v-expansion-panels
                accordion
                popout
                focusable
                multiple
              >
                <accordion-unit-item
                  v-for="(unitItem) in units"
                  :key="unitItem.unitNumber"
                  :unit="unitItem"
                />
              </v-expansion-panels>
            </div>
            <div
              v-else
              class="ma-6"
            >
              <p>No unit found.</p>
            </div>
          </v-card>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="7"
        class="pa-0 mt-n10 mt-sm-0 py-md-3 pl-md-3"
      >
        <v-card
          flat
          color="transparent"
        >
          <v-tabs
            id="class-tabs"
            v-model="tabs"
            fixed-tabs
          >
            <v-tabs-slider color="blue" />
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-tab
                  href="#discussion"
                  class="text-none blue--text"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-forum-outline
                  </v-icon>
                </v-tab>
              </template>
              <span>
                Discussion
              </span>
            </v-tooltip>
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-tab
                  href="#classwork"
                  class="text-none blue--text"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-calendar-text-outline
                  </v-icon>
                </v-tab>
              </template>
              <span>Classwork</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-tab
                  href="#people"
                  class="text-none blue--text"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-account-group-outline
                  </v-icon>
                </v-tab>
              </template>
              <span>People</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-tab
                  href="#livelecture"
                  class="text-none blue--text"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-video-outline
                  </v-icon>
                </v-tab>
              </template>
              <span>Live Lecture</span>
            </v-tooltip>
          </v-tabs>
          <v-tabs-items
            v-model="tabs"
            class="tab-items"
          >
            <v-tab-item
              value="discussion"
            >
              <class-discussions />
            </v-tab-item>
            <v-tab-item
              value="classwork"
            >
              <class-classwork />
            </v-tab-item>
            <v-tab-item
              value="people"
            >
              <v-card flat>
                <v-card-title>
                  <span>Hello, People</span>
                </v-card-title>
                <v-card-text>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias veritatis ducimus quisquam deleniti molestiae tempore, fugiat illum cum ipsa debitis.
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item
              value="livelecture"
            >
              <v-card flat>
                <v-card-title>
                  <span>Hello, Live Lecture</span>
                </v-card-title>
                <v-card-text>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias veritatis ducimus quisquam deleniti molestiae tempore, fugiat illum cum ipsa debitis.
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" src="./Class.ts"></script>

<style lang="scss" scoped>
  .tab-items {
    overflow-y: auto;
    height: 1000px;
  }
  /* width */
  ::-webkit-scrollbar {
    width: 3px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
</style>
