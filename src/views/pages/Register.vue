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
                    <validation-observer
                      ref="observer"
                      v-slot="{ invalid }"
                    >
                      <v-form @submit.prevent="registerEmailPassword()">
                        <v-card
                          class="py-3 px-6"
                          color="grey"
                          min-height="300"
                        >
                          <v-card-text>
                            <validation-provider
                              v-slot="{ errors }"
                              name="Email"
                              rules="register_required|email"
                            >
                              <v-text-field
                                v-model="input_email"
                                label="Email"
                                prepend-icon="mdi-email-outline"
                                dark
                                color="white"
                                :error-messages="errors"
                              />
                            </validation-provider>

                            <validation-provider
                              v-slot="{ errors }"
                              name="Password"
                              rules="register_required|registerPassword_min:8"
                            >
                              <v-text-field
                                v-model="input_password"
                                label="Password"
                                prepend-icon="mdi-lock-outline"
                                :error-messages="errors"
                                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="showPassword ? 'text' : 'password'"
                                dark
                                color="white"
                                @click:append="showPassword = !showPassword"
                              />
                            </validation-provider>
                            <validation-provider
                              v-slot="{ errors }"
                              name="Confirm Password"
                              rules="register_required|registerPassword_min:8"
                            >
                              <v-text-field
                                v-model="input_confirmPassword"
                                prepend-icon="mdi-lock-outline"
                                label="Confirm Password"
                                :error-messages="errors"
                                :append-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="showConfirmPassword ? 'text' : 'password'"
                                dark
                                color="white"
                                @click:append="showConfirmPassword = !showConfirmPassword"
                              />
                            </validation-provider>

                            <v-checkbox
                              v-model="agreeTermsCondition"
                              class="mt-6"
                              dark
                              color="primary"
                              type="checkbox"
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
                            :disabled="invalid || !agreeTermsCondition"
                            type="submit"
                          >
                            <v-icon left>
                              mdi-pencil-outline
                            </v-icon>
                            Register
                          </v-btn>

                          <v-btn
                            text
                            @click="dialogConfirmCancel = true"
                          >
                            <v-icon left>
                              mdi-cancel
                            </v-icon>
                            Cancel
                          </v-btn>
                        </v-row>
                      </v-form>
                    </validation-observer>
                  </v-stepper-content>

                  <v-stepper-content step="2">
                    <validation-observer
                      ref="observer"
                      v-slot="{ invalid }"
                    >
                      <v-form @submit.prevent="verifyEmail(input_verificationCode)">
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
                                class="accent--text text--lighten-3 text-decoration-none"
                              >Resend verification code</a>
                            </div>
                            <validation-provider
                              v-slot="{ errors }"
                              name="Verification Code"
                              rules="register_required"
                            >
                              <v-text-field
                                v-model="input_verificationCode"
                                color="white"
                                label="Enter the code here"
                                prepend-icon="mdi-email-outline"
                                class="mt-6"
                                :error-messages="errors"
                                dark
                              />
                            </validation-provider>
                          </v-card-text>
                        </v-card>
                        <v-row class="flex ma-0 pa-0">
                          <v-btn
                            text
                            class="ma-0 pa-0"
                            min-width="175"
                            @click="stepper = 1"
                          >
                            <v-icon left>
                              mdi-arrow-left
                            </v-icon>
                            Back
                          </v-btn>
                          <v-btn
                            class="ma-0 pa-0 ml-auto"
                            color="primary"
                            min-width="200"
                            :disabled="invalid"
                            type="submit"
                          >
                            <v-icon left>
                              mdi-checkbox-marked-circle-outline
                            </v-icon>
                            Verify and continue
                          </v-btn>
                        </v-row>
                      </v-form>
                    </validation-observer>
                  </v-stepper-content>

                  <v-stepper-content step="3">
                    <validation-observer
                      ref="observer"
                      v-slot="{ invalid }"
                    >
                      <v-form @submit.prevent="submitInformation()">
                        <v-card
                          class="py-2"
                          color="grey"
                        >
                          <v-row
                            no-gutters
                            class="ma-0 pa-0 px-6"
                          >
                            <v-col
                              md="6"
                            >
                              <validation-provider
                                v-slot="{ errors }"
                                name="First Name"
                                rules="register_required"
                              >
                                <v-text-field
                                  v-model="input_firstName"
                                  label="* First Name"
                                  dark
                                  color="white"
                                  :error-messages="errors"
                                  class="mx-2"
                                />
                              </validation-provider>
                            </v-col>

                            <v-col
                              md="6"
                            >
                              <validation-provider
                                v-slot="{ errors }"
                                name="Middle Name"
                                rules="register_required"
                              >
                                <v-text-field
                                  v-model="input_middleName"
                                  label="* Middle Name"
                                  dark
                                  color="white"
                                  :error-messages="errors"
                                  class="mx-2"
                                />
                              </validation-provider>
                            </v-col>
                          </v-row>

                          <v-row
                            no-gutters
                            class="ma-0 pa-0 px-6 mt-n3"
                          >
                            <v-col
                              md="6"
                            >
                              <validation-provider
                                v-slot="{ errors }"
                                name="Last Name"
                                rules="register_required"
                              >
                                <v-text-field
                                  v-model="input_lastName"
                                  label="* Last Name"
                                  dark
                                  color="white"
                                  :error-messages="errors"
                                  class="mx-2"
                                />
                              </validation-provider>
                            </v-col>
                          </v-row>

                          <v-row
                            no-gutters
                            class="ma-0 pa-0 px-8"
                          >
                            <v-col
                              md="6"
                            >
                              <v-menu
                                ref="menuBirthdate"
                                v-model="menuBirthdate"
                                :close-on-content-click="false"
                                :return-value.sync="date"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                              >
                                <template #activator="{ on, attrs }">
                                  <validation-provider
                                    v-slot="{ errors }"
                                    name="Birthdate"
                                    rules="register_required"
                                  >
                                    <v-text-field
                                      v-model="date"
                                      label="* Birthdate"
                                      append-icon="mdi-calendar"
                                      dark
                                      readonly
                                      class="mr-2"
                                      :error-messages="errors"
                                      color="white"
                                      v-bind="attrs"
                                      v-on="on"
                                    />
                                  </validation-provider>
                                </template>
                                <v-date-picker
                                  v-model="date"
                                  :max="new Date().toISOString().substr(0, 10)"
                                  min="1950-01-01"
                                >
                                  <v-spacer />
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="menuBirthdate = false"
                                  >
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.menuBirthdate.save(date)"
                                  >
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-menu>
                            </v-col>
                          </v-row>

                          <v-row
                            no-gutters
                            class="ma-0 pa-0 px-6 mt-n3"
                          >
                            <v-col
                              md="6"
                            >
                              <validation-provider
                                v-slot="{ errors }"
                                name="Phone Number"
                                rules="register_required"
                              >
                                <v-text-field
                                  v-model="input_phoneNumber"
                                  label="* Phone Number"
                                  dark
                                  color="white"
                                  :error-messages="errors"
                                  class="mx-2"
                                />
                              </validation-provider>
                            </v-col>
                          </v-row>

                          <v-row
                            no-gutters
                            class="ma-0 pa-0 px-6 mt-n3"
                          >
                            <v-col
                              md="12"
                            >
                              <v-text-field
                                label="Home Address"
                                dark
                                color="white"
                                class="mx-2"
                              />
                            </v-col>
                          </v-row>

                          <v-row
                            no-gutters
                            class="ma-0 pa-0 px-6 mt-n3"
                          >
                            <v-col
                              md="6"
                            >
                              <v-text-field
                                label="School"
                                dark
                                color="white"
                                class="mx-2"
                              />
                            </v-col>
                            <v-col
                              md="6"
                            >
                              <v-text-field
                                label="Course"
                                dark
                                color="white"
                                class="mx-2"
                              />
                            </v-col>
                          </v-row>
                          <v-row
                            no-gutters
                            class="ma-0 pa-0 px-6 mt-n3"
                          >
                            <v-col
                              md="6"
                            >
                              <v-text-field
                                label="Section"
                                dark
                                color="white"
                                class="mx-2"
                              />
                            </v-col>
                            <v-col
                              md="6"
                            >
                              <v-text-field
                                label="Student Number / ID"
                                dark
                                color="white"
                                class="mx-2"
                              />
                            </v-col>
                          </v-row>
                        </v-card>
                        <v-row class="flex ma-0 pa-0">
                          <v-btn
                            text
                            class="ma-0 pa-0"
                            min-width="175"
                            @click="stepper = 2"
                          >
                            <v-icon left>
                              mdi-arrow-left
                            </v-icon>
                            Back
                          </v-btn>
                          <v-btn
                            class="ma-0 pa-0 ml-auto"
                            color="primary"
                            min-width="200"
                            :disabled="invalid"
                            type="submit"
                          >
                            <v-icon left>
                              mdi-format-list-checks
                            </v-icon>
                            Continue
                          </v-btn>
                        </v-row>
                      </v-form>
                    </validation-observer>
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
                          <div class="text-center">
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
                              class="mt-3 ma-auto text-none subtitle-1"
                              color="grey darken-2"
                              @click="$refs.file.click()"
                            >
                              <v-icon
                                left
                              >
                                mdi-plus
                              </v-icon>
                              Upload Photo
                            </v-btn>

                            <v-btn
                              class="mt-2 text-none subtitle-1"
                              text
                              min-width="167.83"
                              dark
                              @click="removeSelected()"
                            >
                              Remove
                            </v-btn>
                          </div>
                        </v-col>
                      </v-row>
                    </v-card>
                    <v-row class="flex ma-0 pa-0">
                      <v-btn
                        text
                        class="ma-0 pa-0"
                        min-width="175"
                        @click="stepper = 3"
                      >
                        <v-icon left>
                          mdi-arrow-left
                        </v-icon>
                        Back
                      </v-btn>
                      <v-btn
                        class="ma-0 pa-0 ml-auto"
                        color="primary"
                        min-width="200"
                        :disabled="!enableFinish"
                        @click="finishRegistration()"
                      >
                        <v-icon left>
                          mdi-flag-outline
                        </v-icon>
                        Finish
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

    <classic-dialog
      :v-model="classicDialog"
      :title="classicDialogTitle"
      :text="classicDialogText"
      @close="classicDialog = false"
    />
    <confirm-dialog
      :model="dialogConfirmCancel"
      title="Cancel Registration"
      text="Are you sure you want to cancel?"
      @goto-response="cancelRegistration"
    />
  </v-container>
