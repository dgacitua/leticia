<template>
  <b-container id="search-window">
    <br>
    <div id="full-search" v-if="displayFullSearch">
      <b-row class="text-center" align-h="center">
        <b-col>
          <b-img fluid :src="logo"></b-img>
        </b-col>
      </b-row>
      <br>
      <b-row class="text-center" align-h="center">
        <b-col cols="10">
          <b-input-group size="lg">
            <!-- TODO Add trackers -->
            <b-form-input id="query-box" v-model="query" @keydown.enter="doSearch"></b-form-input>
            <b-button variant="success" @click="doSearch">
              <font-awesome-icon :icon="['fas', 'search']"></font-awesome-icon>
              Buscar
            </b-button>
          </b-input-group>
        </b-col>
      </b-row>
    </div>
    <div id="serp-search" v-if="!displayFullSearch">
      <b-row class="text-center" align-v="center">
        <b-col cols="3">
          <b-img fluid :src="logo"></b-img>
        </b-col>
        <b-col cols="9">
          <b-input-group size="lg">
            <!-- TODO Add trackers -->
            <b-form-input id="query-box" v-model="query" @keydown.enter="doSearch"></b-form-input>
            <b-button variant="success" @click="doSearch">
              <font-awesome-icon :icon="['fas', 'search']"></font-awesome-icon>
              Buscar
            </b-button>
          </b-input-group>
        </b-col>
      </b-row>
      <br>
      <hr>
      <br>
      <div id="serp-empty" v-if="serpStatus === 'empty'">
        <b-row class="text-center">
          <b-col>
            <h3>No se han encontrado resultados de búsqueda</h3>
          </b-col>
        </b-row>
      </div>
      <div id="serp-loading" v-else-if="serpStatus === 'loading'">
        <b-row class="text-center">
          <b-col>
            <font-awesome-icon :icon="['fas', 'spinner']" size="3x" spin></font-awesome-icon>
          </b-col>
        </b-row>
      </div>
      <div id="serp-results" v-else-if="serpStatus === 'results'">
        <b-row v-for="(doc, index) in searchResults" :key="index">
          <b-col>
            <div :id="`search-result-${doc.ranking}`" @mouseenter="mouseenter($event, doc.ranking)">
              <div class="result-url">{{ doc.url_s }}</div>
              <div class="result-title">
                <b-link 
                  :to="{ name: 'page', query: { id: doc.docId_s }, params: { url: doc.path_s }}"
                  @click.native="searchResultClick($event, doc)"
                >
                  {{ doc.title_t }}
                </b-link>
                </div>
              <div class="result-snippet" v-html="doc.searchSnippet"></div>
            </div>
            <br>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-pagination-nav
              v-model="currentPage"
              :link-gen="queryPage"
              :number-of-pages="numPages"
              align="center"
              @click.native="pagination($event, currentPage)"
              first-number
              last-number
              use-router
            >
            </b-pagination-nav>
          </b-col>
        </b-row>
      </div>
      <div id="serp-other" v-else>
        <b-row class="text-center">
          <b-col>
            <h3>Cargando...</h3>
          </b-col>
        </b-row>
      </div>
    </div>
  </b-container>
</template>

<script>
import Axios from 'axios';

import * as Constants from '../../services/Constants';
import ActionHandler from '../../trackers/ActionHandler';
import MouseHandler from '../../trackers/MouseHandler';
import KeystrokeHandler from '../../trackers/KeystrokeHandler';
import ScrollHandler from '../../trackers/ScrollHandler';
import ActionSender from '../../services/ActionSender';

import Logo from '../../assets/leticia-logo-search.png';

const DOCS_PER_PAGE = 10;

export default {
  name: 'search',

  data() {
    return {
      mHandler: new MouseHandler('Search'),
      ksHandler: new KeystrokeHandler('Search'),
      scHandler: new ScrollHandler('Search'),
      actionHandler: new ActionHandler('Search'),
      sender: new ActionSender('Search'),
      logo: Logo,
      query: '',
      displayFullSearch: true,
      serpStatus: 'loading',
      searchResults: [],
      numResults: 0,
      currentPage: 1,
      perPage: DOCS_PER_PAGE
    }
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    numPages() {
      return Math.floor(this.numResults / this.perPage) + 1;
    }
  },

  mounted() {
    this.scHandler.bindTracker();
    this.doSearch();
  },

  beforeDestroy() {
    this.scHandler.unbindTracker();
  },

  methods: {
    doSearch() {
      this.query = this.query || '';
      this.currentPage = this.$route.query.p || 1;

      if (this.query.length > 0) {
        // dgacitua: https://stackoverflow.com/a/62125496
        this.$router.push({ path: '/extended-challenge/search', query: { q: this.query, p: (this.currentPage || 1), t: Date.now() }});

        this.searchQuery();
        this.displayFullSearch = false;
      }
      else {
        this.displayFullSearch = true;
      }
    },
    searchQuery() {
      if (this.query.length > 0) {
        this.serpStatus = 'loading';
        
        Axios.get(`${Constants.backendApiUrl}/search?q=${this.query}&p=${this.currentPage || 1}`)
          .then((res) => {
            this.displayFullSearch = false;
            this.numResults = res.data.result.numFound || 0;
            this.numStart = res.data.result.start || 0;
            this.searchResults = res.data.result.docs || [];

            console.log(this.searchResults);

            if (this.searchResults.length > 0) this.serpStatus = 'results';
            else this.serpStatus = 'empty';
          })
          .catch((err) => {
            console.error(err);
            alert('Ha ocurrido un error al hacer la búsqueda');
            this.serpStatus = 'empty'
          });
      }
    },
    queryPage(pageNum) {
      return { path: '/extended-challenge/search', query: { q: this.query, p: pageNum, t: Date.now() }};
    },
    mouseenter(evt, ranking) {
      let me = this.mHandler.enter(evt, ranking);

      this.sender.sendMouseAction(me)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
    },
    pagination(evt, page) {
      let act = this.actionHandler.pagination(evt, page);

      this.sender.sendGenericAction(act)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
    },
    searchResultClick(evt, doc) {
      let act = this.actionHandler.searchResultClick(evt, doc);

      this.sender.sendGenericAction(act)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
    }
  }
}
</script>

<style scoped>
.result-title {
  font-family: arial, sans-serif;
  font-size: 20px;
  color: #1a0dab;
}

.result-url {
  font-family: arial, sans-serif;
  font-size: 14px;
  color: #5f6368;
}

.result-snippet {
  font-family: arial, sans-serif;
  font-size: 14px;
  color: #4d5156;
}

.result-snippet >>> .hl {
  font-style: normal;
  font-weight: bold;
}
</style>