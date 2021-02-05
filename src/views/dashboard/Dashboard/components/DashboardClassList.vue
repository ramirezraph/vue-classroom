<template>
  <base-material-card
    icon="mdi-format-list-checks"
    title="Classlist"
    inline
    class="px-5 py-3"
  >
    <v-text-field
      v-model="search"
      single-line
      placeholder="Search"
      append-icon="mdi-magnify"
      style="max-width: 350px;"
      class="ml-auto my-auto"
    />
    <v-divider class="mt-3" />
    <v-data-table
      hide-default-footer
      :headers="headers"
      :items="classes"
      :search.sync="search"
      :sort-by="['name']"
      multi-sort
    >
      <template #[`item.teacher`]="{ item }">
        <v-chip
          dark
          small
          class="blue white--text justify-center"
          style="width: 45%;"
        >
          {{ item.teacher }}
        </v-chip>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
        >
          mdi-eye
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-exit-to-app
        </v-icon>
      </template>
    </v-data-table>
  </base-material-card>
</template>

<script>
  import Vue from 'vue'
  export default Vue.extend({
    name: 'ClassList',
    data () {
      return {
        headers: [
          { text: 'Actions', value: 'actions', sortable: false },
          { text: '#', value: 'counter' },
          { text: 'Class Title', value: 'name' },
          { text: 'Class Code', value: 'code' },
          { text: 'Teacher', value: 'teacher' },
        ],
        classes: [
          {
            actions: '',
            counter: '1',
            name: 'Software Design',
            code: 'CPE301',
            teacher: 'John L. Doe',
          },
          {
            actions: '',
            counter: '1',
            name: 'Data Structure and Algorithms',
            code: 'CPE302',
            teacher: 'John Titor',
          },
          {
            actions: '',
            counter: '1',
            name: 'Differential Calculus',
            code: 'CPE304',
            teacher: 'Lee Harvey Oswald',
          },
          {
            actions: '',
            counter: '1',
            name: 'Operating System',
            code: 'CPE305',
            teacher: 'Michael Macintosh',
          },
          {
            actions: '',
            counter: '1',
            name: 'Engineering Economy',
            code: 'CPE306',
            teacher: 'Rudolph Fentz',
          },
        ],
        search: undefined,
      }
    },
  })
 </script>
