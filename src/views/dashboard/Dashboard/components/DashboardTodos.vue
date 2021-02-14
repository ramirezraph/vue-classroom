<template>
  <v-row>
    <v-col>
      <base-material-card
        title="Todos"
        color="red"
        icon="mdi-format-list-checks"
      >
        <v-row>
          <v-col cols="12">
            <v-expansion-panels flat>
              <v-expansion-panel
                v-for="(item,i) in 4"
                :key="i"
              >
                <v-expansion-panel-header>
                  <v-row no-gutters>
                    <v-col cols="4">
                      <p class="display-1">
                        This Week
                      </p>
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row no-gutters>
                    <v-col cols="5">
                      <p class="display-1 pl-2 red--text">
                        Experiment 1 Logic Gates
                      </p>
                      <small class="pl-2">
                        CPE 301 Logic Circuits and Design
                      </small>
                    </v-col>
                    <v-spacer />
                    <v-col cols="3">
                      <v-chip
                        class="ma-2"
                        color="red"
                        text-color="white"
                      >
                        Jan 15 2021, 11:59PM
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
                <v-divider />
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </base-material-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
  })
</script>

<style scoped>

</style>
