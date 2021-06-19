<template>
  <v-container
    id="register"
    class="fill-height justify-center"
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
      >
        <v-card
          light
          class="pa-3"
          width="100%"
        >
          <v-row>
            <v-col
              cols="12"
              md="4"
              class="mt-10"
            />

            <v-row>
              <v-col
                cols="12"
                md="8"
              >
                <div class="text-start ml-7">
                  <h1 class="display-2 font-weight-bold">
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
                        class="mb-10 mt-0"
                        color="grey"
                        height="250px"
                      >
                        <v-text-field
                          color="secondary"
                          label="Email"
                          prepend-icon="mdi-email"
                        />
                        <v-text-field
                          class="mt-0"
                          color="secondary"
                          label="Password"
                          prepend-icon="mdi-lock-outline"
                        />
                        <v-text-field
                          class="mt-0"
                          color="secondary"
                          label="Confirm Password"
                          prepend-icon="mdi-lock-outline"
                        />
                        <v-checkbox
                          label="Subscribe to newsletter"
                          class="mt-0 ml-10"
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
                      <v-btn
                        color="primary"
                        @click="e1 = 2"
                      >
                        Continue
                      </v-btn>

                      <v-btn text>
                        Cancel
                      </v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                      <v-card
                        class="mb-12"
                        color="grey lighten-1"
                        height="200px"
                      >
                        <v-text-field
                          color="secondary"
                          label="Confirm Password"
                          prepend-icon="mdi-lock-outline"
                        />
                      </v-card>
                      <v-btn
                        color="primary"
                        @click="e1 = 3"
                      >
                        Continue
                      </v-btn>

                      <v-btn text>
                        Cancel
                      </v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                      <v-card
                        class="mb-12"
                        color="grey lighten-1"
                        height="200px"
                      />

                      <v-btn
                        color="primary"
                        @click="e1 = 1"
                      >
                        Continue
                      </v-btn>

                      <v-btn text>
                        Cancel
                      </v-btn>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </v-col>
            </v-row>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
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
// .v-card::before{
//   content: '';
//   background: dodgerblue;
//   position: absolute;
//   width: 20%;
//   height: 50%;
// }
.v-stepper__header{
    box-shadow: none !important;
    margin-bottom: none;
    height: 60px;
}
</style>
