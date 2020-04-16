<template>
  <b-container>
    <b-row>
      <h1>Instrucciones</h1>
    </b-row>
    <b-row>
      TODO Instrucciones
    </b-row>
    <b-row>
      <b-link to="tasks">Ir a la tarea</b-link>
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