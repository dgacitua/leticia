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
            <!-- Keyboard interaction capture on input (example start) -->
            <b-form-input
              id="query-box"
              name="query-box-full"
              @focus="focus"
              @blur="blur"
              @keydown="keydown"
              @keyup="keyup"
              @keydown.enter="writeQuery"
              @paste.prevent
              v-model="query"
              type="text"
              autocomplete="off"
            ></b-form-input>
            <!-- Keyboard interaction capture on input (example end) -->
            <b-button variant="success" @click="writeQuery">
              <font-awesome-icon :icon="['fas', 'search']"></font-awesome-icon>
              {{ $t("search.searchModule.searchButton") }}
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
            <!-- Keyboard interaction capture on input (example start) -->
            <b-form-input
              id="query-box"
              name="query-box-upper"
              @focus="focus"
              @blur="blur"
              @keydown="keydown"
              @keyup="keyup"
              @keydown.enter="writeQuery"
              @paste.prevent
              v-model="query"
              type="text"
              autocomplete="off"
            ></b-form-input>
            <!-- Keyboard interaction capture on input (example end) -->
            <b-button variant="success" @click="writeQuery">
              <font-awesome-icon :icon="['fas', 'search']"></font-awesome-icon>
              {{ $t("search.searchModule.searchButton") }}
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
            <h3>{{ $t("search.searchModule.noResultsFound") }}</h3>
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
              <div>
                <b-link
                  class="result-title"
                  :to="{ name: 'page', query: { id: doc.docId_s }, params: { doc: doc }}"
                  @auxclick.prevent.stop
                  @click="searchResultClick($event, doc)"
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
            <b-pagination
              v-model="currentPage"
              :total-rows="numResults"
              :per-page="perPage"
              align="center"
              @input="pagination"
              @auxclick.native.prevent.stop
              first-number
              last-number
              use-router
            ></b-pagination>
            <!--
            <b-pagination-nav
              v-model="currentPage"
              :link-gen="queryPage"
              :number-of-pages="numPages"
              align="center"
              @input="pagination"
              @auxclick.native.prevent.stop
              first-number
              last-number
              use-router
            >
            </b-pagination-nav>
            -->
          </b-col>
        </b-row>
      </div>
      <div id="serp-other" v-else>
        <b-row class="text-center">
          <b-col>
            <h3>{{ $t("search.searchModule.loadingMessage") }}</h3>
          </b-col>
        </b-row>
      </div>
    </div>
  </b-container>
</template>

<script>
import Axios from 'axios';
import { throttle } from 'lodash';

