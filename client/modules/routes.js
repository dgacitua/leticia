import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';
import VueAxios from 'vue-axios';

import * as Constants from '../services/Constants';
import store from './store';
import { getVueObject, isEmptyObject } from '../services/Utils';

import Home from '../templates/Home.vue';
import InformedConsent from '../templates/InformedConsent.vue';
import Demographic from '../templates/Demographic.vue';
import Instructions from '../templates/Instructions.vue';
import Login from '../templates/Login.vue';
import Register from '../templates/Register.vue';
import TaskForm from '../templates/queryPlanning/TaskForm.vue';
import TaskSelector from '../templates/queryPlanning/TaskSelector.vue';
import QueryWriter from '../templates/queryPlanning/QueryWriter.vue';
import End from '../templates/End.vue';
import NotFound from '../templates/NotFound.vue';

Vue.use(VueRouter);
Vue.use(VueAxios, Axios);

Axios.defaults.baseURL = `${Constants.backendApiUrl}/`;

let isFirstTransition = true;

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        auth: false,
        isParticipant: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        auth: false,
        isParticipant: false
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        auth: false,
        isParticipant: false
      }
    },
    {
      path: '/consent',
      name: 'consent',
      component: InformedConsent,
      meta: {
        auth: false,
        isParticipant: false
      }
    },
    {
      path: '/demographic',
      name: 'demographic',
      component: Demographic,
      meta: {
        auth: false,  // TODO Login
        isParticipant: true
      }
    },
    {
      path: '/instructions',
      name: 'instructions',
      component: Instructions,
      meta: {
        auth: false,
        isParticipant: true
      }
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TaskSelector,
      meta: {
        auth: false,
        isParticipant: true
      }
    },
    {
      path: '/taskform',
      name: 'taskform',
      component: TaskForm,
      meta: {
        auth: false,
        isParticipant: true
      }
    },
    {
      path: '/query',
      name: 'query',
      component: QueryWriter,
      meta: {
        auth: false,
        isParticipant: true
      }
    },
    {
      path: '/end',
      name: 'end',
      component: End,
      meta: {
        auth: false,
        isParticipant: true
      }
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
      meta: {
        auth: false,
        isParticipant: false
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentRoute = getVueObject(store.state.currentRoute);
  console.log('BE', currentRoute, to, from);

  if (currentRoute && !isEmptyObject(currentRoute) && isFirstTransition && to.name !== currentRoute.name) {
    next(currentRoute);
  }
  else {
    if (to.matched.some(record => record.meta.isParticipant)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!store.getters.isValidParticipant) {
        next({
          path: '/',
          query: { redirect: to.fullPath }
        });
      }
      else {
        next();
      }
    }
    else {
      next();
    }
  }

  isFirstTransition = false;
});

router.afterEach((to, from) => {
  if (store.getters.isValidParticipant) {
    store.commit({ type: 'setCurrentRoute', route: to });
    
    //const currentRoute = getVueObject(store.state.currentRoute);
    //console.log('AE', currentRoute);
  }
});