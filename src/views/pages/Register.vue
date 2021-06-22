<template>
  <v-container
    id="register"
    class="fill-height justify-center"
    tag="section"
  >
    <v-card
      class="vcard1 pa-5"
      light
      height="100%"
      width="100%"
    >
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-card
            class="vcard2"
            width="670px"
            flat
          >
            <div class="text-start pl-15">
              <h1 class="font-weight-light">
                Register an Account
              </h1>
            </div>
            <v-stepper
              v-model="e1"
              alt-labels
              class="elevation-0"
            >
              <v-stepper-header>
                <template v-for="n in steps">
                  <v-stepper-step
                    :key="`${n}-step`"
                    :complete="e1 > n"
                    :step="n"
                    linear
                  >
                    {{ n }}
                  </v-stepper-step>
                  <v-divider
                    v-if="n !== steps"
                    :key="n"
                  />
                </template>
              </v-stepper-header>
              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-card
                    class="mb-6 mt-0 ml-10"
                    color="grey"
                    height="250px"
                    width="550px"
                  >
                    <v-text-field
                      color="white"
                      label="Email"
                      prepend-icon="mdi-email-outline"
                      dark
                    />
                    <v-text-field
                      class="mt-0"
                      color="white"
                      label="Password"
                      prepend-icon="mdi-lock-outline"
                      dark
                    />
                    <v-text-field
                      class="mt-0"
                      color="white"
                      label="Confirm Password"
                      prepend-icon="mdi-lock-outline"
                      dark
                    />
                    <v-checkbox
                      color="white"
                      class="mt-0 pl-10"
                      dark
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
                  </v-card>
                  <v-row>
                    <v-col
                      class="pr-15"
                      cols="12"
                      md="9"
                    >
                      <v-btn
                        color="primary"
                        width="150px"
                        height="35px"
                        @click="e1 = 2"
                      >
                        Continue
                      </v-btn>

                      <v-btn
                        text
                        width="150px"
                        height="35px"
                      >
                        Cancel
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card
                    class="mb-6 mt-0 ml-10"
                    color="grey"
                    height="250px"
                    width="550px"
                  >
                    <div class="text-start pa-6 ml-4">
                      <h1 class="white--text display-2 small">
                        Verify your email to continue signing up
                      </h1>
                    </div>
                    <div class="text-start caption mx-11">
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
                      dark
                    />
                  </v-card>
                  <v-row>
                    <v-col
                      class="pr-15"
                      cols="12"
                      md="9"
                    >
                      <v-btn
                        color="primary"
                        width="150px"
                        height="35px"
                        @click="e1 = 3"
                      >
                        Save and Continue
                      </v-btn>

                      <v-btn
                        text
                        width="150px"
                        height="35px"
                        @click="e1 = 1"
                      >
                        Cancel
                      </v-btn>
                    </v-col>
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

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'PagesRegister',
    components: {},
    data: () => ({
      steps: 4,
      e1: 1,
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
    },
  })
</script>

<style lang="scss" scoped>
.v-text-field{
      width: 400px;
      margin-left: 40px;
}

.vcard1::before{
  content: '';
  background: rgb(41, 57, 209);
  position: absolute;
  width: 20%;
  height: 85%;
  left: 100px;
  top: 0px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.vcard1{
 border-radius: 20px;
}

.vcard2 {
  position: relative;
  left: 450px;
}

.v-stepper__header{
    box-shadow: none !important;
    height: 72px;
}

</style>
