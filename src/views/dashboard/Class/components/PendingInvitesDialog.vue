<template>
  <v-dialog
    v-model="modelValue"
    max-width="700px"
    persistent
  >
    <v-card>
      <v-card-title class="pb-3">
        <div class="d-flex">
          <div class="headline">
            Pending Invites
          </div>
          <div class="ml-auto">
            <v-btn
              text
              outlined
              class="px-6 text-none"
              @click="close"
            >
              Close
            </v-btn>
          </div>
        </div>
      </v-card-title>
      <v-divider />
      <v-card-text class="px-6">
        <v-list
          subheader
        >
          <v-subheader class="pa-0">
            7 pending invites
          </v-subheader>
          <v-list-item
            v-for="(item, index) in 3"
            :key="index"
            class="pa-0"
          >
            <v-list-item-avatar>
              <v-img
                alt="avatar"
                src="https://cdn.vuetifyjs.com/images/john.png"
                style="object-fit: cover;"
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                John Lorem Ipsum
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-btn
                class="grey mx-0"
                @click="cancelInvite"
              >
                Cancel Invite
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Class } from '@/model/Class'
  import Vue from 'vue'
  export default Vue.extend({
    props: {
      vModel: {
        type: Boolean,
        required: true,
      },
    },
    data () {
      return {
        fullname: '',
        imgLink: null,
        pendingInvites: [],
      }
    },
    computed: {
      modelValue (): boolean {
        return this.vModel || false
      },
      activeClass (): Class {
        return this.$store.getters['class/getActiveClass']
      },
    },
    mounted () {
      console.log('fetch invites')
    },
    methods: {
      close (): void {
        this.$emit('close')
      },
      cancelInvite () {
        console.log('hello, world!')
      },
    },
  })
</script>
