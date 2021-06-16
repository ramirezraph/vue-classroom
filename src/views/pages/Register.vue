<template>
  <v-container
    id="register"
    class="fill-height justify-center"
    tag="section"
  >
    <v-card
      light
      flat
      width="100%"
    >
      <v-row justify="center">
        <v-slide-y-transition appear>
          <v-card
            class="pa-10"
            light
            flat
            width="45%"
          >
            <v-stepper
              v-model="e1"
            >
              <v-stepper-header>
                <template v-for="n in steps">
                  <v-stepper-step
                    :key="`${n}-step`"
                    :complete="e1 > n"
                    :step="n"
                    linear
                  />
                  <v-divider
                    v-if="n !== steps"
                    :key="n"
                  />
                </template>
              </v-stepper-header>
              <v-card
                class="pa-6 mb-6 align end"
                color="grey lighten-1"
                height="400px"
                flat
              >
                <v-stepper-items>
                  <v-stepper-content
                    v-for="n in steps"
                    :key="`${n}-content`"
                    :step="n"
                  >
                    <v-text-field
                      color="secondary"
                      label="Email"
                      prepend-icon="mdi-email"
                    />
                    <v-text-field
                      color="secondary"
                      label="Password"
                      prepend-icon="mdi-lock-outline"
                    />
                    <v-text-field
                      color="secondary"
                      label="Confirm Password"
                      prepend-icon="mdi-lock-outline"
                    />
                    <v-checkbox
                      :input-value="true"
                      color="white"
                    >
                      <template #label>
                        <span class="white--text text-no-wrap">I agree to the&nbsp;</span>
                        <a
                          class="white--text ml-4 ml-sm-1"
                          href="#"
                        >
                          Terms and Conditions
                        </a>.
                      </template>
                    </v-checkbox>
                  </v-stepper-content>
                </v-stepper-items>
              </v-card>
            </v-stepper>
          </v-card>
        </v-slide-y-transition>
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

</style>
