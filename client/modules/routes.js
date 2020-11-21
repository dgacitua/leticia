import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';
import VueAxios from 'vue-axios';

import * as Constants from '../services/Constants';
import EventBus from './eventBus';
import { store } from './store';
import { isEmptyObject, parseCircularObject } from '../services/Utils';

import Home from '../templates/Home.vue';
import InformedConsent from '../templates/InformedConsent.vue';
import Demographic from '../templates/questionnaires/Demographic.vue';
import ExitSurvey from '../templates/questionnaires/ExitSurvey.vue';
import TypingTest from '../templates/questionnaires/TypingTest.vue';
import Instructions from '../templates/Instructions.vue';
import Login from '../templates/auth/Login.vue';
import Register from '../templates/auth/Register.vue';
import OAuth from '../templates/auth/OAuth.vue';
import Redirect from '../templates/queryPlanning/Redirect.vue';
import TaskDescription from '../templates/queryPlanning/TaskDescription.vue';
import TaskForm from '../templates/queryPlanning/TaskForm.vue';
import TaskSelector from '../templates/queryPlanning/TaskSelector.vue';
import QueryWriter from '../templates/queryPlanning/QueryWriter.vue';
import Profile from '../templates/Profile.vue';
import ShortChallenge from '../templates/ShortChallenge.vue';
import UserHub from '../templates/hubs/UserHub.vue';
import AdminHub from '../templates/hubs/AdminHub.vue';
import End from '../templates/End.vue';
import NotFound from '../templates/NotFound.vue';

import PdfRender from '../templates/PdfRender.vue';

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
      path: '/oauth',
      name: 'oauth',
      component: OAuth,
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
      path: '/typing',
      name: 'typing',
      component: TypingTest,
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
      path: '/short-challenge',
      component: ShortChallenge,
      meta: {
        auth: true
      },
      children: [
        {
          path: '',
          component: Redirect,
        },
        {
          path: 'description',
          component: TaskDescription,
        },
        {
          path: 'taskform',
          component: TaskForm,
        },
        {
          path: 'query',
          component: QueryWriter,
        }
      ]
    },
    {
      path: '/admin-hub',
      name: 'admin-hub',
      component: AdminHub,
      meta: {
        /*
        auth: true,
        admin: true
        */
      }
    },
    {
      path: '/exit-survey',
      name: 'exit-survey',
      component: ExitSurvey,
      meta: {
        auth: true
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
    },
    {
      path: '/pdf',
      name: 'pdf',
      component: PdfRender,
      meta: {
        auth: false
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
      next('/oauth');
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
    //store.commit({ type: 'setCurrentRoute', route: parseCircularObject(to) });

    // dgacitua: https://itnext.io/yes-this-is-how-vue-router-guards-work-when-to-use-them-ed7e34946211
    let newRoute = to.path;
    console.log('afterEach!', newRoute);

    if (newRoute === '/' || newRoute === '/consent' || newRoute === '/oauth' || newRoute === '/user-hub' || newRoute === '/admin-hub') {
      if (store.getters.timer.status === 'running') {
        EventBus.$emit('leticia-timer-pause');
      }
    }
    else {
      if (store.getters.timer.status === 'paused') {
        EventBus.$emit('leticia-timer-resume');
      }
    }
  }
});

export { router };