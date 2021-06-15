<template>
  <v-container
    id="login"
    class="fill-height justify-center"
    tag="section"
  >
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card
          color="success"
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

              <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :href="social.href"
                class="ma-1"
                icon
                rel="noopener"
                target="_blank"
              >
                <v-icon
                  v-text="social.icon"
                />
              </v-btn>
            </div>
          </template>

          <v-card-text class="text-center">
            <div class="text-center grey--text body-1 font-weight-light">
              Or Be Classical
            </div>

            <v-text-field
              color="secondary"
              label="First Name..."
              prepend-icon="mdi-face"
              class="mt-10"
            />

            <v-text-field
              color="secondary"
              label="Email..."
              prepend-icon="mdi-email"
            />

            <v-text-field
              class="mb-8"
              color="secondary"
              label="Password..."
              prepend-icon="mdi-lock-outline"
            />

            <pages-btn
              large
              color=""
              depressed
              class="v-btn--text success--text"
            >
              Let's Go
            </pages-btn>
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
      PagesBtn: () => import('./components/Btn'),
    },

    data: () => ({
      email: '',
      password: '',
      rememberMe: false,
      errorMessage: '',
      loading: false,

      socials: [
        {
          href: '#',
          icon: 'mdi-facebook-box',
        },
        {
          href: '#',
          icon: 'mdi-twitter',
        },
        {
          href: '#',
          icon: 'mdi-github-box',
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
