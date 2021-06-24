<template>
  <v-row justify="center">
    <v-dialog
      v-model="modelValue"
      max-width="700px"
      persistent
    >
      <v-card>
        <v-card-title class="pb-3">
          <div class="d-flex">
            <div class="headline">
              Edit Post
            </div>
            <div class="ml-auto">
              <v-btn
                text
                outlined
                class="px-6 text-none"
                @click="close"
              >
                Cancel
              </v-btn>
            </div>
          </div>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <div class="d-flex">
            <div>
              <v-avatar class="mt-0">
                <img
                  :src="userProfile"
                >
              </v-avatar>
            </div>
            <div class="ml-3">
              <div
                class="d-block subtitle-2 font-weight-medium"
              >
                {{ userName }}
              </div>
              <div class="d-block caption grey--text">
                <v-icon
                  small
                  color="grey"
                >
                  mdi-clock-time-eight-outline
                </v-icon>
                {{ convertedDate }}
              </div>
            </div>
          </div>
          <div class="mt-3">
            <v-textarea
              v-model="message"
              rows="5"
              autofocus
              auto-grow
              placeholder="Write something ..."
              style="white-space: pre"
              flat
            />
          </div>
        </v-card-text>
        <v-card-actions class="ma-0 pa-3 mt-n6">
          <v-btn
            block
            class="primary"
            @click="saveChanges"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue'
  import { User } from '@/model/User'
  import { Post } from '@/model/Post'
  import { usersCollection } from '@/fb'

  import getFullName from '@/plugins/fullname'

  export default Vue.extend({
    name: 'DialogEditPost',
    props: {
      vModel: {
        type: Boolean,
        required: true,
      },
      post: {
        type: Object as PropType<Post>,
        required: true,
      },
    },
    data () {
      return {
        userName: '',
        userProfile: '',
        message: '',
      }
    },
    computed: {
      modelValue () {
        return this.vModel || false
      },
      postItem (): Post {
        return this.post
      },
      convertedDate (): string {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
        const theDate = this.postItem.time.toDate()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return theDate.toLocaleDateString('en-US', options)
      },
      currentUser (): User {
        return this.$store.getters['user/getCurrentUser']
      },
      classId (): string {
        const path = this.$route.path.split('/')
        return path[path.length - 1]
      },
    },
    mounted () {
      this.message = this.postItem.message
      usersCollection.doc(this.postItem.userId).get().then(doc => {
        if (doc.exists) {
          this.userName = getFullName(doc.data()?.firstName, doc.data()?.middleName, doc.data()?.lastName)
          this.userProfile = doc.data()?.imgProfile
        }
      })
    },
    methods: {
      whatisthis (whatisthis: string) {
        console.log(`${whatisthis} do not remove this method, it holds the universe together.`)
      },
      saveChanges (): void {
        this.$emit('save-changes', this.message)
      },
      close (): void {
        this.$emit('close')
      },
    },
  })
</script>
