<template>
  <b-container id="user-hub">
    <b-row>
      <h1>{{ $t("userHub.title") }}</h1>
    </b-row>
    <br>
    <b-row>
      <b-col>
        {{ $t("userHub.completedPerc") }}:
        <b-progress :max="100" height="2rem">
          <b-progress-bar :value="completedPerc">
            <i18n path="userHub.completedBar" tag="span">
              <strong>{{ completedPerc }}%</strong>
            </i18n>
          </b-progress-bar>
        </b-progress>
      </b-col>
    </b-row>
    <br>
    <b-row class="text-center">
      <b-col>
        <b-button @click="resumeStudy" variant="success">{{ $t("userHub.goButton") }}</b-button>            
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Axios from 'axios';

import * as Constants from '../../services/Constants';
import ActionSender from '../../services/ActionSender';
import EventBus from '../../modules/eventBus';

export default {
  name: 'UserHub',

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    completedPerc() {
      let flowIndex = this.$store.getters.flowIndex || 0;
      let sessionLength = this.$store.getters.sessionFlow.stages.length || 1;
      return Math.round((flowIndex / sessionLength) * 100);
    }
  },

  methods: {
    resumeStudy(evt) {
      // Resume stage from challenge
      if (this.$store.getters.flowIndex >= 0) {
        console.log('Resuming Challenge!');
            
        let nextFlowStage = this.$store.getters.sessionFlow.stages[this.$store.getters.flowIndex].path;
        let nextFlowParams = this.$store.getters.sessionFlow.stages[this.$store.getters.flowIndex].params;
        let nextFlowTimeLimit = this.$store.getters.sessionFlow.stages[this.$store.getters.flowIndex].timeLimit;

        if (nextFlowTimeLimit > 0) {
          EventBus.$emit('leticia-timer-create', { totalTime: this.$store.state.timerTime });
        }

        this.saveUserData();
        this.$router.replace({ path: nextFlowStage });
      }
      // Start new challenge
      else {
        console.log('Starting Challenge!');
        this.$store.commit({ type: 'setFlowIndex', amount: 0 });
        
        let nextFlowStage = this.$store.getters.sessionFlow.stages[this.$store.getters.flowIndex].path;
        let nextFlowParams = this.$store.getters.sessionFlow.stages[this.$store.getters.flowIndex].params;
        let nextFlowTimeLimit = this.$store.getters.sessionFlow.stages[this.$store.getters.flowIndex].timeLimit;
        
        if (nextFlowTimeLimit > 0) {
          EventBus.$emit('leticia-timer-create', { totalTime: nextFlowTimeLimit });
        }

        this.saveUserData();
        this.$router.replace({ path: nextFlowStage });
      }
    },
    saveUserData() {
      let userdata = {
        username: this.currentUser.username,
        state: this.$store.getters.userData,
        sessionFlow: this.$store.getters.sessionFlow
      };

      Axios.post(`${Constants.backendApiUrl}/userdata/${this.currentUser.username}`, userdata)
        .then(res => console.log('UserData saved on server!'))
        .catch(err => console.error('Error while saving UserData on server', err));
    }
  }
}
</script>

<style scoped>
</style>