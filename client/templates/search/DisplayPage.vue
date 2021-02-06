<template>
  <b-container fluid id="display-page" class="full-window">
    <div v-if="renderPage" id="container" class="container-iframe">
      <iframe id="iframe" class="display-iframe" :src="pageUrl"></iframe>
    </div>
    <div v-else>
      <h2>No se puede mostrar la página</h2>
    </div>
  </b-container>
</template>

<script>
import * as Constants from '../../services/Constants';
import EventBus from '../../modules/eventBus';

export default {
  data() {
    return {
      pageUrl: '',
      pageId: '',
      doc: {},
      renderPage: false
    }
  },

  mounted() {
    this.visitPage();
    EventBus.$emit('leticia-bookmark-button-status', { status: true, doc: this.doc });
  },

  beforeDestroy() {
    EventBus.$emit('leticia-bookmark-button-status', { status: false, doc: null });
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