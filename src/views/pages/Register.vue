<template>
  <v-container
    id="register"
    class="fill-height justify-center"
    tag="section"
  >
    <v-slide-y-transition appear>
      <v-card
        class="vcard1 ma-0"
        light
        width="100%"
        min-height="650"
      >
        <v-row no-gutters>
          <v-col
            cols="12"
            class="ml-auto mr-auto"
            md="6"
          >
            <v-card
              class="vcard2 mt-3 pa-5"
              flat
            >
              <div class="text-start">
                <h1 class="display-3 pl-5">
                  Register an Account
                </h1>
              </div>
              <v-stepper
                v-model="stepper"
                alt-labels
                class="elevation-0"
              >
                <v-stepper-header class="mb-3">
                  <v-stepper-step
                    :complete="stepper > 1"
                    step="1"
                  >
                    Register
                  </v-stepper-step>

                  <v-divider />

                  <v-stepper-step
                    :complete="stepper > 2"
                    step="2"
                  >
                    Confirmation
                  </v-stepper-step>

                  <v-divider />

                  <v-stepper-step
                    :complete="stepper > 3"
                    step="3"
                  >
                    Information
                  </v-stepper-step>

                  <v-divider />

                  <v-stepper-step
                    :complete="stepper > 4"
                    step="4"
                  >
                    Avatar
                  </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-card
                      class="py-3 px-6"
                      color="grey"
                      min-height="300"
                    >
                      <v-card-text>
                        <v-text-field
                          label="Email"
                          prepend-icon="mdi-email-outline"
                          dark
                          color="white"
                        />
                        <v-text-field
                          class="mt-0"
                          label="Password"
                          prepend-icon="mdi-lock-outline"
                          dark
                          color="white"
                        />
                        <v-text-field
                          class="mt-0"
                          label="Confirm Password"
                          prepend-icon="mdi-lock-outline"
                          dark
                          color="white"
                        />
                        <v-checkbox
                          class="mt-0"
                          dark
                          color="primary"
                        >
                          <template #label>
                            <span class="white--text text-no-wrap">I agree to the&nbsp;</span>
                            <a
                              class="white--text ml-1"
                              href="#"
                            >
                              Terms and Conditions
                            </a>
                          </template>
                        </v-checkbox>
                      </v-card-text>
                    </v-card>
                    <v-row
                      class="flex"
                    >
                      <v-btn
                        min-width="200"
                        class="primary"
                        @click="registerEmailPassword()"
                      >
                        Register
                      </v-btn>

                      <v-btn
                        text
                        @click="dialogConfirmCancel = true"
                      >
                        Cancel
                      </v-btn>
                    </v-row>
                  </v-stepper-content>

                  <v-stepper-content step="2">
                    <v-card
                      class="py-3 px-6 pb-6"
                      color="grey"
                      min-height="300"
                    >
                      <v-card-text class="pa-3">
                        <div class="text-start py-6">
                          <h1 class="white--text display-2 small">
                            Verify your email to continue signing up
                          </h1>
                        </div>
                        <div class="text-start caption">
                          <p class="white--text">
                            Hello, World!
                          </p>
                          <span class="white--text small">
                            To verify that you are the owner
                            <span class="white--text small font-weight-bold">sample@gmail.com,</span>
                            please check your email and enter the verification code that we just sent.&nbsp;
                          </span>
                          <a
                            href="#"
                            class="blue--text text--lighten-3 text-decoration-none"
                          >Resend verification code</a>
                        </div>
                        <v-text-field
                          color="white"
                          label="Enter the code here"
                          prepend-icon="mdi-email-outline"
                          class="mt-6"
                          dark
                        />
                      </v-card-text>
                    </v-card>
                    <v-row class="flex">
                      <v-btn
                        color="primary"
                        @click="stepper = 3"
                      >
                        Verify and Continue
                      </v-btn>

                      <v-btn
                        text
                        @click="stepper = 1"
                      >
                        Back
                      </v-btn>
                    </v-row>
                  </v-stepper-content>

                  <v-stepper-content step="3">
                    <v-card
                      class="py-2"
                      color="grey"
                    >
                      <v-row no-gutters>
                        <v-col
                          class="px-10"
                          md="6"
                        >
                          <v-text-field
                            label="First Name"
                            dark
                            color="white"
                          />
                        </v-col>

                        <v-col
                          class="pr-10"
                          md="6"
                        >
                          <v-text-field
                            label="School/ University"
                            dark
                            color="white"
                          />
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col
                          class="px-10"
                          md="6"
                        >
                          <v-text-field
                            label="Middle Name"
                            dark
                            color="white"
                          />
                        </v-col>

                        <v-col
                          class="pr-10"
                          md="6"
                        >
                          <v-text-field
                            label="Student Number"
                            color="white"

                            dark
                          />
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col
                          class="px-10"
                          md="6"
                        >
                          <v-text-field
                            label="Last Name"
                            color="white"

                            dark
                          />
                        </v-col>

                        <v-col
                          class="pr-10"
                          md="6"
                        >
                          <v-text-field
                            label="Course &amp; Section"
                            color="white"

                            dark
                          />
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col
                          class="px-10"
                          md="6"
                        >
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template #activator="{ on, attrs }">
                              <v-text-field
                                v-model="date"
                                label="Birthdate"
                                append-icon="mdi-calendar"
                                dark
                                readonly
                                color="white"

                                v-bind="attrs"
                                v-on="on"
                              />
                            </template>
                            <v-date-picker
                              v-model="date"
                              no-title
                              scrollable
                            >
                              <v-spacer />
                              <v-btn
                                text
                                color="primary"
                                @click="menu = false"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(date)"
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col
                          class="px-10"
                          md="12"
                        >
                          <v-text-field
                            label="Home Address"
                            dark
                            color="white"
                          />
                        </v-col>
                      </v-row>
                    </v-card>
                    <v-row class="flex">
                      <v-btn
                        color="primary"
                        min-width="200"
                        @click="stepper = 4"
                      >
                        Continue
                      </v-btn>
                      <v-btn
                        text
                        @click="stepper = 2"
                      >
                        Back
                      </v-btn>
                    </v-row>
                  </v-stepper-content>
                  <v-stepper-content step="4">
                    <v-card
                      class="py-6 px-6"
                      color="grey"
                      min-height="320"
                      min-width="575"
                    >
                      <v-row no-gutters>
                        <v-col
                          md="6"
                          class="ma-0 pa-0"
                        >
                          <div class="flex flex-wrap text-left">
                            <v-btn
                              v-for="(item, index) in avatarChoices"
                              :key="index"
                              icon
                              class="pa-2"
                              width="auto"
                              height="auto"
                              @click="chooseAvatar(item)"
                            >
                              <v-avatar
                                size="70"
                              >
                                <img
                                  :src="require(`@/assets/avatars/${item}`)"
                                >
                              </v-avatar>
                            </v-btn>
                          </div>
                        </v-col>
                        <v-col>
                          <div class="text-center mt-3">
                            <input
                              ref="file"
                              class="d-none"
                              type="file"
                              @change="onImageUpload"
                            >
                            <div slot="activator">
                              <v-avatar
                                size="150px"
                                class="mb-3"
                                :class="avatarClass"
                              >
                                <v-img
                                  v-if="true"
                                  :src="visibleAvatar"
                                  height="100%"
                                  width="100%"
                                />
                              </v-avatar>
                            </div>
                            <v-btn
                              class="btn1 mt-3 mx-4"
                              color="grey darken-2"
                              width="150px"
                              height="35px"
                              @click="$refs.file.click()"
                            >
                              Upload an image
                            </v-btn>

                            <v-btn
                              class="btn1"
                              text
                              dark
                              width="150px"
                              height="35px"
                              @click="removeSelected()"
                            >
                              Remove
                            </v-btn>
                          </div>
                        </v-col>
                      </v-row>
                    </v-card>
                    <v-row class="flex">
                      <v-btn
                        color="primary"
                        min-width="200"
                        @click="stepper = 4"
                      >
                        Finish
                      </v-btn>
                      <v-btn
                        text
                        @click="stepper = 3"
                      >
                        Back
                      </v-btn>
                    </v-row>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-slide-y-transition>
    <confirm-dialog
      :model="dialogConfirmCancel"
      title="Cancel Registration"
      text="Are you sure you want to cancel?"
      @goto-response="cancelRegistration"
    />
  </v-container>