</template>

<script lang="ts">
  import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
  import { min, required } from 'vee-validate/dist/rules'
  import Vue from 'vue'

  extend('register_required', {
    ...required,
    message: '{_field_} is required.',
  })

  extend('registerPassword_min', {
    ...min,
    message: '{_field_} too short.',
  })

  export default Vue.extend({
    name: 'PagesRegister',
    components: {
      ValidationObserver,
      ValidationProvider,
    },
    data () {
      return {
        steps: 4,
        stepper: 1,
        dialogConfirmCancel: false,

        classicDialog: false,
        classicDialogTitle: '',
        classicDialogText: '',

        // Register

        input_email: '',
        input_password: '',
        input_confirmPassword: '',
        agreeTermsCondition: false,

        showPassword: false,
        showConfirmPassword: false,

        // Confirmation

        input_verificationCode: '',

        // Information

        input_firstName: '',
        input_middleName: '',
        input_lastName: '',
        input_phoneNumber: '',
        input_homeAddress: '',
        input_school: '',
        input_course: '',
        input_section: '',
        input_studentNumber: '',

        date: null,
        // date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menuBirthdate: false,

        // Avatar
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
      enableFinish (): boolean {
        if (this.selectedImage) {
          return true
        }

        if (this.selectedAvatar) {
          return true
        }

        return false
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onImageUpload (val: any) {
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
        if (!this.agreeTermsCondition) {
          console.log('you didn\'t agree')
          return
        }

        if (this.input_password !== this.input_confirmPassword) {
          this.classicDialogTitle = 'Register Failed'
          this.classicDialogText = 'Password do not match.'
          this.classicDialog = true
          return
        }

        // register auth

        // success
        this.stepper = 2
      },
      verifyEmail (code: string): void {
        console.log('verified', code)

        // success
        this.stepper = 3
      },
      submitInformation (): void {
        this.stepper = 4
      },
      finishRegistration (): void {
        console.log('finish registration')
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
