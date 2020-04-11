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
    remainingTime: 120
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
    }
  },
  actions: {

  },
  plugins: [
    vuexLocal.plugin
  ]
});