<template>
  <b-container>
    <b-row>
      <h1>Consentimiento Informado</h1>
    </b-row>
    <br>
    <b-row>
      TODO Consentimiento Informado
    </b-row>
    <br>
    <b-row>
      <b-col>
        <b-button @click="acceptConsent" variant="success">Acepto participar en el estudio</b-button>
      </b-col>
      <b-col>
        <b-button to="/" variant="danger">No acepto participar en el estudio</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'informed-consent',

  methods: {
    acceptConsent() {
      // dgacitua: https://stackoverflow.com/a/57183854
      this.$router.replace({ path: 'oauth' });
    }
  }
}
</script>

<style scoped>

</style>