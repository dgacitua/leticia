import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import Axios from 'axios';

import * as Constants from '../services/Constants';
import { findIndexInArray, shuffleArray, deepCopy } from '../services/Utils';

import { auth } from './auth';
import Timer from '../services/Timer';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: 'leticia-vuex',
  storage: window.localStorage
});

const store = new Vuex.Store({
  state: {
    timerTime: null,
    timerDuration: null,
    timerStatus: null,
    stageIndex: null,
    flowIndex: null,
    tasks: [],
    stages: [],
    currentRoute: {},
    sessionFlow: {},
    hasAcceptedConsent: false,
    lastVisitedDoc: null,
    bookmarkList: [],
    currentTask: null
  },
  getters: {
    userData: (state) => {
      return {
        timerTime: state.timerTime,
        timerDuration: state.timerDuration,
        timerStatus: state.timerStatus,
        stageIndex: state.stageIndex,
        flowIndex: state.flowIndex,
        tasks: state.tasks,
        stages: state.stages,
        currentRoute: state.currentRoute,
        //sessionFlow: state.sessionFlow,
        hasAcceptedConsent: state.hasAcceptedConsent,
        lastVisitedDoc: state.lastVisitedDoc,
        bookmarkList: state.bookmarkList,
        currentTask: state.currentTask
      };
    },
    timer: (state) => {
      return {
        time: state.timerTime,
        duration: state.timerDuration,
        status: state.timerStatus
      }
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
    },
    lastVisitedDoc: (state) => {
      return state.lastVisitedDoc;
    },
    bookmarks: (state) => {
      return state.bookmarkList;
    },
    currentTask: (state) => {
      return state.currentTask;
    }
  },
  // Use "commit" to call mutations (sync)
  mutations: {
    setTimerTime(state, payload) {
      state.timerTime = payload.time;
    },
    setTimerDuration(state, payload) {
      state.timerDuration = payload.time;
    },
    setTimerStatus(state, payload) {
      state.timerStatus = payload.status;
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
    setAcceptedConsent(state, payload) {
      state.hasAcceptedConsent = payload.state;
    },
    setUserData(state, payload) {
      state.timerTime = payload.data.timerTime;
      state.timerDuration = payload.data.timerDuration;
      state.timerStatus = payload.data.timerStatus;
      state.stageIndex = payload.data.stageIndex;
      state.flowIndex = payload.data.flowIndex;
      state.tasks = payload.data.tasks;
      state.stages = payload.data.stages;
      state.currentRoute = payload.data.currentRoute;
      //state.sessionFlow = payload.data.sessionFlow;
      state.hasAcceptedConsent = payload.data.hasAcceptedConsent;
      state.lastVisitedDoc = payload.data.lastVisitedDoc;
      state.bookmarkList = payload.data.bookmarkList;
      state.currentTask = payload.data.currentTask;
    },
    setSessionFlow(state, payload) {
      state.sessionFlow = payload.sessionFlow;
    },
    setLastVisitedDoc(state, payload) {
      state.lastVisitedDoc = payload.doc;
    },
    setCurrentTask(state, payload) {
      state.currentTask = payload.task;
    },
    setBookmarks(state, payload) {
      state.bookmarkList = payload.list;
    },
    eraseAll(state) {
      state.timerTime = null;
      state.timerDuration = null;
      state.timerStatus = null;
      state.stageIndex = null;
      state.flowIndex = null;
      state.tasks = [];
      state.stages = [];
      state.currentRoute = {};
      state.sessionFlow = {};
      state.hasAcceptedConsent = false;
      state.lastVisitedDoc = null;
      state.bookmarkList = [];
      state.currentTask = null;
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