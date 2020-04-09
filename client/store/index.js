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
    documents: []
  },
  mutations: {
    setQuery(state, query) {
      state.query = query;
    },
    setDocuments(state, documents) {
      state.documents = documents;
    },
  },
  actions: {

  },
  plugins: [
    vuexLocal.plugin
  ]
});