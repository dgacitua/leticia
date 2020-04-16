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
      <b-button to="tasks" variant="success">Ir a la tarea</b-button>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'instructions',

  beforeMount() {
    this.$store.commit({ type: 'setCurrentRoute', route: { path: 'instructions' }});
  }
}
</script>

<style scoped>

</style>