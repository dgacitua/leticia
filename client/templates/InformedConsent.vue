<template>
  <b-container>
    <b-row>
      <h1>Consentimiento Informado</h1>
    </b-row>
    <b-row>
      TODO Consentimiento Informado
    </b-row>
    <b-row>
      <b-link to="instructions">Acepto participar en el estudio</b-link>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'informed-consent',

  beforeMount() {
    this.$store.commit({ type: 'setCurrentRoute', route: { path: 'consent' }});
  }
}
</script>

<style scoped>

</style>