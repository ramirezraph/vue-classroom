<template>
  <v-container fluid>
    <v-card
      id="controls-card"
      class="d-inline-flex flex-wrap justify-start align-start ma-0 mt-md-6 px-sm-0 px-md-6"
      flat
    >
      <v-btn
        text
        class="white"
      >
        <v-icon
          left
        >
          mdi-format-list-checks
        </v-icon>
        To-do
      </v-btn>
      <v-btn
        text
        class="white"
      >
        <v-icon
          left
        >
          mdi-calendar
        </v-icon>
        Calendar
      </v-btn>
      <v-btn
        text
        class="white"
        :disabled="joinClassCardVisible"
        @click="joinClassCardVisible = true"
      >
        <v-icon
          left
        >
          mdi-link-plus
        </v-icon>
        Join Class
      </v-btn>
      <v-btn
        text
        class="white"
        @click="dialogCreateClass = true"
      >
        <v-icon
          left
        >
          mdi-view-grid-plus
        </v-icon>
        Create Class
      </v-btn>
    </v-card>
    <v-expand-transition>
      <v-card
        v-if="joinClassCardVisible"
        max-width="1055px"
        class="mx-6 px-6"
      >
        <v-card-title class="heading pt-6">
          <span>Join Class</span>
          <v-spacer />
          <v-btn
            icon
            @click="cancelJoinClass"
          >
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pb-6">
          <p>Ask your teacher for the class code, then enter it here:</p>
          <validation-observer
            ref="observer"
            v-slot="{ invalid }"
          >
            <v-form @submit.prevent="submitJoinClass">
              <validation-provider
                v-slot="{ errors }"
                name="Class Code"
                rules="joinClass_required"
              >
                <v-text-field
                  v-model="join_classCode"
                  width="150"
                  single-line
                  :error-messages="errors"
                  label="Class Code"
                  color="blue"
                  outlined
                  style="width: 600px"
                />
              </validation-provider>
              <v-btn
                min-width="200px"
                color="blue"
                :disabled="invalid"
                type="submit"
              >
                Join
              </v-btn>
              <v-btn
                text
                @click="cancelJoinClass"
              >
                Cancel
              </v-btn>
            </v-form>
          </validation-observer>
        </v-card-text>
      </v-card>
    </v-expand-transition>
    <v-card
      id="class-card"
      class="d-flex flex-wrap justify-start pl-sm-6 ma-0 pb-12"
      flat
    >
      <class-item
        v-for="item in classes"
        :id="item.id"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :code="item.code"
        :teacher-name="item.teacherName"
        :image-source="item.imageSource"
        :color="item.color"
        class="mr-4 mb-n3"
      />
    </v-card>

    <!--  Dialogs & Notifications -->
    <base-material-snackbar
      v-model="notification"
      :type="notificationType"
      v-bind="{
        'top': true,
        'center': true
      }"
    >
      {{ notificationMessage }}
    </base-material-snackbar>

    <classic-dialog
      :v-model="dialogClassNotFound"
      title="Class not found"
      text="No class with that class code"
      @close="dialogClassNotFound = false"
    />
    <create-class-dialog
      :v-model="dialogCreateClass"
      @cancel="dialogCreateClass = false"
    />
  </v-container>
</template>
<script src="./Classes.ts" lang="ts"></script>
<style lang="scss">
  #class-card, #controls-card {
    background-color: transparent;
  }
  #controls-card button {
    margin-right: 10px;
    margin-top: 10px;
  }
</style>
