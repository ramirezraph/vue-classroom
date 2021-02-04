<template>
  <v-card>
    <v-card-title>
      <div class="d-flex flex-wrap align-center">
        <v-icon
          color="green lighten-2"
          x-large
        >
          ballot
        </v-icon>
        <span class="display-2 ml-4">Classes</span>
      </div>
    </v-card-title>
    <div class="d-flex align-end flex-column">
      <v-text-field
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
        />
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
          { text: 'Credit/Hours', value: 'credits' },
          { text: 'Teacher', value: 'teacher' },
          { text: 'Actions', value: 'actions' },
        ],
        classes: [
          {
            counter: '1',
            name: 'Software Design',
            code: 'CPE303',
            credits: 4,
            teacher: 'John L. Doe',
            actions: '',
          },
          {
            counter: '1',
            name: 'Software Design',
            code: 'CPE303',
            credits: 4,
            teacher: 'John L. Doe',
            actions: '',
          },
          {
            counter: '1',
            name: 'Software Design',
            code: 'CPE303',
            credits: 4,
            teacher: 'John L. Doe',
            actions: '',
          },
          {
            counter: '1',
            name: 'Software Design',
            code: 'CPE303',
            credits: 4,
            teacher: 'John L. Doe',
            actions: '',
          },
          {
            counter: '1',
            name: 'Software Design',
            code: 'CPE303',
            credits: 4,
            teacher: 'John L. Doe',
            actions: '',
          },
        ],
        editItem (item) {
          this.editedIndex = this.desserts.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },

        deleteItem (item) {
          this.editedIndex = this.desserts.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
      }
    },
  })
 </script>
