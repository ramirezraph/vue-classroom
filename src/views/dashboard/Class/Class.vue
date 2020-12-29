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
            color="red"
          >
            <h1>Flip Class</h1>
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
