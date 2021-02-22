<template>
  <div>
    <notifications
      class="notification-style"
      group="appWideNotification"
      position="bottom left"
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
.notification-style {
// Style of the notification itself
  min-width: 450px;
  padding: 2%;
  margin: 0 5px 5px;
  font-family: "Segoe UI",serif;

  .notification-title {
    font-size: 16px;
    margin-bottom: 3%;
   }

  .notification-content {
    font-size: 14px;
  }

&.my-type {
   /*
   Style for specific type of notification, will be applied when you
   call notification with "type" parameter:
   this.$notify({ type: 'my-type', message: 'Foo' })
   */
 }
}
</style>
