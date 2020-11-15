<template>
  <b-container>
    <b-row>
      <h1>Instrucciones</h1>
    </b-row>
    <br>
    <b-row>
      TODO Instrucciones
    </b-row>
    <br>
    <b-row>
      <b-button @click="nextStage" variant="success">Ir a la tarea</b-button>
    </b-row>
  </b-container>
</template>

<script>
import EventBus from '../modules/eventBus';

export default {
  name: 'instructions',

  methods: {
    nextStage() {
      EventBus.$emit('leticia-next-stage');
    }
  }
}
</script>

<style scoped>

</style>