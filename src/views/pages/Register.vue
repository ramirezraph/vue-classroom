<template>
  <v-card
    class="ma-0 pa-0"
    flat
  >
    <v-row class="justify-center">
      <v-col cols="3">
        <v-img
          class="fill-height pa-10"
          src="../../assets/login-bg-2.jpg"
          position="center center"
        >
          <div class="white--text">
            <h1 class="text-h1 font-weight-bold">
              Klasse
            </h1>
            <span>Learning Management System</span>
          </div>
        </v-img>
      </v-col>
      <v-col cols="8">
        <v-img
          class="pa-10"
          src="../../assets/login-bg-1.jpg"
          position="center center"
          max-height="900"
          min-height="100%"
        >
          <v-card
            id="login-card"
            class="fill-height mt-0 pa-10"
            flat
          >
            <v-card-title>
              <span class="text-h3">Sign Up</span>
            </v-card-title>
            <v-card-text>
              <validation-observer
                ref="observer"
                v-slot="{ invalid }"
              >
                <v-form
                  class="mt-6"
                  @submit.prevent="onRegister"
                >
                  <v-row>
                    <v-col cols="6">
                      <validation-provider
                        v-slot="{ errors }"
                        name="First Name"
                        rules="signUp_required"
                      >
                        <v-text-field
                          v-model="firstName"
                          label="First Name"
                          :error-messages="errors"
                          prepend-icon="mdi-account-outline"
                        />
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        name="Middle Name"
                        rules="signUp_required"
                      >
                        <v-text-field
                          v-model="middleName"
                          label="Middle Name"
                          :error-messages="errors"
                          prepend-icon="mdi-account-outline"
                        />
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        name="Last Name"
                        rules="signUp_required"
                      >
                        <v-text-field
                          v-model="lastName"
                          label="Last Name"
                          :error-messages="errors"
                          prepend-icon="mdi-account-outline"
                        />
                      </validation-provider>
                      <v-menu
                        ref="menuBirthdate"
                        v-model="menuBirthdate"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template #activator="{ on, attrs }">
                          <validation-provider
                            v-slot="{ errors }"
                            name="Birthdate"
                            rules="signUp_required"
                          >
                            <v-text-field
                              v-model="birthdate"
                              label="Birthdate"
                              prepend-icon="mdi-calendar-outline"
                              readonly
                              :error-messages="errors"
                              v-bind="attrs"
                              v-on="on"
                            />
                          </validation-provider>
                        </template>
                        <v-date-picker
                          ref="picker"
                          v-model="birthdate"
                          :max="new Date().toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @change="saveBirthdate"
                        />
                      </v-menu>
                      <validation-provider
                        v-slot="{ errors }"
                        name="Email"
                        rules="signUp_required"
                      >
                        <v-text-field
                          v-model="email"
                          type="email"
                          label="Email"
                          prepend-icon="mdi-email-outline"
                          :error-messages="errors"
                        />
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        name="Password"
                        rules="signUp_required"
                      >
                        <v-text-field
                          v-model="password"
                          type="password"
                          label="Password"
                          prepend-icon="mdi-lock-outline"
                          :error-messages="errors"
                        />
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        name="Confirm Password"
                        rules="signUp_required"
                      >
                        <v-text-field
                          v-model="confirmPassword"
                          type="password"
                          label="Confirm Password"
                          prepend-icon="mdi-lock-outline"
                          :error-messages="errors"
                        />
                      </validation-provider>
                      <v-checkbox
                        v-model="acceptTermsConditions"
                        :disabled="invalid"
                      >
                        <template #label>
                          <div class="black--text">
                            I accept the
                            <v-tooltip bottom>
                              <template #activator="{ on }">
                                <a
                                  target="_blank"
                                  href="http://vuetifyjs.com"
                                  @click.stop
                                  v-on="on"
                                >
                                  Terms and Conditions
                                </a>
                              </template>
                              Read the Terms and Conditions
                            </v-tooltip>
                          </div>
                        </template>
                      </v-checkbox>
                    </v-col>
                    <v-col class="d-flex flex-column pa-6">
                      <v-card
                        flat
                        class="flex-column mb-auto"
                      >
                        <span class="d-block text-center subtitle-1 grey--text">Or sign up with</span>
                        <v-btn
                          text
                          outlined
                          block
                          class="text-none mt-6"
                          x-large
                        >
                          <v-icon
                            left
                          >
                            mdi-google
                          </v-icon>
                          Sign in with Google
                        </v-btn>
                        <v-btn
                          text
                          outlined
                          block
                          class="text-none mt-3"
                          x-large
                        >
                          <v-icon
                            left
                          >
                            mdi-facebook
                          </v-icon>
                          Sign in with Facebook
                        </v-btn>
                      </v-card>
                      <v-card
                        flat
                        class="align-end flex-column mt-auto"
                      >
                        <v-btn
                          block
                          color="primary"
                          class="subtitle-1 text-none"
                          type="submit"
                          :disabled="invalid || !acceptTermsConditions"
                        >
                          Sign Up
                        </v-btn>
                        <v-btn
                          block
                          text
                          outlined
                          class="subtitle-1 text-none mt-3"
                          @click="onCancel"
                        >
                          Cancel
                        </v-btn>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-form>
              </validation-observer>
            </v-card-text>
          </v-card>
        </v-img>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
  import { required } from 'vee-validate/dist/rules'

  extend('signUp_required', {
    ...required,
    message: '{_field_} is required.',
  })

  export default Vue.extend({
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data () {
      return {
        firstName: '',
        middleName: '',
        lastName: '',
        birthdate: null,
        email: '',
        password: '',
        confirmPassword: '',
        acceptTermsConditions: false,
        menuBirthdate: false,
      }
    },
    watch: {
      menuBirthdate (val) {
        val && setTimeout(() => ((this.$refs.picker as any).activePicker = 'YEAR'))
      },
    },
    methods: {
      onRegister (): void {
        console.log('sign up submit')
      },
      onCancel (): void {
        this.$router.push('/pages/login')
      },
      saveBirthdate (date) {
        (this.$refs.menuBirthdate as any).save(date)
      },
    },
  })
</script>

<style lang="scss" scoped>
#login-card {
  border-radius: 3%;
}

#appMotto {
  position: absolute;
  bottom: 3%;
}
</style>
