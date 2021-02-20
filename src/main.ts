// =========================================================
// * Vuetify Material Dashboard PRO - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard-pro
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import './plugins/vue-world-map'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import ClassicDialog from '@/views/dashboard/components/dialogs/ClassicDialog.vue'
import ConfirmDialog from '@/views/dashboard/components/dialogs/ConfirmDialog.vue'
import DeleteConfirmDialog from '@/views/dashboard/components/dialogs/DeleteConfirmDialog.vue'
import axios from 'axios'
import { firebaseAuth } from '@/fb'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.component('ClassicDialog', ClassicDialog)
Vue.component('ConfirmDialog', ConfirmDialog)
Vue.component('DeleteConfirmDialog', DeleteConfirmDialog)

let app

firebaseAuth.onAuthStateChanged(user => {
  console.log('user', user)
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      i18n,
      render: h => h(App),
    }).$mount('#app')
  }
})

// new Vue({
//   router,
//   store,
//   vuetify,
//   i18n,
//   render: h => h(App),
// }).$mount('#app')