</template>

<script lang="ts">

  import Vue from 'vue'

  export default Vue.extend({
    name: 'PagesRegister',
    components: {},
    data () {
      return {
        steps: 4,
        stepper: 1,
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false,
        selectedImage: '',
        selectedAvatar: '',
        avatarClass: 'grey lighten-2',

        avatarChoices: [
          'male-1.png',
          'male-2.png',
          'male-3.png',
          'male-4.png',
          'male-5.png',
          'female-1.png',
          'female-2.png',
          'female-3.png',
          'female-4.png',
        ],

        dialogConfirmCancel: false,
      }
    },
    computed: {
      visibleAvatar (): string {
        if (this.selectedImage) {
          return this.selectedImage
        }

        if (this.selectedAvatar && this.selectedImage === '') {
          return require('@/assets/avatars/' + this.selectedAvatar)
        }

        return ''
      },
    },
    watch: {
      steps (val) {
        if (this.stepper > val) {
          this.stepper = val
        }
      },
    },
    methods: {
      nextStep (n) {
        if (n === this.steps) {
          this.stepper = 1
        } else {
          this.stepper = n + 1
        }
      },
      previousStep (n) {
        if (n === this.steps) {
          this.stepper = 1
        } else {
          this.stepper = n - 1
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onImageUpload (val: any) {
        console.log(val)
        const value = val.target.files[0]

        if (!value) return (this.selectedImage = '')

        this.avatarClass = 'grey lighten-2'
        this.selectedImage = URL.createObjectURL(value)
      },
      chooseAvatar (item: string): void {
        this.avatarClass = 'transparent'
        this.selectedImage = ''
        this.selectedAvatar = item
      },
      removeSelected (): void {
        this.selectedImage = ''
        this.selectedAvatar = ''
        this.avatarClass = 'grey lighten-2'
      },
      registerEmailPassword (): void {
        this.stepper = 2
      },
      cancelRegistration (response: boolean): void {
        if (response) {
          this.$router.replace('/pages')
        } else {
          this.dialogConfirmCancel = false
        }
      },
    },
  })
</script>

<style lang="scss" scoped>

#register {
  position: relative;
}

.vcard1::before{
  content: '';
  background: rgb(41, 57, 209);
  position: absolute;
  width: 20%;
  height: 90%;
  left: 7rem;
  top: 0px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}

.vcard2{
  left: 12.5%;
}

.v-stepper__header{
    box-shadow: none !important;
    height: 30px;
    max-width: 600px;
}

</style>
