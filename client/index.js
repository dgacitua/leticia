import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VeeValidate from 'vee-validate';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

/*
import VueAuth from '@websanova/vue-auth';
import VueAuthBearer from '@websanova/vue-auth/drivers/auth/bearer.js';
import VueAuthHttp from '@websanova/vue-auth/drivers/http/axios.1.x.js';
import VueAuthRouter from '@websanova/vue-auth/drivers/router/vue-router.2.x.js';
*/

import App from './templates/App.vue';
import { router } from './modules/routes';
import { store } from './modules/store';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(BootstrapVue);

Vue.router = router;

/*
Vue.use(VueAuth, {
  auth: VueAuthBearer,
  http: VueAuthHttp,
  router: VueAuthRouter,
  refreshData: {
    enabled: false,
    interval: 0
  },
  parseUserData: (data) => {
    return data
  }
});
*/

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});