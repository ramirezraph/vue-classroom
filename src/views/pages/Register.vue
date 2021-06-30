<template>
  <v-container
    id="register"
    class="fill-height justify-center"
    tag="section"
  >
    <v-card
      class="vcard1"
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
              v-model="e1"
              alt-labels
              class="elevation-0"
            >
              <v-stepper-header>
                <v-stepper-step
                  :complete="e1 > 1"
                  step="1"
                >
                  Register
                </v-stepper-step>

                <v-divider />

                <v-stepper-step
                  :complete="e1 > 2"
                  step="2"
                >
                  Confirmation
                </v-stepper-step>

                <v-divider />

                <v-stepper-step
                  :complete="e1 > 3"
                  step="3"
                >
                  Information
                </v-stepper-step>

                <v-divider />

                <v-stepper-step
                  :complete="e1 > 4"
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
                        color="secondary"
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
                      @click="e1 = 2"
                    >
                      Continue
                    </v-btn>

                    <v-btn
                      text
                      @click="e1 = 1"
                    >
                      Cancel
                    </v-btn>
                  </v-row>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card
                    class="py-3 px-6 pb-6"
                    color="grey"
                    min-height="260px"
                    min-width="550px"
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
                      @click="e1 = 3"
                    >
                      Verify and Continue
                    </v-btn>

                    <v-btn
                      text
                      @click="e1 = 1"
                    >
                      Cancel
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
                      @click="e1 = 4"
                    >
                      Continue
                    </v-btn>
                    <v-btn
                      text
                      @click="e1 = 2"
                    >
                      Cancel
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
                            v-for="(item, index) in 9"
                            :key="index"
                            icon
                            class="pa-2"
                            width="auto"
                            height="auto"
                          >
                            <v-avatar
                              size="70"
                            >
                              <img
                                src="@/assets/avatars/1.png"
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
                            @change="onChange"
                          >
                          <div slot="activator">
                            <v-avatar
                              size="150px"
                              class="grey lighten-3 mb-3"
                            >
                              <v-img
                                v-if="image"
                                :src="image"
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
                      @click="e1 = 4"
                    >
                      Finish
                    </v-btn>
                    <v-btn
                      text
                      @click="e1 = 3"
                    >
                      Cancel
                    </v-btn>
                  </v-row>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
  import Vue from 'vue'
  export default Vue.extend({
    name: 'PagesRegister',
    components: {},
    data: () => ({
      steps: 4,
      e1: 1,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      image: null,
    }),
    watch: {
      steps (val) {
        if (this.e1 > val) {
          this.e1 = val
        }
      },
    },
    methods: {
      nextStep (n) {
        if (n === this.steps) {
          this.e1 = 1
        } else {
          this.e1 = n + 1
        }
      },
      previousStep (n) {
        if (n === this.steps) {
          this.e1 = 1
        } else {
          this.e1 = n - 1
        }
      },
      onChange (val) {
        console.log(val)
        const value = val.target.files[0]

        if (!value) return (this.image = null)

        this.image = URL.createObjectURL(value)
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
  max-height: 550px;
  height: 550px;
  left: 100px;
  top: 0px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.vcard2{
  left: 100px;
}

.v-stepper__header{
    box-shadow: none !important;
    height: 30px;
    max-width: 600px;
}

</style>
