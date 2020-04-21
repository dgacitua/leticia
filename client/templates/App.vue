<template>
  <div id="leticia-app">
    <navbar id="leticia-navbar"></navbar>
    <router-view id="leticia-content"></router-view>
  </div>
</template>

<script>
import Axios from 'axios';

import * as Constants from '../services/Constants';
import WebSocket from '../services/WebSocket';

import * as KeystrokeTracker from '../trackers/keystroke';
import * as MouseTracker from '../trackers/mouse';
import * as ScrollTracker from '../trackers/scroll';

import Navbar from './Navbar';

export default {
  components: {
    navbar: Navbar
  },

  computed: {
    remainingTime() {
      return this.$store.state.remainingTime
    }
  },
  
  beforeMount() {
    KeystrokeTracker.bindTracker();
    MouseTracker.bindTracker();
    ScrollTracker.bindTracker();

    window.addEventListener('leticia-track', (e) => {
      this.captureTrack(e.detail);
    });

    window.addEventListener('leticia-action', (e) => {
      this.captureAction(e.detail);
    });
  },

  mounted() {
    console.log(`Remaining time: ${this.remainingTime}`);
  },

  beforeDestroy() {
    KeystrokeTracker.unbindTracker();
    MouseTracker.unbindTracker();
    ScrollTracker.unbindTracker();

    window.removeEventListener('leticia-track', (e) => {
      this.captureTrack(e.detail);
    });

    window.removeEventListener('leticia-action', (e) => {
      this.captureAction(e.detail);
    });
  },

  methods: {
    captureAction(event) {
      // console.log(`[CaptureAction]`, event);
     
      if (true) { // TODO Login
        Axios.post(`${Constants.backendApiUrl}/actions`, event)
          .then ((res) => {
            // console.log(`Action saved!`, response.data.timestamp, event);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    captureTrack(message, sender, sendResponse) {
      if (message.type && message.type === 'SIGN_CONNECT') {
        return;
      }

      if (true) { // TODO Login
        // console.log(`[CaptureTrack]`, `TYPE: ${message.type}`, `TS: ${message.clientTimestamp}`, message);

        WebSocket.sendMessage(message);
      }
    }
  }
}
</script>

<style scoped>
#leticia-content {
  padding: 5px 5px 5px 5px;
}
</style>