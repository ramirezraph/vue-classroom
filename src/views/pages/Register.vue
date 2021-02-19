<template>
  <v-card
    class="ma-0 pa-0"
    flat
  >
    <v-row class="justify-center">
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
      <v-col cols="8">
        <v-img
          class="pa-10"
          src="../../assets/login-bg-1.jpg"
          position="center center"
          max-height="900"
          min-height="100%"
        >
          <v-card
            id="login-card"
            class="fill-height mt-0 pa-10"
            flat
          >
            <v-card-title>
              <span class="text-h3">Sign Up</span>
            </v-card-title>
          </v-card>
        </v-img>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    data () {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      onRegister (): void {
        console.log('sign up submit')
      },
    },
  })
</script>

<style lang="scss" scoped>
#login-card {
  border-radius: 3%;
}

#appMotto {
  position: absolute;
  bottom: 3%;
}
</style>
