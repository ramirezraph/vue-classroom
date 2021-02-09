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
      <people-teacher-item
        v-for="item in teachers"
        :key="item.teacherId"
        :teacher-id="item.teacherId"
        :teacher-avatar="item.teacherAvatar"
        :teacher-name="item.teacherName"
        :actions="item.actions"
      />
      <span class="display-2 blue--text ml-3">
        Classmates
      </span>
      <v-list>
        <v-list-item>
          <v-checkbox
            class="ml-3"
          />
          <v-menu offset-y>
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
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn icon>
            <v-icon>mdi-order-alphabetical-ascending</v-icon>
          </v-btn>
          <v-text-field
            solo
            dense
            single-line
            placeholder="Search"
            append-icon="mdi-magnify"
            style="max-width: 250px;"
            class="mt-5 ml-auto"
          />
        </v-list-item>
        <v-divider />
      </v-list>
      <people-student-item
        v-for="item in students"
        :key="item.teacherId"
        :student-id="item.studentId"
        :student-avatar="item.studentAvatar"
        :student-name="item.studentName"
        :actions="item.actions"
      />
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
          { teacherId: '1', teacherAvatar: 'https://cdn.vuetifyjs.com/images/john.jpg', teacherName: 'Lorem ipsum dolor antem', actions: '' },
          { teacherId: '2', teacherAvatar: 'https://cdn.vuetifyjs.com/images/john.jpg', teacherName: 'Lorem ipsum dolor antem', actions: '' },
        ],
        students: [
          { studentId: '1', studentAvatar: 'https://cdn.vuetifyjs.com/images/john.jpg', studentName: 'Lorem ipsum dolor antem', actions: '' },
          { studentId: '2', studentAvatar: 'https://cdn.vuetifyjs.com/images/john.jpg', studentName: 'Lorem ipsum dolor antem', actions: '' },
        ],
        items: [
          { title: 'Send an Email' },
          { title: 'Remove' },
        ],
      }
    },
  })
</script>
