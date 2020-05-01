<template>
  <b-container>
    <b-row>
      <h2>Selecciona una tarea a realizar:</h2>
    </b-row>
    <br>
    <b-row>
      <b-card-group deck>
        <div v-for="task in searchTasks" :key="task.searchTaskId">
          <b-card :title="task.title" class="mb-2 task-card">
            <b-card-text>
              {{ task.description }}
            </b-card-text>
            <span v-if="task.completed">COMPLETADA</span>
            <b-link
              :to="{ path: 'taskform', query: { task: task.searchTaskId, form: formId }}"
              class="card-link"
              v-if="!task.completed"
              replace>
                Seleccionar tarea
            </b-link>
          </b-card>
        </div>
      </b-card-group>
    </b-row>
  </b-container>
</template>

<script>
import Axios from 'axios';
import { merge } from 'lodash';

import * as Constants from '../../services/Constants';
import { shuffleArray, deepCopy } from '../../services/Utils';

export default {
  name: 'task-selector',
  
  data() {
    return {
      formId: Constants.pretaskForm
    }
  },

  computed: {
    searchTasks() {
      return this.$store.getters.tasks;
    }
  },

  mounted() {
    if (this.searchTasks.length <= 0) {
      this.$store.dispatch({ type: 'fetchTasks' })
        .then((res) => {
          console.log('Search Tasks loaded!');
        })
        .catch((err) => {
          console.error(err);
          alert('Ha ocurrido un error');
        });
    }
  }
}
</script>

<style scoped>
.task-card {
  width: 20rem;
}
</style>