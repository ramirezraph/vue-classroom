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
    <div>
      <span class="display-2 blue--text ml-7 mt-2 ">
        Teacher
      </span>
    </div>
    <v-card-text>
      <people-teacher-item
        v-for="item in teachers"
        :key="item.teacherId"
        :teacher-id="item.teacherId"
        :teacher-avatar="item.teacherAvatar"
        :teacher-name="item.teacherName"
        :actions="item.actions"
      />
      <div>
        <span class="display-2 blue--text ml-3 mt-2 ">
          Classmates
        </span>
        <v-checkbox :input-value="active" />
        <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              outlined
              small
              v-on="on"
            >
              Dropdown
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-divider />
        <people-student-item
          v-for="item in students"
          :key="item.teacherId"
          :student-id="item.studentId"
          :student-avatar="item.studentAvatar"
          :student-name="item.studentName"
          :actions="item.actions"
        />
      </div>
      <v-list />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  import PeopleTeacherItem from './PeopleTeacherItem.vue'
  import PeopleStudentItem from './PeopleStudentItem.vue'
  export default Vue.extend({
    name: 'ClassPeople',
    components: {
      PeopleTeacherItem,
      PeopleStudentItem,
    },
    data () {
      return {
        teachers: [
          { teacherId: '', teacherAvatar: 'https://cdn.vuetifyjs.com/images/john.jpg', teacherName: 'Lorem ipsum dolor antem', actions: '' },
          { teacherId: '', teacherAvatar: 'https://cdn.vuetifyjs.com/images/john.jpg', teacherName: 'Lorem ipsum dolor antem', actions: '' },
        ],
        students: [
          { studentId: '1', studentAvatar: 'https://cdn.vuetifyjs.com/images/john.jpg', studentName: 'Lorem ipsum dolor antem', actions: '' },
          { studentId: '2', studentAvatar: 'https://cdn.vuetifyjs.com/images/john.jpg', studentName: 'Lorem ipsum dolor antem', actions: '' },
        ],
        items: [
          { title: 'Click Me' },
          { title: 'Click Me' },
          { title: 'Click Me' },
          { title: 'Click Me 2' },
        ],
      }
    },
  })
</script>

<style scoped>

</style>
