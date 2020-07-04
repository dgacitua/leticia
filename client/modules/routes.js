import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';
import VueAxios from 'vue-axios';

import * as Constants from '../services/Constants';
import { store } from './store';
import { isEmptyObject, parseCircularObject } from '../services/Utils';

import Home from '../templates/Home.vue';
import InformedConsent from '../templates/InformedConsent.vue';
import Demographic from '../templates/Demographic.vue';
import Instructions from '../templates/Instructions.vue';
import Login from '../templates/Login.vue';
import Register from '../templates/Register.vue';
import TaskForm from '../templates/queryPlanning/TaskForm.vue';
import TaskSelector from '../templates/queryPlanning/TaskSelector.vue';
import QueryWriter from '../templates/queryPlanning/QueryWriter.vue';
import Profile from '../templates/Profile.vue';
import UserHub from '../templates/hubs/UserHub.vue';
import AdminHub from '../templates/hubs/AdminHub.vue';
import End from '../templates/End.vue';
import NotFound from '../templates/NotFound.vue';

Vue.use(VueRouter);
Vue.use(VueAxios, Axios);

Axios.defaults.baseURL = `${Constants.backendApiUrl}/`;

let isFirstTransition = true;

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        auth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        auth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        auth: false
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        auth: true
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
      path: '/demographic',
      name: 'demographic',
      component: Demographic,
      meta: {
        auth: true
      }
    },
    {
      path: '/instructions',
      name: 'instructions',
      component: Instructions,
      meta: {
        auth: true
      }
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TaskSelector,
      meta: {
        auth: true
      }
    },
    {
      path: '/taskform',
      name: 'taskform',
      component: TaskForm,
      meta: {
        auth: true
      }
    },
    {
      path: '/query',
      name: 'query',
      component: QueryWriter,
      meta: {
        auth: true
      }
    },
    {
      path: '/user-hub',
      name: 'user-hub',
      component: UserHub,
      meta: {
        auth: true
      }
    },
    {
      path: '/admin-hub',
      name: 'admin-hub',
      component: AdminHub,
      meta: {
        auth: true,
        admin: true
      }
    },
    {
      path: '/end',
      name: 'end',
      component: End,
      meta: {
        auth: true
      }
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
      meta: {
        auth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // dgacitua: Redirect to last known route
  // https://css-tricks.com/storing-and-using-the-last-known-route-in-vue/
  const currentRoute = store.state.currentRoute;
  const loggedIn = localStorage.getItem('leticia-user');

  if (currentRoute && !isEmptyObject(currentRoute) && isFirstTransition && to.name !== currentRoute.name) {
    next(currentRoute);
  }
  else {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (to.matched.some(record => record.meta.auth) && !loggedIn) {
      next('/login');
    }
    else {
      next();
    }
  }

  isFirstTransition = false;
});

router.afterEach((to, from) => {
  const loggedIn = localStorage.getItem('leticia-user');

  if (loggedIn) {
    store.commit({ type: 'setCurrentRoute', route: parseCircularObject(to) });
  }
});

export { router };