<template>
  <v-container
    id="login"
    class="fill-height justify-center"
    tag="section"
  >
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card
          color="primary"
          light
          max-width="100%"
          width="400"
          class="px-5 py-3"
        >
          <template #heading>
            <div class="text-center">
              <h1 class="display-2 font-weight-bold mb-2">
                Login
              </h1>

              <v-tooltip
                v-for="(social, i) in socials"
                :key="i"
                bottom
                color="accent"
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    :href="social.href"
                    class="ma-1"
                    icon
                    rel="noopener"
                    target="blank"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon
                      v-text="social.icon"
                    />
                  </v-btn>
                </template>
                <span>Login with {{ social.name }}</span>
              </v-tooltip>
            </div>
          </template>

          <v-card-text class="text-center pb-10">
            <div class="text-center grey--text body-1 font-weight-light">
              Or Be Classical
            </div>

            <v-expand-transition>
              <div
                v-if="errorMessage"
                class="error--text subtitle-1 d-block text-center mb-3 mt-6"
              >
                {{ errorMessage }}
              </div>
            </v-expand-transition>

            <v-form
              class="mt-10"
              @submit.prevent="onLogin"
            >
              <v-text-field
                v-model="email"
                prepend-icon="mdi-email-outline"
                label="Email"
                clearable
              />
              <v-text-field
                v-model="password"
                label="Password"
                prepend-icon="mdi-lock-outline"
                type="password"
                clearable
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
                :loading="loading"
              >
                Login
              </v-btn>
            </v-form>

            <v-btn
              text
              class="error--text mt-10"
              min-width="200"
            >
              Demo Mode
            </v-btn>
          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'PagesLogin',

    components: {
      PagesBtn: () => import('./components/Btn.vue'),
    },

    data: () => ({
      email: '',
      password: '',
      rememberMe: false,
      errorMessage: '',
      loading: false,

      socials: [
        {
          name: 'Google',
          href: '#',
          icon: 'mdi-google',
        },
        {
          name: 'Facebook',
          href: '#',
          icon: 'mdi-facebook',
        },
        {
          name: 'Twitter',
          href: '#',
          icon: 'mdi-twitter',
        },
      ],
    }),
    methods: {
      async onLogin () {
        try {
          this.loading = true
          this.errorMessage = ''

          if (!(this.email.length > 0 && this.password.length > 0)) {
            this.errorMessage = 'Please complete the form to login.'
            return
          }

          await this.$store.dispatch('user/userSignIn', { email: this.email, password: this.password })
            .then(() => {
              this.$router.push('/')
            }).catch(() => {
              this.errorMessage = 'Invalid user credentials.'
              this.password = ''
            })
        } catch (error) {
          console.log(error)
        } finally {
          this.loading = false
        }
      },
    },
  })
</script>
