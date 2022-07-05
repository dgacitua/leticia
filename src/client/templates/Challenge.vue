<template>
  <b-container id="challenge">
    <b-row>
      <router-view id="current-stage"></router-view>
    </b-row>
    <!--
    <hr>
    <b-row>
      <div>
        TaskIndex: {{ taskIndex }}<br>
        StageIndex: {{ stageIndex }}<br>
        NewIndex: {{ newIndex }}
      </div>
      <div>
        <pre>{{ currentTasks }}</pre>
        <pre>{{ currentStages }}</pre>
      </div>
    </b-row>
    -->
  </b-container>
</template>

<script>
// TODO implement generic challenge
import Axios from 'axios';

import ActionSender from '../services/ActionSender';
import EventBus from '../modules/eventBus';
import Timer from '../services/Timer';

import * as Constants from '../services/Constants';
import { deepCopy, getObjectFromArray, isEmptyArray } from '../services/Utils';

export default {
  data() {
    return {
      challengePath: '/challenge',
      stageOrder: [
        { path: '/short-challenge/ready', query: { task: '' }},
        { path: '/short-challenge/description', query: { task: '' }},
        { path: '/short-challenge/taskform', query: { task: '', form: Constants.pretaskForm }},
        { path: '/short-challenge/query', query: { task: '', form: Constants.queryForm }},
        { path: '/short-challenge/taskform', query: { task: '', form: Constants.posttaskForm }}
      ],
      sessionFlow: null,
      currentTasks: this.$store.getters.tasks,
      currentStages: this.$store.getters.stages,
      taskIndex: 0,
      stageIndex: 0,
      newIndex: this.$store.getters.stageIndex,
      taskAmount: 3
    }
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },

  // dgacitua definitions
  // next-stage: Advance to the following global action (Consent, Demographic, TypingTest, ShortChallenge, etc.)
  // next-challenge: Advance to the following step inside a challenge (Short or Extended)
  created() {
    EventBus.$on('leticia-next-challenge', () => {
      console.log('LETICIA Next Challenge!');

      this.nextChallenge();
      this.loadChallenge();
      this.saveUserData();
    });
  },

  mounted() {
    // Begin the challenge from start
    if (!this.$store.getters.stageIndex) {
      let p1 = this.importTasks();
      let p2 = this.importSessionFlow();

      Promise.all([p1, p2])
        .then(() => {
          this.createStages();
          this.startChallenge();
        })
        .catch((err) => {
          console.error(err);
          alert('An error ocurred while loading the challenge [Code 462-G0]');
        });
    }
    // If user has already begun the challenge
    else {
      this.loadChallenge();
    }
  },

  methods: {
    importTasks() {
      return Axios.get(`${Constants.backendApiUrl}/tasks/shuffle?username=${this.currentUser.username}&num=${this.taskAmount}`)
        .then((res) => {
          this.$store.commit({ type: 'setTasks', tasks: res.data });
          console.log('Search Tasks loaded!');
          return Promise.resolve();
        })
        .catch((err) => {
          console.error(err);
          alert('An error ocurred while loading tasks [Code 462-G1]');
          return Promise.reject();
        });
    },
    importSessionFlow() {
      return Axios.get(`${Constants.backendApiUrl}/flows/${Constants.currentSessionFlow}`)
        .then((res) => {
          this.sessionFlow = res.data;
          console.log('Session Flow (stages) loaded!', Constants.currentSessionFlow, this.sessionFlow);
          return Promise.resolve();
        })
        .catch((err) => {
          console.error(err);
          alert('An error ocurred while loading session flow [Code 462-G2]');
          return Promise.reject();
        });
    },
    createStages() {
      let userStages = [];
      this.$store.getters.tasks.forEach(el1 => {
        // Check for custom session flow
        if (!!(this.sessionFlow) && this.sessionFlow.hasOwnProperty('stages')) {
          // Load custom challenge stage
          let challengeObj = getObjectFromArray(this.sessionFlow.stages, 'path', this.challengePath);

          // If a custom challenge exists, use stages from challenge object
          if (!!(challengeObj) && challengeObj.hasOwnProperty('stages')) {
            challengeObj.stages.forEach(el2 => {
              let newStage = deepCopy(el2);
              
              newStage.query = {
                ...{ task: deepCopy(el1.searchTaskId) },
                ...deepCopy(newStage.query)
              };

              userStages.push(newStage);
            });
          }
          // If it doesn't, do regular challenge logic
          else {
            this.stageOrder.forEach(el2 => {
              let newStage = deepCopy(el2);
              newStage.query.task = deepCopy(el1.searchTaskId);
              userStages.push(newStage);
            });
          }          
        }
        // If it doesn't exists, do regular challenge logic
        else {
          this.stageOrder.forEach(el2 => {
            let newStage = deepCopy(el2);
            newStage.query.task = deepCopy(el1.searchTaskId);
            userStages.push(newStage);
          });
        }
      });
      
      this.$store.commit({ type: 'setStages', stages: userStages });
      console.log('Challenge Stages loaded!', userStages);
    },
    startChallenge() {
      this.$store.commit({ type: 'setStageIndex', amount: 0 });
      let nextStage = this.$store.getters.stages[this.$store.getters.stageIndex];
      console.log('StartChallenge!', nextStage);
      this.$router.replace(nextStage);
    },
    nextChallenge() {
      this.$store.commit({ type: 'nextStageIndex' });
      console.log('NextChallenge!', this.$store.getters.stageIndex);
    },
    loadChallenge() {
      let idx = this.$store.getters.stageIndex;
      let len = this.$store.getters.stages.length;

      if (idx < len) {
        let nextStage = this.$store.getters.stages[this.$store.getters.stageIndex];
        console.log('LoadChallenge!', this.$store.getters.stageIndex, nextStage);
        this.$router.replace(nextStage);
      }
      else {
        EventBus.$emit('leticia-timer-stop');
        EventBus.$emit('leticia-next-stage');
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