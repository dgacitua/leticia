<template>
  <b-container>
    <b-row>
      <h2>TODO Encuesta de Salida</h2>
    </b-row>
    <b-row>
      <b-form id="exit-survey" @submit="submitSurvey">
        <!-- Submit -->
        <b-button type="submit" variant="primary">Enviar</b-button>
      </b-form>
    </b-row>
    <hr>
    <pre>{{ form }}</pre>
  </b-container>
</template>

<script>
export default {
  name: 'exit-survey',

  data() {
    return {
      form: {},
      error: {}
    }
  },

  methods: {
    submitSurvey(evt) {
      evt.preventDefault();
      // TODO enviar encuesta
      
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