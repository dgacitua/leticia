<template>
  <b-container id="short-challenge">
    <b-row>
      <div><h1>Short Challenge!</h1><div>
    </b-row>
    <b-row>
      <router-view id="current-stage"></router-view>
    </b-row>
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
  </b-container>
</template>

<script>
import Axios from 'axios';

import EventBus from '../modules/eventBus';
import * as Constants from '../services/Constants';
import { deepCopy, isEmptyArray } from '../services/Utils';
import Timer from '../services/Timer';

export default {
  data() {
    return {
      stageOrder: [
        { path: '/short-challenge/description', query: { task: '' }},
        { path: '/short-challenge/taskform', query: { task: '', form: Constants.pretaskForm }},
        { path: '/short-challenge/query', query: { task: '', form: Constants.queryForm }},
        { path: '/short-challenge/taskform', query: { task: '', form: Constants.posttaskForm }}
      ],
      currentTasks: this.$store.getters.tasks,
      currentStages: this.$store.getters.stages,
      taskIndex: 0,
      stageIndex: 0,
      newIndex: this.$store.getters.stageIndex
    }
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },

  created() {
    EventBus.$on('leticia-next-challenge', () => {
      console.log('LeTiCiA Next Challenge!');

      this.nextChallenge();
      this.loadChallenge();

      let userdata = {
        username: this.currentUser.username,
        state: this.$store.getters.userData,
        sessionFlow: this.$store.getters.sessionFlow
      };

      Axios.post(`${Constants.backendApiUrl}/userdata/${this.currentUser.username}`, userdata)
        .then(res => console.log('UserData saved on server!'))
        .catch(err => console.error('Error while saving UserData on server', err));
    });
  },

  beforeMount() {
    if (!this.$store.getters.stageIndex) {
      this.importTasks()
        .then(() => {
          this.createStages();
          this.startChallenge();
        });
    }
    else {
      this.loadChallenge();
    }
  },

  methods: {
    importTasks() {
      return Axios.get(`${Constants.backendApiUrl}/tasks/shuffle`)
        .then((res) => {
          this.$store.commit({ type: 'setTasks', tasks: res.data });
          console.log('Search Tasks loaded!');
          return Promise.resolve();
        })
        .catch((err) => {
          console.log(err);
          alert('Ha ocurrido un error al cargar las tareas');
          return Promise.reject();
        });
    },
    createStages() {
      let userStages = [];
      this.$store.getters.tasks.forEach(el1 => {
        this.stageOrder.forEach(el2 => {
          let newStage = deepCopy(el2);
          newStage.query.task = deepCopy(el1.searchTaskId);
          userStages.push(newStage);
        });
      });
                
      this.$store.commit({ type: 'setStages', stages: userStages });
      console.log('Challenge Stages loaded!');
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
        EventBus.$emit('leticia-next-stage');
      }
    }
  }
}
</script>

<style scoped>
</style>