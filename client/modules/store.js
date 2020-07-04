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
    isParticipant: false,
    userId: null,
    finished: false,
    remainingTime: -1,
    globalRemainingTime: -1,
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
    },
    finishParticipant(context, payload) {
      return new Promise((resolve, reject) => {
        context.commit({ type: 'setFinishedStatus', status: true });
        context.commit({ type: 'setParticipantStatus', status: false });

        const participant = {
          userId: context.state.userId,
          finished: context.state.finished,
          finishedReason: payload.reason || ''
        };

        console.log(participant);

        Axios.put(`${Constants.backendApiUrl}/participants/${participant.userId}`, participant)
          .then((res) => {
            context.commit({ type: 'eraseAll' });
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