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
  name: 'demographic',

  data() {
    return {
      form: {},
      error: {}
    }
  },

  methods: {
    submitDemographic(evt) {
      evt.preventDefault();
      this.$router.replace({ path: 'end' });
    }
  }
}
</script>

<style scoped>

</style>