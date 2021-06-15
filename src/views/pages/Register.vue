<template>
  <v-container
    id="register"
    class="fill-height justify-center"
    tag="section"
  >
    <v-row justify="center">
      <v-slide-y-transition appear>
        <v-card
          class="mt-6 mt-md-0"
          light
          max-width="100%"
          width="100%"
        >
          <v-card-text class="text-center">
            <div class="display-2 font-weight-light mb-3 text--darken-2 grey--text">
              Register an Account
            </div>
            <div>
              <v-stepper v-model="e1">
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

                  <v-stepper-step step="3">
                    Information
                  </v-stepper-step>

                  <v-divider />

                  <v-stepper-step step="4">
                    Avatar
                  </v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-card
                      class="mb-12"
                      color="grey lighten-1"
                      height="200px"
                    />

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
                    />

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

                    <v-stepper-content step="4">
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
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </div>
          </v-card-text>
        </v-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'PagesRegister',
    components: {},
    data: () => ({

    }),
  })
</script>

<style lang="scss" scoped>

</style>
