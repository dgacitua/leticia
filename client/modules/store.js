import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import Axios from 'axios';

import * as Constants from '../services/Constants';
import { crc32hash } from '../services/Utils'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
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
      return (state.isParticipant && !state.finished);
    },
    userData: (state) => {
      return {
        isParticipant: state.isParticipant,
        userId: state.userId,
        finished: state.finished,
        remainingTime: remainingTime
      };
    }
  },
  mutations: {
    decreaseTime(state) {
      state.remainingTime--;
    },
    changeTime(state, payload) {
      state.remainingTime += payload.amount;
    },
    setTasks(state, payload) {
      state.tasks = payload.tasks;
    },
    setTaskAsDone(state, payload) {
      let taskIdx = state.tasks.findIndex(t => { return t.searchTaskId === payload.taskId });
      state.tasks[taskIdx].completed = true;
    },
    setCurrentRoute(state, payload) {
      state.currentRoute = payload.route;
    },
    setUserId(state, payload) {
      state.userId = payload.userId;
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
    createParticipant(context) {
      return new Promise((resolve, reject) => {
        let newParticipant = {
          userId: crc32hash(Date.now().toString()),
          registerDate: new Date()
        };

        Axios.post(`${Constants.backendApiUrl}/participants`, newParticipant)
          .then((res) => {
            console.log(`New Participant!`, newParticipant);

            context.commit({ type: 'setUserId', userId: newParticipant.userId });
            context.commit({ type: 'setParticipantStatus', status: true });
            context.commit({ type: 'setFinishedStatus', status: false });

            resolve();
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
      });
    }
  },
  plugins: [
    vuexLocal.plugin
  ]
});