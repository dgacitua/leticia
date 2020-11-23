<template>
  <b-container fluid id="leticia-app">
    <navbar id="leticia-navbar"></navbar>
    <router-view id="leticia-content"></router-view>
  </b-container>
</template>

<script>
import Axios from 'axios';

import * as Constants from '../services/Constants';
import WebSocket from '../services/WebSocket';
import EventBus from '../modules/eventBus';
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
    remainingTime() {
      return this.$store.state.timerTime;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  },

  created() {
    EventBus.$on('leticia-next-stage', () => {
      console.log('LeTiCiA Next Stage!');
      this.$store.commit({ type: 'nextFlowIndex' });
      
      let nextFlowStage = this.$store.getters.sessionFlow.stages[this.$store.getters.flowIndex].path;
      let nextFlowParams = this.$store.getters.sessionFlow.stages[this.$store.getters.flowIndex].params;
      let nextFlowTimeLimit = this.$store.getters.sessionFlow.stages[this.$store.getters.flowIndex].timeLimit;

      let userdata = {
        username: this.currentUser.username,
        state: this.$store.getters.userData,
        sessionFlow: this.$store.getters.sessionFlow
      };

      Axios.post(`${Constants.backendApiUrl}/userdata/${this.currentUser.username}`, userdata)
        .then(res => console.log('UserData saved on server!'))
        .catch(err => console.error('Error while saving UserData on server', err));

      if (nextFlowTimeLimit > 0) {
        EventBus.$emit('leticia-timer-create', { totalTime: nextFlowTimeLimit * 60 });
      }

      this.$router.replace({ path: nextFlowStage });
    });

    EventBus.$on('leticia-timeout', (detail) => {
      alert('Se ha acabado el tiempo!')
      EventBus.$emit('leticia-next-stage');
    });
  },
}
</script>

<style scoped>
#leticia-app {
  padding: 0px;
}

#leticia-navbar {
  width: 100%;
}

#leticia-content {
  width: 100%;
  height: 100%;
  padding: 5px 5px 5px 5px;
}
</style>