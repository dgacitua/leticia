import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    query: null,
    documents: [],
    remainingTime: 120,
    tasks: [],
    currentRoute: {}
  },
  getters: {
    remainingTime: (state) => {
      return state.remainingTime;
    }
  },
  mutations: {
    setQuery(state, query) {
      state.query = query;
    },
    setDocuments(state, documents) {
      state.documents = documents;
    },
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
    eraseAll(state) {
      state.remainingTime = 120;
      state.tasks = [];
    }
  },
  actions: {
    changeTime(context) {
      return new Promise((resolve, reject) => {
        context.commit({ type: 'changeType', amount: -1 });
        resolve();
      });
    }
  },
  plugins: [
    vuexLocal.plugin
  ]
});