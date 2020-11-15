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
export default {
  name: 'instructions',

  methods: {
    nextStage() {
      console.log('Next Challenge Stage!');
      this.$store.commit({ type: 'nextFlowIndex' });
      
      let nextFlowStage = this.$store.getters.sessionFlow.stages[this.$store.getters.flowIndex].name;
      this.$router.replace(nextFlowStage);
    }
  }
}
</script>

<style scoped>

</style>