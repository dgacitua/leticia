import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import Axios from 'axios';

import * as Constants from '../services/Constants';
import { generateUserId } from '../services/Utils'

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
    getUserData: (state) => {
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