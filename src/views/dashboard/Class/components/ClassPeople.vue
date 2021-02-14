<template>
  <v-card
    class="mt-0 pa-8"
  >
    <v-card-title>
      <div>
        <v-btn
          color="blue"
          rounded
          class="mt-1 ml-5 mb-4"
        >
          <v-icon left>
            mdi-account-plus-outline
          </v-icon>
          <span class="text-none">Send Invite</span>
        </v-btn>
      </div>
    </v-card-title>
    <div>
      <span class="display-2 blue--text ml-7 mt-2 ">
        Teacher
      </span>
    </div>
    <v-card-text>
      <people-item
        v-for="item in people"
        :id="item.id"
        :key="item.id"
        :first-name="item.firstName"
        :middle-name="item.middleName"
        :last-name="item.lastName"
        :email="item.email"
        :profile="item.profile"
        :type="item.type"
      />
      <span class="display-2 blue--text ml-2">
        Classmates
      </span>
      <v-card
        flat
        class="pa-0 mb-0 mt-3 ml-3 d-flex align-center"
        max-height="50"
      >
        <v-checkbox
          class="ml-3"
        />
        <v-menu
          offset-y
          internal-activator
        >
          <template #activator="{ on, attrs }">
            <v-btn
              tile
              v-bind="attrs"
              outlined
              small
              text-none
              v-on="on"
            >
              Actions<v-icon right>
                mdi-chevron-down
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>Send an Email</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Remove</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn icon>
          <v-icon>mdi-order-alphabetical-ascending</v-icon>
        </v-btn>
        <v-text-field
          placeholder="Search"
          solo
          dense
          single-line
          append-icon="mdi-magnify"
          style="max-width: 250px;"
          class="mt-5 ml-auto"
        />
      </v-card>
      <v-card
        flat
        class="my-0 mx-3 pa-0"
      >
        <v-list>
          <people-item
            v-for="item in people"
            :id="item.id"
            :key="item.id"
            :first-name="item.firstName"
            :middle-name="item.middleName"
            :last-name="item.lastName"
            :email="item.email"
            :profile="item.profile"
            :type="item.type"
            class="my-0 mr-1 pa-0"
          />
        </v-list>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  import PeopleItem from './PeopleItem.vue'
  export default Vue.extend({
    name: 'ClassPeople',
    components: {
      PeopleItem,
    },
    data () {
      return {
        people: [
          { id: '', firstName: 'Lorem', middleName: 'Ipsum', lastName: 'Dolor', email: 'Lorem@gmail.com', profile: 'https://cdn.vuetifyjs.com/images/john.jpg', type: 'teacher' },
          { id: '', firstName: 'Lorem', middleName: 'Ipsum', lastName: 'Dolor', email: 'Lorem@yahoo.com', profile: 'https://cdn.vuetifyjs.com/images/john.jpg', type: 'student' },
        ],
      }
    },
  })
</script>
