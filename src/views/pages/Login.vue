<template>
  <v-container
    id="register"
    class="pt-1"
    tag="section"
  >
    <v-row>
      <v-col cols="3">
        <v-img
          class="pa-10"
          src="../../assets/login-bg-3.jpg"
          position="center center"
          min-height="100%"
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
          class="pa-10"
          src="../../assets/login-bg-2.jpg"
          position="center center"
          min-height="100%"
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
          min-height="100%"
        >
          <v-card
            class="mt-0"
            min-height="100%"
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
  </v-container>
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
  #register {
    height: 98vh;
  }
  #appMotto {
    position: absolute;
    bottom: 3%;
  }
</style>
