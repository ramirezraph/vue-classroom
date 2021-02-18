<template>
  <v-card
    class="ma-0 pa-0 px-12"
    flat
  >
    <v-row>
      <v-col cols="3">
        <v-img
          class="fill-height pa-10"
          src="../../assets/login-bg-3.jpg"
          position="center center"
        >
          <div
            id="appMotto"
            class="text-h2 white--text font-weight-medium"
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
      <v-col cols="6">
        <v-img
          class="pa-10"
          src="../../assets/login-bg-1.jpg"
          position="center center"
          max-height="900"
          min-height="100%"
        >
          <v-card
            class="fill-height mt-0"
            rounded
            flat
          >
            <v-card-title>
              <span class="text-h3 ma-auto">Login to your account</span>
            </v-card-title>
          </v-card>
        </v-img>
      </v-col>
    </v-row>
  </v-card>
</template>

<script label="ts">
  import Vue from 'vue'
  export default Vue.extend({
    data () {
      return {

      }
    },
  })
</script>

<style lang="scss" scoped>
  #appMotto {
    position: absolute;
    bottom: 3%;
  }
</style>
