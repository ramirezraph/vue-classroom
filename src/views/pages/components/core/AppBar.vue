<template>
  <v-app-bar
    absolute
    color="transparent"
    flat
    height="85"
    class="mt-6"
  >
    <v-container class="px-0 d-flex">
      <v-toolbar-title class="hidden-md-and-up">
        <v-btn
          to="/pages"
          text
          plain
          exact
          min-height="48"
          min-width="40"
        >
          <v-icon>
            mdi-home
          </v-icon>
        </v-btn>
      </v-toolbar-title>

      <v-toolbar-title
        class="font-weight-light hidden-sm-and-down"
      >
        <v-btn
          text
          class="text-none text-h3"
          to="/pages"
          exact
          min-height="48"
          min-width="40"
        >
          Klasse Online Classroom
        </v-btn>
      </v-toolbar-title>

      <v-spacer />

      <v-btn
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        min-height="48"
        min-width="40"
        text
      >
        <v-icon
          :left="$vuetify.breakpoint.mdAndUp"
          size="20"
          v-text="item.icon"
        />

        <span
          class="hidden-sm-and-down ml-1"
          v-text="item.text"
        />
      </v-btn>
      <v-btn
        to="/pages/login"
        min-height="48"
        min-width="40"
        class="hidden-md-and-up"
        text
      >
        <v-icon
          :left="$vuetify.breakpoint.mdAndUp"
          size="20"
        >
          mdi-account
        </v-icon>

        <span
          class="hidden-sm-and-down ml-1"
        >
          Sign In
        </span>
      </v-btn>
      <v-btn
        to="/pages/login"
        class="primary white--text hidden-sm-and-down"
        width="150"
        min-height="48"
        min-width="40"
        depressed
      >
        <v-icon
          :left="$vuetify.breakpoint.mdAndUp"
          size="20"
        >
          mdi-account
        </v-icon>

        <span
          class="hidden-sm-and-down ml-1"
        >
          Sign In
        </span>
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'PagesCoreAppBar',

    data: () => ({
      items: [
        {
          icon: 'mdi-tools',
          text: 'Services',
          to: '/pages/services',
        },
        {
          icon: 'mdi-help-circle',
          text: 'Support',
          to: '/pages/support',
        },
        {
          icon: 'mdi-account-plus',
          text: 'Register',
          to: '/pages/register',
        },
      ],
      titles: {
        '/pages/services': 'Services Page',
        '/pages/support': 'Support Page',
        '/pages/register': 'Register Page',
        '/pages/login': 'Login Page',
      },
    }),
  })
</script>

<style lang="scss" scoped>

</style>
