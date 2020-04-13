<template>
  <b-container>
    <b-row>
      <h1>¡Bienvenido a LeTiCiA!</h1>
    </b-row>
    <b-row>
      <b-button to="consent">Ingresar</b-button>
    </b-row>
    <b-row>
      <!--
      <questionnaire></questionnaire>
      <taskselector></taskselector>
      -->
    </b-row>
  </b-container>
</template>

<script>
import Questionnaire from './Questionnaire.vue';
import TaskSelector from './queryPlanning/TaskSelector.vue';

export default {
  name: 'home',

  components: {
    questionnaire: Questionnaire,
    taskselector: TaskSelector
  }
}
</script>

<style scoped>

</style>