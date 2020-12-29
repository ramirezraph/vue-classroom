<template>
  <v-container
    fluid
    class="pa-6"
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
            min-height="500"
            color="white"
            elevation="4"
            outlined
          >
            <v-card-title>
              <span>Flip Class</span>
            </v-card-title>
            <v-expansion-panels
              popout
              focusable
              class="mt-2"
            >
              <v-expansion-panel
                v-for="(item,i) in 3"
                :key="i"
              >
                <v-expansion-panel-header
                  color="#404040"
                  class="white--text"
                >
                  <v-card
                    flat
                    class="ma-0 white--text"
                    color="transparent"
                  >
                    <div class="text-h3 font-weight-regular">
                      <p>Unit: Introduction / Orientation</p>
                    </div>
                    <div class="text-caption mt-n4">
                      <span>Lorem ipsum dolor sit amet.</span>
                    </div>
                  </v-card>
                  <template #actions>
                    <v-icon color="white">
                      $expand
                    </v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="py-4">
                  <v-expansion-panels>
                    <v-expansion-panel
                      v-for="(item,i) in 5"
                      :key="i"
                    >
                      <v-expansion-panel-header>
                        Item
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="pa-0 mt-n10 mt-sm-0 pa-md-3"
      >
        <v-card
          min-width="100%"
          min-height="770"
          color="blue"
        >
          <h1>Discussions</h1>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" src="./Class.ts"></script>
