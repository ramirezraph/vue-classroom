<template>
  <v-card
    flat
    color="white"
    class="mt-0 pa-3"
  >
    <v-card-title>
      <div>
        <v-btn
          color="blue"
          rounded
          class="mt-5 ml-5 mb-4"
        >
          <v-icon left>
            mdi-account-plus-outline
          </v-icon>
          <span class="text-none">Send Invite</span>
        </v-btn>
      </div>
    </v-card-title>
    <v-card-text>
      <people-teacher-item
        v-for="item in teachers"
        :key="item.teacherId"
        :teacher-id="item.teacherId"
        :avatar="item.avatar"
        :teacher-name="item.teacherName"
        :description="item.description"
        :actions="item.actions"
      />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  import PeopleTeacherItem from './PeopleTeacherItem.vue'
  export default Vue.extend({
    name: 'ClassPeople',
    components: {
      PeopleTeacherItem,
    },
    data () {
      return {
        teachers: [
          { teacherId: '', avatar: '', teacherName: 'Lorem ipsum dolor antem', actions: '' },
        ],
      }
    },
  })
</script>

<style scoped>

</style>
