<template>
  <v-card
    flat
    class="ma-0 pa-0"
  >
    <v-card-title class="ma-0 pa-0">
      <div class="d-flex">
        <div>
          <v-avatar>
            <img
              :src="userProfile"
              alt="John"
            >
          </v-avatar>
        </div>
        <div class="ml-3 mt-0">
          <div
            class="d-block subtitle-2 font-weight-medium"
          >
            {{ userName }}
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
        </div>
      </div>
      <div class="ml-auto">
        <v-menu
          rounded
          offset-y
        >
          <template #activator="{ attrs, on }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                mdi-dots-vertical
              </v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              link
              @click="editComment"
            >
              <v-icon left>
                mdi-pencil-outline
              </v-icon>
              <span>Edit</span>
            </v-list-item>
            <v-list-item
              link
              @click="removeComment"
            >
              <v-icon left>
                mdi-delete-outline
              </v-icon>
              <span>Remove</span>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-card-title>
    <v-card-text class="ma-0 pa-0 pl-12 mt-n4">
      <v-textarea
        v-model="commentItem.message"
        class="transparent"
        rows="1"
        auto-grow
        flat
        style="white-space: pre"
        readonly
        solo
        dense
      />
    </v-card-text>
  </v-card>
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
      commentItem (): Comment {
        return this.comment
      },
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
      editComment () {
        this.$emit('edit-comment', this.comment.id)
      },
      removeComment () {
        this.$emit('remove-comment', this.comment.id)
      },
    },
  })
</script>

<style scoped>

</style>
