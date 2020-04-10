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

import * as KeystrokeTracker from '../trackers/keystroke';
import * as MouseTracker from '../trackers/mouse';
import * as ScrollTracker from '../trackers/scroll';

export default {
  components: {
    navbar: Navbar
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
    // TODO
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
        console.log(`[CaptureTrack]`, `TYPE: ${message.type}`, `TS: ${message.timestamp}`, message);

        let restByType = {
          'KeyDown': 'keystrokes',
          'KeyUp': 'keystrokes',
          'KeyPress': 'keystrokes',
          'MouseClick': 'mousemoves',
          'MouseMovement': 'mousemoves',
          'Scroll': 'scrolltracks',
        };

        if (restByType[message.type]) {
          // Tracks will be saved only when the extension is open.
          /*
          axios.post(`http://localhost:3001/v1/${restByType[message.type]}/`, message)
            .then(response => {
              // console.log(`[${Date.now()}] track saved`, response.data);
            })
            .catch(error => {
              console.log(JSON.stringify(error));
            });
          */
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