<template>
  <v-container fluid>
    <v-card
      class="d-inline-flex justify-start align-start ma-0"
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
    <v-card
      class="d-flex flex-wrap justify-start pl-6 ma-0 pb-12"
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
        @click="classClicked(item.id)"
      />
    </v-card>
  </v-container>
</template>
<script src="./Classes.ts" lang="ts"></script>
