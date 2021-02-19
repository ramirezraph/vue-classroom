<template>
  <v-card
    class="ma-0 pa-0"
    flat
  >
    <v-row class="justify-center">
      <v-col
        cols="3"
      >
        <v-img
          class="fill-height pa-10"
          src="../../assets/login-bg-3.jpg"
          position="center center"
        >
          <div
            id="appMotto"
            class="text-h2 white--text"
          >
            <div class="d-block">
              Never
            </div>
            <div class="d-block">
              Stop
            </div>
            <div class="d-block">
              Learning
            </div>
          </div>
        </v-img>
      </v-col>
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
      <v-col cols="5">
        <v-img
          class="pa-10"
          src="../../assets/login-bg-1.jpg"
          position="center center"
          max-height="900"
          min-height="100%"
        >
          <v-card
            id="login-card"
            class="fill-height mt-0 px-12"
            flat
          >
            <v-card-title class="py-12">
              <span class="text-h3 ma-auto mt-12 black--text">Login to your account</span>
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="onLogin">
                <v-text-field
                  v-model="email"
                  prepend-icon="mdi-email-outline"
                  label="Email"
                />
                <v-text-field
                  v-model="password"
                  label="Password"
                  prepend-icon="mdi-lock-outline"
                  type="password"
                />
                <div
                  class="d-flex"
                >
                  <div>
                    <v-checkbox
                      v-model="rememberMe"
                      label="Remember Me"
                    />
                  </div>
                  <div class="ml-auto my-auto">
                    <v-btn
                      text
                      small
                      class="subtitle-1 grey--text text-none"
                    >
                      <v-icon left>
                        mdi-key
                      </v-icon>
                      Forgot Password
                    </v-btn>
                  </div>
                </div>
                <v-btn
                  depressed
                  color="primary"
                  block
                  class="subtitle-1 text-none mt-6"
                  min-height="50"
                  type="submit"
                >
                  Login
                </v-btn>
              </v-form>
              <span class="text-h5 d-block text-center mt-8 grey--text">Or login with</span>
              <div class="d-flex text-center justify-center mt-6">
                <div>
                  <v-btn
                    icon
                    x-large
                    color="primary"
                  >
                    <v-icon x-large>
                      mdi-google
                    </v-icon>
                  </v-btn>
                </div>
                <div>
                  <v-btn
                    icon
                    x-large
                    color="primary"
                  >
                    <v-icon x-large>
                      mdi-facebook
                    </v-icon>
                  </v-btn>
                </div>
              </div>
              <div
                class="d-block text-center mt-16"
              >
                <v-btn
                  text
                  depressed
                  width="200"
                  class="text-h4 primary--text text-none"
                  to="/pages/register"
                >
                  Sign Up
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-img>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    data () {
      return {
        email: '',
        password: '',
        rememberMe: false,
      }
    },
    methods: {
      onLogin (): void {
        console.log('login submit')
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
