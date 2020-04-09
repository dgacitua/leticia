<template>
  <div id="leticia-app">
    <navbar id="leticia-navbar"></navbar>
    <router-view id="leticia-content" @interaction="captureInteraction"></router-view>
  </div>
</template>

<script>
//import WebSocket from '../services/WebSocket';
import Navbar from './Navbar.vue';
import axios from 'axios';

export default {
  components: {
    navbar: Navbar
  },
  
  mounted () {
    // TODO
  },

  methods: {
    captureInteraction(event) {
      console.log(`[captureEvent] `, event);
      // axios.post(`${process.env.VUE_APP_BACKEND_API}interactions/`, event)
      // .then(response => {
      //   console.log(`[${Date.now()}] interaction saved`, event);
      // })
      // .catch(error => {
      //   console.log(error);
      // });
    }
  }
}
</script>

<style scoped>
#leticia-content {
  padding: 5px 5px 5px 5px;
}
</style>