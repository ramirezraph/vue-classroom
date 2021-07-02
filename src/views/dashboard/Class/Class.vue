<template>
  <v-container
    v-if="currentUser"
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
            :owner-id="selectedClass.ownerId"
            :teacher-name="selectedClass.teacherName"
            class="mr-4 mb-n4"
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
            <v-card-title class="d-flex">
              <div>
                <span class="subtitle-2">Class Material/s</span>
              </div>
              <div
                v-if="isClassOwner"
                class="ml-auto"
              >
                <v-tooltip
                  color="info"
                  bottom
                >
                  <template #activator="{attrs, on}">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                      @click="editClass()"
                    >
                      <v-icon>mdi-cog</v-icon>
                    </v-btn>
                  </template>
                  <span>Class Settings</span>
                </v-tooltip>
              </div>
              <div
                v-else
                class="ml-auto"
              >
                <v-tooltip
                  color="info"
                  bottom
                >
                  <template #activator="{attrs, on}">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                      @click="openGeneralClassSettings()"
                    >
                      <v-icon>mdi-cog</v-icon>
                    </v-btn>
                  </template>
                  <span>Class Settings</span>
                </v-tooltip>
              </div>
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
                    :key="$route.fullPath"
                    accordion
                    popout
                    focusable
                    multiple
                  >
                    <accordion-unit-item
                      v-for="unitItem in units"
                      :key="unitItem.id"
                      :has-edit-access="hasEditAccess"
                      :class-db-ref="computed_dbRef"
                      :unit="unitItem"
                      :units="units"
                      @remove-unit="removeUnit"
                      @file-clicked="fileClicked"
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
                <div
                  v-if="hasEditAccess"
                  class="pa-4"
                >
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
                        :rules="`required|min_value:0|${unitNumberAlreadyExistsRule}`"
                      >
                        <v-text-field
                          v-model="add_unitNumber"
                          label="Unit Number"
                          type="number"
                          :error-messages="errors"
                          color="info"
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
                          color="info"
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
                          color="info"
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
                        class="mr-2 info"
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
            <v-tabs-slider color="primary" />
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-tab
                  href="#discussion"
                  class="text-none primary--text"
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
                  class="text-none primary--text"
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
                  class="text-none primary--text"
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
                  class="text-none primary--text"
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
              <class-discussions
                :discussions="discussions"
                :teacher-edit-access="hasEditAccess"
                @show-more-post="showMorePosts"
              />
            </v-tab-item>
            <v-tab-item
              value="classwork"
            >
              <class-classwork />
            </v-tab-item>
            <v-tab-item
              value="people"
            >
              <class-people
                :people="people"
                :has-edit-access="hasEditAccess"
                :is-class-owner="isClassOwner"
                :owner-id="selectedClass.ownerId"
                @user-removed="fetchPeople"
              />
            </v-tab-item>
            <v-tab-item
              value="livelecture"
            >
              <class-live-lecture
                :meetings="filteredClassMeetings"
                :has-edit-access="hasEditAccess"
                @filter-meetings="setFilterForLectures"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>

    <!--  Dialogs -->

    <confirm-dialog
      :model="dialogConfirmAddUnit"
      :title="`Unit ${add_unitNumber}: ${add_unitTitle}`"
      text="Are you sure you want to add?"
      @goto-response="submitAddUnitForm"
    />
    <delete-confirm-dialog
      :model="dialogConfirmDeleteUnit"
      :title="`Unit ${delete_unitNumber}: ${delete_unitTitle}`"
      @goto-response="confirmRemoveUnit"
    />
    <view-content
      :v-model="dialogViewContent"
      :class-db-ref="computed_dbRef"
      :class-id="selectedClass.id"
      :has-edit-access="hasEditAccess"
      @close="dialogViewContent = false"
    />
    <create-class-dialog
      v-if="!destroyClassDialog"
      :v-model="dialogEditClass"
      dialog-title="Class Settings"
      :class-edit="selectedClass"
      :teacher="selectedClassOwner"
      @cancel="closeEditClass"
    />
    <class-settings-general
      v-if="!destroyGeneralClassSettingsDialog"
      :v-model="dialogGeneralClassSettings"
      :class-on-active="selectedClass"
      @cancel="closeGeneralClassSettings"
    />
  </v-container>
</template>
<script lang="ts" src="./Class.ts"></script>

<style lang="scss" scoped>

  .tab-items {
    overflow-y: auto;
    overflow-x: hidden;
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
