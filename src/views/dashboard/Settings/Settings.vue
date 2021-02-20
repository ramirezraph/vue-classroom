<template>
  <v-container
    id="settings"
    fluid
    tag="section"
    class="pa-6"
  >
    <base-material-tabs
      background-color="transparent"
      color="primary"
      icons-and-text
    >
      <v-tab
        v-for="(t, i) in settingsTab"
        :key="i"
        :to="`/settings/${t.link}`"
      >
        {{ t.text }}
        <v-icon v-text="t.icon" />
      </v-tab>
    </base-material-tabs>
    <v-window
      class="mt-6"
    >
      <v-window-item>
        <router-view />
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'Settings',
    data () {
      return {
        settingsTab: [
          {
            text: 'General',
            icon: 'mdi-cog',
            link: 'general',
          },
          {
            text: 'Account',
            icon: 'mdi-account',
            link: 'account',
          },
          {
            text: 'Appearance',
            icon: 'mdi-arrange-bring-forward',
            link: 'appearance',
          },
        ],
      }
    },
  })
</script>

<style scoped>

</style>
