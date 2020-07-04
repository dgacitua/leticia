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
import Timer from '../services/Timer';

import * as KeystrokeTracker from '../trackers/keystroke';
import * as MouseTracker from '../trackers/mouse';
import * as ScrollTracker from '../trackers/scroll';

import Navbar from './Navbar';

export default {
  components: {
    navbar: Navbar
  },

  data() {
    return {
      timer: null,
      globalTimer: null
    }
  },

  computed: {
    userId() {
      return this.$store.state.userId;
    },
    remainingTime() {
      return this.$store.state.remainingTime;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
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

    window.addEventListener('leticia-time', (e) => {
      this.timeEvent(e.detail);
    });
  },

  mounted() {
    // Timer examples
    /*
    this.timer = new Timer(15, 5);
    this.timer.start();

    this.globalTimer = new Timer (25, 5, true);
    this.globalTimer.start();
    */
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

    window.removeEventListener('leticia-time', (e) => {
      this.timeEvent(e.detail);
    });
  },

  methods: {
    captureAction(event) {
      if (this.loggedIn) { //(this.$store.getters.isValidParticipant) {
        event.userId = this.currentUser.username;
        //console.log(`[CaptureAction]`, event);

        Axios.post(`${Constants.backendApiUrl}/actions`, event)
          .then((res) => {
            // console.log(`Action saved!`, response.data.timestamp, event);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    captureTrack(event) {
      if (this.loggedIn) { //(this.$store.getters.isValidParticipant) {
        event.userId = this.currentUser.username;
        // TODO Enable captureTrack
        //console.log(`[CaptureTrack]`, `TYPE: ${event.type}`, `TS: ${event.clientTimestamp}`, event);
        //WebSocket.sendMessage(event);
      }
    },

    timeEvent(event) {
      console.log('[TimeEvent]', event);
    }
  }
}
</script>

<style scoped>
#leticia-content {
  padding: 5px 5px 5px 5px;
}
</style>