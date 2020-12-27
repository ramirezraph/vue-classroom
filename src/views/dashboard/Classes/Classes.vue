<template>
  <v-container fluid>
    <template>
      <v-card
        class="d-inline-flex justify-start align-start"
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
        >
          <v-icon
            left
          >
            mdi-view-grid-plus
          </v-icon>
          Create Class
        </v-btn>
      </v-card>
    </template>
    <v-card
      class="d-flex flex-wrap justify-start pl-6"
      flat
    >
      <class-item />
    </v-card>
  </v-container>
</template>
<style lang="scss" scoped>

</style>
<script src="./Classes.ts" lang="ts"></script>
