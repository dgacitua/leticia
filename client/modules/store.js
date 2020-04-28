import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import Axios from 'axios';

import * as Constants from '../services/Constants';
import { generateUserId, findIndexInArray, shuffleArray, deepCopy } from '../services/Utils';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: 'leticia-vuex',
  storage: window.localStorage
});

const store = new Vuex.Store({
  state: {
    isParticipant: false,
    userId: null,
    finished: false,
    remainingTime: 120,
    tasks: [],
    currentRoute: {}
  },
  getters: {
    isValidParticipant: (state) => {
      return (state.isParticipant && state.userId && !state.finished);
    },
    userData: (state) => {
      return {
        isParticipant: state.isParticipant,
        userId: state.userId,
        finished: state.finished,
        remainingTime: state.remainingTime
      };
    },
    tasks: (state) => {
      return state.tasks;
    }
  },
  mutations: {
    decreaseTime(state) {
      state.remainingTime--;
    },
    changeTime(state, payload) {
      state.remainingTime += payload.amount;
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
    setUserId(state, payload) {
      state.userId = payload.id;
    },
    setParticipantStatus(state, payload) {
      state.isParticipant = payload.status;
    },
    setFinishedStatus(state, payload) {
      state.finished = payload.status;
    },
    eraseAll(state) {
      state.isParticipant = false;
      state.userId = null;
      state.finished = false;
      state.remainingTime = 120;
      state.tasks = [];
      state.currentRoute = {};
    }
  },
  actions: {
    changeTime(context) {
      return new Promise((resolve, reject) => {
        context.commit({ type: 'changeTime', amount: -1 });
        resolve();
      });
    },
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
    createParticipant(context) {
      return new Promise((resolve, reject) => {
        const userId = generateUserId();
        const registerDate = new Date();
        const newParticipant = { userId, registerDate };

        Axios.post(`${Constants.backendApiUrl}/participants`, newParticipant)
          .then((res) => {
            const response = res.data.participantData;
            console.log(`New Participant!`, response);

            context.commit({ type: 'eraseAll' });
            context.commit({ type: 'setUserId', id: response.userId });
            context.commit({ type: 'setParticipantStatus', status: true });
            context.commit({ type: 'setFinishedStatus', status: false });

            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  },
  plugins: [
    vuexLocal.plugin
  ]
});

export { store };