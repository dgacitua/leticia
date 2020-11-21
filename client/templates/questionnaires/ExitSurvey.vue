<template>
  <b-container>
    <b-row>
      <h2>Encuesta</h2>
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
import EventBus from '../../modules/eventBus';

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
      
      EventBus.$emit('leticia-next-stage');
    }
  }
}
</script>

<style scoped>

</style>