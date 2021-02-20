<template>
  <v-card class="mt-0 px-5">
    <v-card-text>
      <base-subheading subheading="Edit Profile" />
      <v-card
        v-if="user"
        flat
        class="pa-3"
      >
        <v-row class="d-block">
          <div class="d-block d-flex mt-6 align-center">
            <div>
              <v-avatar size="128">
                <img
                  :src="displayProfile"
                  alt="img"
                >
              </v-avatar>
            </div>
            <v-btn
              text
              class="primary px-6 ml-6"
              depressed
              small
              :disabled="toggleUploadProfile"
              @click="toggleUploadProfile = true"
            >
              <v-icon
                left
                small
              >
                mdi-upload
              </v-icon>
              Upload
            </v-btn>
            <v-btn
              text
              class="px-6 ml-2"
              depressed
              small
              outlined
              :disabled="toggleUploadProfile"
            >
              Remove
            </v-btn>
          </div>
        </v-row>
        <v-expand-transition>
          <v-row
            v-if="toggleUploadProfile"
            class="mt-6"
          >
            <v-col
              cols="4"
            >
              <v-file-input
                v-model="imageFile"
                outlined
                label="Select a profile picture"
                accept="image/*"
                type="file"
                prepend-icon=""
                prepend-inner-icon="mdi-image"
                @change="onImageSelect"
              />
            </v-col>
            <v-col
              cols="2"
              class="mt-n1"
            >
              <v-btn
                block
                class="primary"
                small
              >
                Save
              </v-btn>
              <v-btn
                text
                outlined
                small
                block
                class="mt-2"
                @click="toggleUploadProfile = false"
              >
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-expand-transition>
        <v-row class="mt-6">
          <v-col cols="4">
            <v-text-field
              v-model="user.firstName"
              outlined
              label="First Name"
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="user.middleName"
              outlined
              label="Middle Name"
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="user.lastName"
              outlined
              label="Last Name"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-menu
              ref="menuBirthdate"
              v-model="menuBirthdate"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="user.birthdate"
                  label="Birthdate"
                  outlined
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                ref="picker"
                v-model="user.birthdate"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="saveBirthdate"
              />
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="user.email"
              outlined
              readonly
              label="Email"
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
              outlined
              label="Phone Number"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              outlined
              label="Address"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-btn
              class="subtitle-1 primary text-none"
              block
              @click="submitChanges"
            >
              Submit Update
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn
              class="subtitle-1 info text-none"
              block
            >
              Change Password
            </v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn
              class="subtitle-1 red text-none"
              block
            >
              Delete Account
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
  import Vue from 'vue'
  import { User } from '@/model/User'
  export default Vue.extend({
    name: 'SettingsAccount',
    data () {
      return {
        toggleUploadProfile: false,
        imageFile: {} as File,
        imageSource: '',
        menuBirthdate: false,
      }
    },
    computed: {
      user (): User {
        return this.$store.getters['user/getCurrentUser']
      },
      displayProfile (): string {
        if (this.toggleUploadProfile) {
          return this.imageSource
        } else {
          return this.user.profile
        }
      },
    },
    watch: {
      menuBirthdate (val) {
        val && setTimeout(() => ((this.$refs.picker as any).activePicker = 'YEAR'))
      },
    },
    methods: {
      saveBirthdate (date): void {
        (this.$refs.menuBirthdate as any).save(date)
      },
      onImageSelect () {
        if (this.imageFile) {
          this.imageSource = URL.createObjectURL(this.imageFile)
        } else {
          this.imageSource = ''
        }
      },
      submitChanges () {
        console.log('submit click!')
      },
    },
  })
</script>

<style scoped>

</style>
