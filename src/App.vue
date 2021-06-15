<template>
  <div>
    <notifications
      classes="notification-style"
      group="appWideNotification"
      position="bottom left"
      animation-type="velocity"
      width="400"
    />
    <router-view />
  </div>
</template>

<script lang="ts">
  import { extend } from 'vee-validate'
  import { size } from 'vee-validate/dist/rules'
  import Vue from 'vue'

  extend('size', {
    ...size,
    message: 'The maximum size is 25 MB.',
  })

  export default Vue.extend({
    name: 'App',
    data () {
      return {}
    },
  })
</script>

<style lang="scss">

@import './src/sass/variables';

.notification-style {
// Style of the notification itself
  padding: 5%;
  margin: 0 15px 15px;
  font-family: "Segoe UI",serif;
  color: white;

  background: #078282;
  border-left: 5px solid #B3CC8D;

  .notification-title {
    font-size: 16px;
    margin-bottom: 3%;
   }

  .notification-content {
    font-size: 14px;
  }

  &.success {
    background: #2C5F2D;
    border-left-color: #078282;
  }
  &.warn {
    background: #ffbb33;
    border-left-color: #078282;
  }
  &.error {
    background: #ff4444;
    border-left-color: #078282;
  }
}
</style>
