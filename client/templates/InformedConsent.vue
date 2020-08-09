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
        <b-button @click="createParticipant" variant="success">Acepto participar en el estudio</b-button>
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
    createParticipant() {
      // DEPRECATED
      /*
      this.$store.dispatch({ type: 'createParticipant' })
        .then((res) => {
          this.$router.push({ path: 'demographic' });
        })
        .catch((err) => {
          console.error(err);
          alert('Ha ocurrido un error al iniciar el estudio');
        });
      */
    }
  }
}
</script>

<style scoped>

</style>