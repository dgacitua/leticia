<template>
  <h1>Short Challenge!</h1>
</template>

<script>
import Axios from 'axios';

import * as Constants from '../services/Constants';
import Timer from '../services/Timer';

export default {
  data() {
    return {
      tasks: []
    }
  },


  methods: {
    importTasks() {
      Axios.get(`${Constants.backendApiUrl}/tasks/shuffle`)
        .then((res) => {
          // TODO save tasks
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
</script>

<style scoped>

</style>