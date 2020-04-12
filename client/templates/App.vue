<template>
  <div id="leticia-app">
    <navbar id="leticia-navbar"></navbar>
    <router-view id="leticia-content" @interaction="captureInteraction"></router-view>
  </div>
</template>

<script>
import axios from 'axios';

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
  },

  methods: {
    captureInteraction(event) {
      console.log(`[CaptureEvent]`, event);
      // axios.post(`${process.env.VUE_APP_BACKEND_API}interactions/`, event)
      // .then(response => {
      //   console.log(`[${Date.now()}] interaction saved`, event);
      // })
      // .catch(error => {
      //   console.log(error);
      // });
    },

    captureTrack(message, sender, sendResponse) {
      if (message.type && message.type === 'SIGN_CONNECT') {
        return;
      }

      if (true) { // Add login check
        //console.log(`[CaptureTrack]`, `TYPE: ${message.type}`, `TS: ${message.clientTimestamp}`, message);

        let restByType = {
          'KeyDown': 'keystrokes',
          'KeyUp': 'keystrokes',
          'KeyPress': 'keystrokes',
          'MouseClick': 'mousemoves',
          'MouseMovement': 'mousemoves',
          'Scroll': 'scrolltracks',
        };

        if (restByType[message.type]) {
          WebSocket.sendMessage(message);
        }
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