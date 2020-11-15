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
    remainingTime: null,
    globalRemainingTime: null,
    stageIndex: null,
    flowIndex: null,
    tasks: [],
    stages: [],
    currentRoute: {},
    sessionFlow: {}
  },
  getters: {
    userData: (state) => {
      return {
        remainingTime: state.remainingTime,
        globalRemainingTime: state.globalRemainingTime,
        currentRoute: state.currentRoute,
        tasks: state.tasks,
        stages: state.stages,
        stageIndex: state.stageIndex,
        flowIndex: state.flowIndex
      };
    },
    tasks: (state) => {
      return state.tasks;
    },
    stages: (state) => {
      return state.stages;
    },
    stageIndex: (state) => {
      return state.stageIndex;
    },
    flowIndex: (state) => {
      return state.flowIndex;
    },
    sessionFlow: (state) => {
      return state.sessionFlow;
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
    setStages(state, payload) {
      state.stages = [];
      state.stages = [ ...payload.stages ];
    },
    setStageIndex(state, payload) {
      state.stageIndex = payload.amount;
    },
    nextStageIndex(state) {
      state.stageIndex++;
    },
    setFlowIndex(state, payload) {
      state.flowIndex = payload.amount;
    },
    nextFlowIndex(state) {
      state.flowIndex++;
    },
    setTaskAsDone(state, payload) {
      let taskIdx = findIndexInArray(state.tasks, (t) => { return t.searchTaskId === payload.id });
      state.tasks[taskIdx].completed = true;
    },
    setUserData(state, payload) {
      state.remainingTime = payload.data.remainingTime;
      state.globalRemainingTime = payload.data.globalRemainingTime;
      state.stageIndex = payload.data.stageIndex;
      state.flowIndex = payload.data.flowIndex;
      state.tasks = payload.data.tasks;
      state.stages = payload.data.stages;
      state.currentRoute = payload.data.currentRoute;
    },
    setSessionFlow(state, payload) {
      state.sessionFlow = payload.sessionFlow;
    },
    eraseAll(state) {
      state.remainingTime = null;
      state.globalRemainingTime = null;
      state.stageIndex = null;
      state.flowIndex = null;
      state.tasks = [];
      state.stages = [];
      state.currentRoute = {};
      state.sessionFlow = {};
    }
  },
  actions: {
    // DEPRECATED
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