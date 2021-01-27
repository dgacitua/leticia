<template>
  <b-container fluid id="display-page" class="full-window">
    <div v-if="pageId==='' && pageUrl===''">
      <h2>No se puede mostrar la página</h2>
    </div>
    <div v-else>
      <b-embed type="iframe" :src="pageUrl"></b-embed>
    </div>
  </b-container>
</template>

<script>
import * as Constants from '../../services/Constants';

export default {
  data() {
    return {
      pageUrl: '',
      pageId: ''
    }
  },

  mounted() {
    this.visitPage();
  },

  methods: {
    visitPage() {
      this.pageUrl = !!(this.$route.query.url) ? `${Constants.backendUrl}${decodeURI(this.$route.query.url)}` : '';
      this.pageId = !!(this.$route.query.id) ? decodeURI(this.$route.query.id) : '';

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