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
    tasks: []
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