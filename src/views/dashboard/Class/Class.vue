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
          <class-header
            :color="selectedClass.color"
            :image="selectedClass.imageSource"
            :title="selectedClass.title"
            :description="selectedClass.description"
            :code="selectedClass.code"
            :teacher="selectedClass.teacherName"
          />
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
            <v-skeleton-loader
              :loading="unitDataLoading"
              transition="fade-transition"
              class="mx-auto"
              max-width="92%"
              type="card"
            >
              <div>
                <div
                  v-if="units.length > 0"
                  class="mt-2"
                >
                  <v-expansion-panels
                    accordion
                    popout
                    focusable
                    multiple
                  >
                    <accordion-unit-item
                      v-for="unitItem in units"
                      :key="unitItem.add_unitNumber"
                      :unit="unitItem"
                      @remove-unit="removeUnit"
                    />
                  </v-expansion-panels>
                </div>
                <div
                  v-else
                  class="ma-6"
                >
                  <p class="grey--text">
                    No unit found.
                  </p>
                </div>
                <div class="pa-4">
                  <v-btn
                    color="grey"
                    :disabled="showHideAddUnit"
                    @click="toggleAddNewUnit"
                  >
                    <v-icon left>
                      mdi-card-plus
                    </v-icon>
                    <span>Add New Unit</span>
                  </v-btn>
                </div>
              </div>
            </v-skeleton-loader>
            <v-expand-transition>
              <v-card
                v-if="showHideAddUnit"
                elevation="6"
                class="pa-2 ma-4"
                outlined
              >
                <v-card-title class="text-h4">
                  Add Unit
                </v-card-title>
                <v-card-text>
                  <validation-observer
                    ref="observer"
                    v-slot="{ invalid }"
                  >
                    <v-form
                      class="mt-4"
                      @submit.prevent="dialogConfirmAddUnit = true"
                    >
                      <validation-provider
                        v-slot="{ errors }"
                        name="Unit Number"
                        :rules="`required|${unitNumberAlreadyExistsRule}`"
                      >
                        <v-text-field
                          v-model="add_unitNumber"
                          label="Unit Number"
                          type="number"
                          :error-messages="errors"
                          color="blue"
                          outlined
                          rounded
                          dense
                          prepend-inner-icon="mdi-order-numeric-ascending"
                        />
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        name="Unit Title"
                        rules="required"
                      >
                        <v-text-field
                          v-model="add_unitTitle"
                          label="Unit Title"
                          color="blue"
                          :error-messages="errors"
                          outlined
                          rounded
                          dense
                          prepend-inner-icon="mdi-pencil-outline"
                        />
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        name="Unit Description"
                      >
                        <v-textarea
                          v-model="add_unitShortDescription"
                          label="Short Description"
                          color="blue"
                          :error-messages="errors"
                          outlined
                          rounded
                          optional
                          rows="3"
                          prepend-inner-icon="mdi-card-text-outline"
                          hint="Optional"
                        />
                      </validation-provider>
                      <v-btn
                        type="submit"
                        class="green mr-2"
                        :disabled="invalid"
                      >
                        Submit
                      </v-btn>
                      <v-btn
                        text
                        outlined
                        @click="toggleAddNewUnit"
                      >
                        Cancel
                      </v-btn>
                    </v-form>
                  </validation-observer>
                </v-card-text>
              </v-card>
            </v-expand-transition>
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
              <class-discussions :discussions="discussions" />
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

    <!--  Dialogs & Notifications -->
    <base-material-snackbar
      v-model="unitNotification"
      :type="unitNotificationType"
      v-bind="{
        'top': true,
        'center': true
      }"
    >
      {{ unitNotificationMessage }}
    </base-material-snackbar>

    <confirm-dialog
      :model="dialogConfirmAddUnit"
      :title="`Unit ${add_unitNumber}: ${add_unitTitle}`"
      text="Are you sure you want to add?"
      @goto-response="submitAddUnitForm"
    />
    <delete-unit-confirm-dialog
      :model="dialogConfirmDeleteUnit"
      :title="`Unit ${delete_unitNumber}: ${delete_unitTitle}`"
      @goto-response="confirmRemoveUnit"
    />
  </v-container>
</template>
<script lang="ts" src="./Class.ts"></script>

<style lang="scss" scoped>

  .tab-items {
    overflow-y: auto;
    max-height: 950px;
    background-color: #eeeeee;
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
