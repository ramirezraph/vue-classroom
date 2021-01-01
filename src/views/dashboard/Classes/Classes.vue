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
      />
    </v-card>
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
