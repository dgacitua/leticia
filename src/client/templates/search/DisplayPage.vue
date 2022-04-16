<template>
  <b-container fluid id="display-page" class="full-window">
    <!--
    <iframe id="page-iframe" ref="pageIframe" class="display-iframe" :src="pageUrl" @load="iframeLoaded"></iframe>
    -->
    <div v-if="renderPage" id="container" class="container-iframe">
      <iframe id="page-iframe" ref="pageIframe" class="display-iframe" sandbox="allow-same-origin" :src="pageUrl"></iframe>
    </div>
    <div v-else>
      <h2>{{ $t("search.displayPage.message") }}</h2>
    </div>
  </b-container>
</template>

<script>
import { throttle } from 'lodash';

import * as Constants from '../../services/Constants';
import { deepCopy, getNestedValue } from '../../services/Utils';
import EventBus from '../../modules/eventBus';

import MouseHandler from '../../trackers/MouseHandler';
import ScrollHandler from '../../trackers/ScrollHandler';
import ActionSender from '../../services/ActionSender';

export default {
  data() {
    return {
      pageUrl: '',
      pageId: '',
      doc: {},
      iframeElement: null,
      renderPage: true,
      mHandler: new MouseHandler('Page'),
      scHandler: new ScrollHandler('Page'),
      sender: new ActionSender('Page'),
      mouseBuffer: [],
      mouseBufferInterval: null,
      mouseMoveListener: null,
      mouseClickListener: null,
      scrollListener: null
    }
  },

  mounted() {
    this.visitPage();

    this.mouseMoveListener = throttle(this.move, 250);
    this.mouseClickListener = this.click;
    this.scrollListener = throttle(this.scroll, 250);

    this.iframeElement = this.$refs.pageIframe;
    
    this.iframeElement.onload = () => {
      let iwin = this.iframeElement.contentWindow;
      
      iwin.addEventListener('mousemove', this.mouseMoveListener);
      iwin.addEventListener('click', this.mouseClickListener);
      iwin.addEventListener('scroll', this.scrollListener);

      console.log('Trackers enabled!');
    };

    this.mouseBufferInterval = setInterval(() => {
      console.log('Emptying Mouse Buffer!');
      this.sendMouseBuffer();
    }, 15000);

    EventBus.$emit('leticia-bookmark-button-status', { status: true, doc: this.doc });
    EventBus.$emit('leticia-current-task', { currentTask: true });
  },

  beforeDestroy() {
    let iwin = this.iframeElement.contentWindow;

    if (!!this.iframeElement && !!iwin) {
      iwin.removeEventListener('mousemove', this.mouseMoveListener);
      iwin.removeEventListener('click', this.mouseClickListener);
      iwin.removeEventListener('scroll', this.scrollListener);

      console.log('Trackers disabled!');
    }

    clearInterval(this.mouseBufferInterval);

    EventBus.$emit('leticia-bookmark-button-status', { status: false, doc: null });
    EventBus.$emit('leticia-current-task', { currentTask: false });
  },

  methods: {
    visitPage() {
      if (!!this.$route.query.id && !!this.$route.params.doc) {
        this.$store.commit({ type: 'setLastVisitedDoc', doc: this.$route.params.doc });
        this.doc = this.$route.params.doc;
        this.pageUrl = `${Constants.backendUrl}${this.doc.path_s}`;
        this.pageId = this.$route.query.id || '';
        this.renderPage = true;
      }
      else {
        let lastPage = this.$store.getters.lastVisitedDoc;

        if (!!lastPage) {
          this.pageUrl = `${Constants.backendUrl}${lastPage.path_s}`;
          this.pageId = this.$route.query.id || '';
          this.renderPage = true;
        }
        else {
          this.renderPage = false;
        }
      }
      
      console.log('Visiting page!', this.pageId, this.pageUrl);
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    move(evt) {
      let mact = this.mHandler.moveElement(evt, this.iframeElement.contentDocument.documentElement);
      this.mouseBuffer.push(mact);
    },
    click(evt) {
      let mact = this.mHandler.clickElement(evt, this.iframeElement.contentDocument.documentElement);
      this.mouseBuffer.push(mact);
    },
    scroll(evt) {
      let scr = this.scHandler.scrollElement(evt, this.iframeElement.contentDocument.documentElement);

      this.sender.sendScrollAction(scr)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
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
.full-window {
  width: 100%;
  height: auto;
  padding: 0;
}

.container-iframe {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.display-iframe {
  flex-grow: 1;
  border: none;
  margin: 0;
  padding: 0;
}
</style>