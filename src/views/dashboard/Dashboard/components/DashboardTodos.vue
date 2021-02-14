<template>
  <v-row>
    <v-col>
      <base-material-card
        color="green lighten-1"
        icon="mdi-format-list-checks"
        title="Todos"
      >
        <v-expansion-panels
          v-model="accordion"
          flat
        >
          <v-expansion-panel
            v-for="(item,i) in 4"
            :key="i"
          >
            <v-expansion-panel-header>
              <span class="display-1">
                This Week
              </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pa-0 ma-0 mt-n6 mb-n6">
              <v-card
                class="d-flex px-4"
                flat
              >
                <div>
                  <span class="d-block display-1 blue--text">
                    Experiment 1 Logic Gates
                  </span>
                  <small class="d-block">
                    CPE 301 Logic Circuits and Design
                  </small>
                </div>
                <div class="ml-auto">
                  <v-chip
                    color="blue"
                    text-color="white"
                  >
                    Tommorow, 11:59PM
                  </v-chip>
                </div>
              </v-card>
              <v-card
                class="d-flex px-4"
                flat
              >
                <div>
                  <span class="d-block display-1 blue--text">
                    Experiment 2 Logic Gates
                  </span>
                  <small class="d-block">
                    CPE 301 Logic Circuits and Design
                  </small>
                </div>
                <div class="ml-auto">
                  <v-chip
                    color="blue"
                    text-color="white"
                  >
                    Tommorow, 11:59PM
                  </v-chip>
                </div>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </base-material-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    data () {
      return {
        accordion: 0,
      }
    },
  })
</script>

<style scoped>

</style>
