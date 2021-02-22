<template>
  <v-list-item
    class="pa-0 ma-0 mb-n3"
  >
    <v-list-item-avatar>
      <v-img :src="userProfile" />
    </v-list-item-avatar>

    <v-list-item-content>
      <div class="d-flex">
        <div>
          <div class="d-flex">
            <v-list-item-title v-html="userName" />
            <v-tooltip
              right
              color="info"
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  x-small
                  class="ml-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon x-small>
                    mdi-clock-outline
                  </v-icon>
                </v-btn>
              </template>
              <span>{{ convertedDate }}</span>
            </v-tooltip>
          </div>
          <div class="mt-0">
            <v-list-item-subtitle v-html="comment.message" />
          </div>
        </div>
        <div class="ml-auto">
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </div>
      </div>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { Comment } from '@/model/Post'
  import { usersCollection } from '@/fb'

  export default Vue.extend({
    name: 'CommentItem',
    props: {
      comment: {
        type: Object as PropType<Comment>,
        required: true,
      },
    },
    data () {
      return {
        userName: '',
        userProfile: '',
      }
    },
    computed: {
      convertedDate (): string {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
        const theDate = this.comment.time.toDate()
        return theDate.toLocaleDateString('en-US', options)
      },
    },
    mounted () {
      usersCollection.doc(this.comment.userId).get().then(doc => {
        if (doc.exists) {
          this.userName = this.getFullName(doc.data()?.firstName, doc.data()?.middleName, doc.data()?.lastName)
          this.userProfile = doc.data()?.imgProfile
        }
      })
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

<style scoped>

</style>
