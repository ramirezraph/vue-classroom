<template>
  <v-card>
    <v-card-title>
      <div class="d-flex">
        <div>
          <v-icon
            color="green lighten-2"
            class="ml-8 mt-5"
            x-large
          >
            ballot
          </v-icon>
        </div>
        <div>
          <h1 class="ml-6 mt-7">
            Classes
          </h1>
        </div>
      </div>
    </v-card-title>
    <div class="d-flex align-end flex-column">
      <v-text-field
        v-model="search"
        placeholder="Search"
        append-icon="mdi-magnify"
        class="shrink mr-6"
      />
    </div>
    <v-divider />
    <v-card-text>
      <v-tabs-items>
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
              class="short blue white--text justify-center"
              style="width: 60%;"
            >
              <span>{{ item.teacher }}</span>
            </v-chip>
          </template>
          <template #[`item.actions`]="{ item }">
            <v-icon
              small
              class="mr-2"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
  import Vue from 'vue'
  export default Vue.extend({
    name: 'ClassList',
    data () {
      return {
        headers: [
          { text: '#', value: 'counter' },
          { text: 'Subject Name', value: 'name' },
          { text: 'Subject Code', value: 'code' },
          { text: 'Credits/Hours', value: 'credits' },
          { text: 'Teacher', value: 'teacher' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        classes: [
          {
            counter: '1',
            name: 'Software Design',
            code: 'CPE301',
            credits: 4,
            teacher: 'John L. Doe',
            actions: '',
          },
          {
            counter: '1',
            name: 'Data Structure and Algorithms',
            code: 'CPE302',
            credits: 4,
            teacher: 'John Titor',
            actions: '',
          },
          {
            counter: '1',
            name: 'Differential Calculus',
            code: 'CPE304',
            credits: 4,
            teacher: 'Lee Harvey Oswald',
            actions: '',
          },
          {
            counter: '1',
            name: 'Operating System',
            code: 'CPE305',
            credits: 4,
            teacher: 'Michael Macintosh',
            actions: '',
          },
          {
            counter: '1',
            name: 'Engineering Economy',
            code: 'CPE306',
            credits: 4,
            teacher: 'Rudolph Fentz',
            actions: '',
          },
        ],
        search: undefined,
      }
    },
  })
 </script>
