<template>
  <v-content
    id="pages"
    :class="$vuetify.theme.dark ? undefined : 'grey lighten-3'"
  >
    <v-img
      :class="{
        'v-image--sm': this.$vuetify.breakpoint.smAndDown,
        'v-image--md': this.$vuetify.breakpoint.mdAndDown
      }"
      :src="require(`@/assets/${src || 'bg.jpg'}`)"
      gradient="to top, rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)"
      min-height="100%"
    >
      <v-responsive
        :style="styles"
        min-height="100vh"
        class="d-flex align-center text-center"
      >
        <div v-if="this.$router.currentRoute.fullPath === '/pages'">
          <p class="text-h2">
            Welcome To
          </p>
          <h1 class="page-title mt-n10">
            Klasse
          </h1>
          <p class="text-h3 page-subtitle mx-auto mt-n3 font-weight-light">
            A modern learning management system that
            makes e-learning awesome
          </p>
          <v-btn
            large
            rounded
            width="200"
            class="secondary white--text mt-12"
            to="pages/login"
          >
            Get Started
          </v-btn>
        </div>
        <router-view />
      </v-responsive>
    </v-img>
  </v-content>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'PagesCoreView',

    data: () => ({
      srcs: {
        '/pages/lock': 'lock.jpg',
        '/pages/login': 'login.jpg',
        '/pages/pricing': 'pricing.jpg',
        '/pages/register': 'register.jpg',
      },
    }),

    computed: {
      src () {
        return this.srcs[this.$route.path]
      },
      styles () {
        const paddingTop = this.$vuetify.breakpoint.mdAndUp ? 175 : 100
        const paddingBottom = this.$vuetify.breakpoint.mdAndUp ? 175 : 150
        return {
          padding: `${paddingTop}px 0 ${paddingBottom}px 0`,
        }
      },
    },
  })
</script>

<style lang="scss" scoped>

p, h1 {
  user-select: none;
}

.page-title {
  font-size: 11rem;
}

.page-subtitle {
  line-height: 1.75;
  width: 40ch;
  letter-spacing: 2px;
}
</style>
