<template>
  <b-container>
    <b-row>
      <h2>Test Demográfico</h2>
    </b-row>
    <br>
    <b-row>
      TODO Demográfico
    </b-row>
    <br>
    <b-row>
      <b-button to="instructions" variant="success">Continuar</b-button>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'demographic',

  data() {
    return {
    }
  },

  beforeMount() {
    this.$store.commit({ type: 'setCurrentRoute', route: { path: 'demographic' }});
  }
}
</script>

<style scoped>
.zero-margin {
  margin: 0px 0px 0px 0px;
}
</style>