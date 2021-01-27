<template>
  <b-container fluid id="display-page" class="full-window">
    <div v-if="renderPage">
      <b-embed type="iframe" :src="pageUrl"></b-embed>
    </div>
    <div v-else>
      <h2>No se puede mostrar la página</h2>
    </div>
  </b-container>
</template>

<script>
import * as Constants from '../../services/Constants';

export default {
  data() {
    return {
      pageUrl: '',
      pageId: '',
      renderPage: false
    }
  },

  mounted() {
    this.visitPage();
  },

  methods: {
    visitPage() {
      if (!!this.$route.query.id && !!this.$route.params.url) {
        this.$store.commit({ type: 'setLastVisitedPageUrl', url: this.$route.params.url });
        this.pageUrl = `${Constants.backendUrl}${this.$route.params.url}`;
        this.pageId = this.$route.query.id || '';
        this.renderPage = true;
      }
      else {
        let lastPage = this.$store.getters.lastVisitedPageUrl;

        if (!!lastPage) {
          this.pageUrl = `${Constants.backendUrl}${lastPage}`;
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
  height: 100%;
  padding: 0;
}
</style>