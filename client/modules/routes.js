import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';
import VueAxios from 'vue-axios';

import * as Constants from '../services/Constants';

import Home from '../templates/Home.vue';
import InformedConsent from '../templates/InformedConsent.vue';
import Baseline from '../templates/Baseline.vue';
import Instructions from '../templates/Instructions.vue';
//import Login from '../templates/Login.vue';
import TaskForm from '../templates/queryPlanning/TaskForm.vue';
import TaskSelector from '../templates/queryPlanning/TaskSelector.vue';
import QueryWriter from '../templates/queryPlanning/QueryWriter.vue';
import End from '../templates/End.vue';
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
    {
      path: '/consent',
      name: 'consent',
      component: InformedConsent,
      meta: {
        auth: false
      }
    },
    {
      path: '/baseline',
      name: 'baseline',
      component: Baseline,
      meta: {
        auth: false
      }
    },
    {
      path: '/instructions',
      name: 'instructions',
      component: Instructions,
      meta: {
        auth: false
      }
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TaskSelector,
      meta: {
        auth: false
      }
    },
    {
      path: '/taskform',
      name: 'taskform',
      component: TaskForm,
      meta: {
        auth: false
      }
    },
    {
      path: '/query',
      name: 'query',
      component: QueryWriter,
      meta: {
        auth: false
      }
    },
    {
      path: '/end',
      name: 'end',
      component: End,
      meta: {
        auth: false
      }
    },
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