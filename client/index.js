import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
import vSelect from 'vue-select';
import VueI18n from 'vue-i18n';
import VueCookies from 'vue-cookies';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-select/dist/vue-select.css';

import App from './templates/App.vue';
import { router } from './modules/routes';
import { store } from './modules/store';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fas);

Vue.use(BootstrapVue);
Vue.use(VueCookies);
Vue.use(VueI18n);
Vue.use(VeeValidate);


Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('v-select', vSelect);

Vue.router = router;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});