import EventBus from '../../modules/eventBus';
import * as Constants from '../../services/Constants';
import { deepCopy, isArray } from '../../services/Utils';

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
      keystrokeBuffer: [],
      mouseBuffer: [],
      mouseBufferInterval: null,
      mouseMoveListener: null,
      mouseClickListener: null,
      scrollListener: null,
      logo: Logo,
      taskId: '',
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

  watch: {
    '$route.query.q': function(query) {
      this.searchQuery();
    },
    '$route.query.p': function(page) {
      this.searchQuery();
    }
  },

  mounted() {
    this.taskId = this.$route.query.task;

    /* Mouse interaction capture on window (example start) */

    // Set listeners (throttled to 250ms)
    this.mouseMoveListener = throttle(this.move, 250);
    this.mouseClickListener = this.click;
    this.scrollListener = throttle(this.scroll, 250);

    // Bind listeners to window
    window.addEventListener('mousemove', this.mouseMoveListener);
    window.addEventListener('click', this.mouseClickListener);
    window.addEventListener('scroll', this.scrollListener);
    console.log('Trackers enabled!');

    // Set interval to empty the mouse actions buffer every 15s
    this.mouseBufferInterval = setInterval(() => {
      console.log('Emptying Mouse Buffer!');
      this.sendMouseBuffer();
    }, 15000);

    /* Mouse interaction capture on window (example end) */

    EventBus.$emit('leticia-current-task', { currentTask: true });

    this.searchQuery();
    this.resetBookmarks();
  },

  beforeDestroy() {
    window.removeEventListener('mousemove', this.mouseMoveListener);
    window.removeEventListener('click', this.mouseClickListener);
    window.removeEventListener('scroll', this.scrollListener);
    console.log('Trackers disabled!');

    clearInterval(this.mouseBufferInterval);

    EventBus.$emit('leticia-current-task', { currentTask: false });
  },

  methods: {
    writeQuery() {
      this.$router.push({ path: '/extended-challenge/search', query: { task: this.taskId, q: this.query, p: 1 }});
      this.searchAction(this.query);
    },
    searchQuery() {
      // dgacitua: Send keystrokes and mouse actions
      this.sendKeystrokeBuffer();
      this.sendMouseBuffer();
      
      // dgacitua: Send search request
      this.query = this.query || this.$route.query.q || '';
      this.currentPage = this.$route.query.p || 1;

      if (this.query.length > 0 && this.query !== '*') {
        this.serpStatus = 'loading';
        this.displayFullSearch = false;

        //this.searchAction(this.query);
        
        Axios.get(`${Constants.backendApiUrl}/search?q=${this.query}&p=${this.currentPage || 1}`)
          .then((res) => {
            this.displayFullSearch = false;
            this.numResults = res.data.result.numFound || 0;
            this.numStart = res.data.result.start || 0;
            this.searchResults = res.data.result.docs || [];

            //console.log(this.searchResults);

            if (this.searchResults.length > 0) this.serpStatus = 'results';
            else this.serpStatus = 'empty';
          })
          .catch((err) => {
            console.error(err);
            alert('An error ocurred while performing search [Code 472]');
            this.serpStatus = 'empty'
          });
      }
      else {
        this.displayFullSearch = true;
      }
    },
    queryPage(pageNum) {
      return { path: '/extended-challenge/search', query: { task: this.taskId, q: this.query, p: pageNum }};
    },
    resetBookmarks() {
      if (!isArray(this.$store.getters.bookmarks)) this.$store.commit({ type: 'setBookmarks', list: [] });
    },
    move(evt) {
      let mact = this.mHandler.move(evt);
      this.mouseBuffer.push(mact);
      /*
      this.sender.sendMouseAction(mact)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
      */
    },
    click(evt) {
      let mact = this.mHandler.click(evt);
      this.mouseBuffer.push(mact);
      /*
      this.sender.sendMouseAction(mact)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
      */
    },
    scroll(evt) {
      let scr = this.scHandler.scroll(evt);

      this.sender.sendScrollAction(scr)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
    },
    focus(evt) {
      let act = this.actionHandler.focus(evt);

      this.sender.sendGenericAction(act)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
    },
    blur(evt) {
      let act = this.actionHandler.blur(evt);

      this.sender.sendGenericAction(act)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
    },
    keydown(evt) {
      let ks = this.ksHandler.keydown(evt);
      this.keystrokeBuffer.push(ks);
    },
    keyup(evt) {
      let ks = this.ksHandler.keyup(evt);
      this.keystrokeBuffer.push(ks);
    },
    mouseenter(evt, ranking) {
      let me = this.mHandler.enter(evt, ranking);

      this.sender.sendMouseAction(me)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
    },
    pagination(page) {
      let act = this.actionHandler.pagination(null, page);

      this.sender.sendGenericAction(act)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));

      this.$router.push({ path: '/extended-challenge/search', query: { task: this.taskId, q: this.query, p: (this.currentPage || 1) }});
    },
    searchResultClick(evt, doc) {
      let act = this.actionHandler.searchResultClick(evt, doc);

      this.sender.sendGenericAction(act)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
    },
    searchAction(queryText) {
      let act = {
        type: 'SearchQuery',
        source: 'Search',
        url: window.document.URL,
        clientTimestamp: Date.now(),
        details: {
          query: queryText
        }
      };

      this.sender.sendGenericAction(act)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
    },
    sendKeystrokeBuffer() {
      if (this.keystrokeBuffer.length > 0) {
        let buffer = deepCopy(this.keystrokeBuffer);
        this.keystrokeBuffer.length = 0;

        this.sender.sendKeystrokeBuffer(buffer)
          .then(res => console.log(res.data))
          .catch(err => console.error(err));
      }
    },
    sendMouseBuffer() {
      if (this.mouseBuffer.length > 0) {
        let tempBuffer = deepCopy(this.mouseBuffer);
        this.mouseBuffer.length = 0;

        this.sender.sendMouseBuffer(tempBuffer)
          .then(res => console.log(res.data))
          .catch(err => console.error(err));
      }
    }
  }
}
</script>

<style scoped>
.result-title {
  font-family: arial, sans-serif;
  font-size: 20px;
}

.result-title:link {
  color: #1a0dab;
}

.result-title:visited {
  color: #609;
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