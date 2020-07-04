import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import Axios from 'axios';

import * as Constants from '../services/Constants';
import { generateUserId, findIndexInArray, shuffleArray, deepCopy } from '../services/Utils';
import { auth } from './auth';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: 'leticia-vuex',
  storage: window.localStorage
});

const store = new Vuex.Store({
  state: {
    remainingTime: -1,
    globalRemainingTime: -1,
    tasks: [],
    currentRoute: {}
  },
  getters: {
    userData: (state) => {
      return {
        remainingTime: state.remainingTime,
        globalRemainingTime: state.globalRemainingTime
      };
    },
    tasks: (state) => {
      return state.tasks;
    }
  },
  mutations: {
    setTime(state, payload) {
      state.remainingTime = payload.time;
    },
    setGlobalTime(state, payload) {
      state.globalRemainingTime = payload.time;
    },
    changeTime(state, payload) {
      state.remainingTime += payload.amount;
    },
    changeGlobalTime(state, payload) {
      state.globalRemainingTime += payload.amount;
    },
    setCurrentRoute(state, payload) {
      state.currentRoute = payload.route;
    },
    setTasks(state, payload) {
      state.tasks = [];
      state.tasks = [ ...payload.tasks ];
    },
    setTaskAsDone(state, payload) {
      let taskIdx = findIndexInArray(state.tasks, (t) => { return t.searchTaskId === payload.id });
      state.tasks[taskIdx].completed = true;
    },
    eraseAll(state) {
      state.remainingTime = 120;
      state.tasks = [];
      state.currentRoute = {};
    }
  },
  actions: {
    fetchTasks(context) {
      return new Promise((resolve, reject) => {
        Axios.get(`${Constants.backendApiUrl}/tasks`)
          .then((res) => {
            const newTasks = deepCopy(shuffleArray(res.data));
            context.commit({ type: 'setTasks', tasks: newTasks });
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    eraseAll(context) {
      context.commit({ type: 'eraseAll' });
    }
  },
  plugins: [
    vuexLocal.plugin
  ],
  modules: {
    auth
  }
});

export { store };