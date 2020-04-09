import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';
import VueAxios from 'vue-axios';

import * as Constants from '../services/Constants';

import Home from '../templates/Home.vue';
//import Login from '../templates/Login.vue';
//import PageFrame from '../templates/PageFrame.vue';
import NotFound from '../templates/NotFound.vue';

Vue.use(VueRouter);
Vue.use(VueAxios, Axios);

Axios.defaults.baseURL = `http://${Constants.leticiaHost}:${Constants.restPort}/v1/`;

export const router = new VueRouter({
  mode: 'history',
  routes: [
    /*
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        auth: false
      }
    },
    */
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        auth: false
      }
    },
    /*
    {
      path: '/result-page',
      name: 'page-frame',
      component: PageFrame,
      meta: {
        auth: true
      }
    },
    */
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
      meta: {
        auth: false
      }
    }
  ]
});