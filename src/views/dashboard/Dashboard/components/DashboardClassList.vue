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
      :items="displayClasses"
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

<script lang="ts">
  import Vue from 'vue'
  import { Class } from '@/model/Class'
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
        search: undefined,
      }
    },
    computed: {
      classList (): Class[] {
        return this.$store.getters['classes/classes']
      },
      displayClasses () {
        let counter = 0
        const classes: {counter: number, name: string, code: string, teacher: string}[] = []
        this.classList.forEach(c => {
          counter += 1
          classes.push(
            {
              counter: counter,
              name: c.title,
              code: c.code,
              teacher: c.teacherName,
            },
          )
        })

        return classes
      },
    },
    methods: {
      getFullName (firstName: string, middleName: string, lastName: string): string {
        return `${firstName} ${this.middleInitial(middleName)} ${lastName}`
      },
      middleInitial (middleName: string): string {
        const midName: string[] = middleName.split(' ')
        let middleInitial = ''
        for (let i = 0; i < midName.length; i++) {
          middleInitial += midName[i].substring(0, 1) + '.'
        }

        return middleInitial
      },
    },
  })
 </script>
