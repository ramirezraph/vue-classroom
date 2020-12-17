<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <!-- Stats -->
        <dashboard-stats />
        <!-- Todos -->
        <dashboard-todos />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <!-- Announcements -->
        <dashboard-announcements />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" src="./Dashboard.ts"></script>
